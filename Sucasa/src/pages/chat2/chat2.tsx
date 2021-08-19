import React, {useEffect, useState} from 'react';
import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonCol,
    IonContent,
    IonFooter,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonPage,
    IonRow,
    IonTextarea,
    IonTitle,
    IonToolbar, useIonViewWillEnter
} from '@ionic/react';
import './chat.css';
import {paperPlaneOutline} from "ionicons/icons";
import firebase from 'firebase';

export default function Chat2 (props:any) {


    const [item, setItem] = useState<any>({});
    const [comment, setComment] = useState<any>();
    const [exists, setExists] = useState<boolean>();
    const [docid, setDocid] = useState<any>();
    const [users, setUsers] = useState<any>();
    const [posts, setPosts] = useState();
    const db = firebase.firestore();
    useEffect(() => {
        
        return db.collection('chat').onSnapshot((snapshot) => {
            const postData:any = [];
            snapshot.forEach((doc) => postData.push({ ...doc.data(), id: doc.id }));
            console.log(postData);  // <------
            setPosts(postData);
        });
    }, []);

useIonViewWillEnter(()=>{

        setItem(props.location.state);
    scrollToBottom();



    if (props.location.state.source === 'profile' ) {
        loadData(props.location.state.user.id)

    }

    else {
            loadChat(props.location.state.docid);
          //  docid = props.location.state.docid
        }
});

  // ngOnInit() {
  //     scrollToBottom()
  //     keyboard.onKeyboardWillShow().subscribe(()=>{
      //         isKeyboardHide=false;
      //         // console.log('SHOWK');
      //         scrollToBottom()
      //     });
  //
  //     keyboard.onKeyboardWillHide().subscribe(()=>{
      //         isKeyboardHide=true;
      //         // console.log('HIDEK');
      //     });
  // }
 function openProfile(user: any) {

      props.history.push(
          {pathname:'/user-profile',
              state:user}
      )
  }

    const scrollToBottom = () => {
        let list = document.querySelector("ion-content");
        return list && list.scrollToBottom();
    };
function  addocument() {



     setTimeout(()=>{
         setComment('');
     },100);
      console.log(comment);
      if(props.location.state.source === 'profile'){

        // let  ids =[
        //
        //       localStorage.user.id,
        //       props.location.state.user.id
        //   ];



         setUsers ([

              {
                  id:  localStorage.user.id,
                  name:localStorage.user.name
              },
              {
                  id:props.location.state.user.id,
                  name:props.location.state.user.name
              }
          ]);


        let  data = {
              comment: comment,

              name: localStorage.user.name,
              id: localStorage.user.id,
              users:{[localStorage.user.id]:true,[props.location.state.user.id]:true},
              userss:[localStorage.user.id,props.location.state.user.id],
              usersData:users,
              timestamp:Date.now(),
              username:props.location.state.user.name,
              user_id:props.location.state.user.id,
              
          };




          if (exists === false){

              db.collection("chat").add(data).then((res:any)=>{
                      console.log("rererre",res.id);


                  db.collection("chat").doc(res.id)
                      .collection('inbox')
                      .add(data)
                      .then(()=>
                      {
                          setComment('');
                          scrollToBottom()
                      }).catch((error: any) => {
                          console.log(error);

                      });

              })   }
          else {

              db.collection("chat").doc(docid).update(data).then(()=> {
                      //  console.log("rererre",res.id);
                  db.collection("chat").doc(docid)
                      .collection('inbox').add(data)
                      .then(()=>
                      {
                        setComment('');


                          scrollToBottom()
                      }).catch((error: any) => {
                          console.log(error);

                      });

              })   }



      }

      else {

       let   data = {
              comment: comment,
              name: localStorage.user.name,
              timestamp:Date.now(),
              id:localStorage.user.id,

              user_id:props.location.state.user_id,
              
          };
          db.collection("chat").doc(props.location.state.docid).update(data).then(()=> {

              db.collection("chat").doc(props.location.state.docid)
                  .collection('inbox').add(data)
                  .then(()=>
                  {

                      let postData = {

                          "to": "/topics/" + props.location.state.id,
                          "notification": {
                                  "title":   data.name,
                                  "body": comment,
                                  "sound": "default",
                              },
                          "data": {
                              "title":   data.name,
                              "body": comment,
                              "page": '/msgs.page',
                              "id": props.location.state.user_id,
                              timestamp:Date.now(),
                              "data": {
                                      "page": '/msgs.page',
                                      data: data
                                  }


                          }
                      };
                    //  not.post(postData);
                      setComment('');

                      scrollToBottom()

                  }).catch((error: any) => {
                      console.log(error);

                  });

          })
      }



  }
 function loadData(id:any){


      try {
          db.collection("chat")
              .where(`users.${id}`,'==', true)
                  .where(`users.${props.location.state.user.id}`,'==', true)

              .onSnapshot((snapshot) => {
                  const postData:any = [];
                  snapshot.forEach((doc) => postData.push({ ...doc.data(), id: doc.id }));
                  console.log(postData);  // <------
                  if (postData.length === 0){
                      console.log('none');
                      setExists(false);


                  }else {
                      setExists(true);
                      setDocid(postData[0].docid);

                      loadChats(id,postData[0].docid)

                  }
                  setPosts(postData);

                      // const data = a as ChatHeads;




              }
          )

      }
      catch (e) {
          console.log(e)
      }
  }
  scrollToBottom() ;
  
 function loadChats(val:any,id:any) {
      console.log('Chat Found');
      try {
          db.collection("chat")
              .doc(id).collection('inbox')
              .orderBy("id", "asc")
              .onSnapshot((snapshot) => {
                  const postData:any = [];
                  snapshot.forEach((doc) => postData.push({ ...doc.data(), id: doc.id }));
                  scrollToBottom()


              });








      }
      catch (e) {
          console.log(e)
      }

  }
function  loadChat(id:any) {




      try {  db.collection("chat").doc(id).collection('inbox').orderBy("id",
              "asc")
          .onSnapshot((snapshot) => {
              const postData:any = [];
              snapshot.forEach((doc) => postData.push({ ...doc.data(), id: doc.id }));
              scrollToBottom()

          });




      }
      catch (e) {
          console.log(e)
      }

  }
  // function options(id:any) {
  //   if (id.id == id){
  //
  //
  //     const actionsheet = await actionsheetCtrl.create({
  //         Header: ctrl.translatetxt('option'),
  //         buttons: [
  //
  //
  //             {
  //                 text: ctrl.translatetxt('delete'),
  //                 icon:  'trash',
  //                 handler: () => {
  //                         db.collection("chat").doc(docid).collection('inbox').doc(id.docid).delete()
  //
  //
  //
  //
  //
  //                     }
  //             },
  //
  //             {
  //                 text: ctrl.translatetxt('cancel'),
  //                 icon: 'close',
  //                 role: 'destructive',
  //                 handler: () => {
  //
  //                     }
  //             }
  //         ]
  //     });
  //     await actionsheet.present();
  //
  // }
  // }




    return (
        <IonPage>
            <IonHeader className="ion-no-border">

                <IonToolbar color='medium'>
                    <IonButtons slot="start">
                        <IonBackButton text="" icon="chevron-back-outline"/>
                    </IonButtons>

                    <IonTitle >
                        item.user?.name
                    </IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonFooter mode="md">

                <IonRow>
                    <IonCol size='10'>

                    <IonTextarea
                        placeholder="Write your message">
                    </IonTextarea>
                    </IonCol>
                    <IonCol size='2'>
                        <IonButton   fill="clear"  onClick={e => {addocument()} }>
                            <IonIcon  size="large" icon={paperPlaneOutline}/>
                        </IonButton>
                    </IonCol>
                </IonRow>

            </IonFooter>

            <IonContent >

                <div  className="message-wrap">
                                    <IonItem  lines='none' className='left-bubble' >
                                        <div className="talk-bubble  tri-right left-top">
                                            <div className="talktext">
                                        <IonLabel> <h2 className='ion-margin-bottom' >msg?.share?.username</h2>
                                            <p >msg?.comment</p>
                                        </IonLabel>
                                        </div>
                                        </div>


                                    </IonItem>
                    <IonItem  lines='none' className="ion-margin right-bubble " >

                        <div className="talk-bubble-right tri-right btm-right">
                            <div className="talktext">
                            <IonLabel> <h4 className='ion-margin-bottom' >msg?.share?.username</h4>
                                <p >msg?.comment</p>
                            </IonLabel>
                        </div>
                    </div>
                    </IonItem>
                </div>

            </IonContent>
        </IonPage>

    );
};






