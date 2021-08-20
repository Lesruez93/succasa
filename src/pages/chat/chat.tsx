import React, {useEffect, useState} from 'react';
import LongPressable from 'react-longpressable';

import {
    IonActionSheet,
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
    IonModal,
    IonPage,
    IonRow,
    IonText,
    IonTextarea,
    IonTitle,
    IonToolbar,
    useIonViewWillEnter
} from '@ionic/react';
import './chat.css';
import {cameraOutline, closeCircle, imageOutline, paperPlaneOutline, trash} from "ionicons/icons";
import firebase from 'firebase';
import {getUser} from "../../api";

export default function Chat (props:any) {


    const [item, setItem] = useState<any>({});
    const [message, setComment] = useState<any>();
    const [showModalOptions, setShowModalOptions] = useState(false);
    const [posts, setPosts] = useState<any>([]);
    const [image, setImage] = useState();
    const [id,setId]= useState<any>();
    const [showActionSheet, setShowActionSheet] = useState(false);


    const db = firebase.firestore();
    const onChange = (e: any) => {
        e.preventDefault();
        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result as any);

            setShowModalOptions(false)
        };
        reader.readAsDataURL(files[0]);
    };
    useEffect(() => {

        return db.collection('chat').doc(props.location.state.docId).collection('inbox')
            .orderBy("timestamp",
                "asc").onSnapshot((snapshot) => {
                const postData:any = [];
                snapshot.forEach((doc) => postData.push({ ...doc.data(), docId: doc.id }));
                scrollToBottom();
                setPosts(postData);

            });
    }, []);

    useIonViewWillEnter(()=>{
        setItem(getUser);

        scrollToBottom();
        //     loadChat(props.location.state.docId);
        //  docId = props.location.state.docId



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
        setTimeout(()=>{
            let list = document.querySelector("ion-content");
            return list && list.scrollToBottom();
        },2000)


    };

    function  addDocument() {

        const dataObj ={
            message: message,
            name: item.name,
            timestamp:Date.now(),
            id:item.id,

        };
        setComment(null);


        db.collection("chat").doc(props.location.state.docId).update(dataObj).then(()=> {

            db.collection("chat").doc(props.location.state.docId)
                .collection('inbox').add(dataObj)
                .then(()=>
                {
                    let postData = {

                        "to": "/topics/" + props.location.state.id,
                        "notification": {
                            "title":   dataObj.name,
                            "body": message,
                            "sound": "default",
                        },
                        "data": {
                            "title":   dataObj.name,
                            "body": message,
                            "page": '/msgs.page',
                            id:dataObj.id,
                            timestamp:Date.now(),
                            "data": {
                                "page": '/chat',
                                data: dataObj
                            }


                        }
                    };



                    scrollToBottom()

                }).catch((error: any) => {
                console.log(error);

            });

        })
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
    //                         db.collection("chat").doc(docId).collection('inbox').doc(id.docId).delete()
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


    function deleteMsg(id: any) {
        return db.collection('chat').doc(props.location.state.docId).collection('inbox')
            .doc(id.docId).delete()
    }

    return (
        <IonPage>
            <IonHeader className="ion-no-border">

                <IonToolbar color='medium' >
                    <IonButtons slot="start">
                        <IonBackButton color='light' defaultHref={'./tabs/chat'} text="" />
                    </IonButtons>

                    <IonTitle >
                        Chat
                    </IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonFooter mode="md">

                <IonRow>
                    <IonCol size='8'>

                        <IonTextarea
                            onIonChange={y => setComment(y.detail.value)}
                            value={message}
                            onKeyDown={(e)=>{
                                if (e.key === 'Enter') {
                                    addDocument()
                                }
                            }}
                            placeholder="Write your message">
                        </IonTextarea>
                    </IonCol>
                    <IonCol  size='2'>
                    <IonButton   fill="clear"  onClick={e => {setShowModalOptions(true)} }>
                        <IonIcon  size="large" icon={imageOutline}/>

                    </IonButton>

                </IonCol>
                    <IonCol className='no-pad' size='2'>
                        <IonButton   fill="clear"  onClick={e => {addDocument()} }>
                            <IonIcon  size="large" icon={paperPlaneOutline}/>

                        </IonButton>

                    </IonCol>
                </IonRow>

            </IonFooter>

            <IonContent className='ion-margin-bottom'>

                <div  className="ion-margin-bottom">
                    {posts.map((msg:any)=>(

                        <LongPressable key={msg.docId}
                            onLongPress={()=>{
                                setShowActionSheet(true);
                                setId(msg)
                            }}
                            longPressTime={700}>
                            <IonItem   lines='none'  className={item.id !== msg.id ?' left-bubble': 'ion-margin right-bubble'} >
                                <div className={item.id !== msg.id ? "talk-bubble tri-right left-top" :"talk-bubble-right tri-right btm-right right-b" }>
                                    <div className="talktext">
                                        <IonLabel > <IonText color='medium' className='ion-margin-bottom '  >{msg?.name}</IonText>
                                            <p className='p'>{msg?.message}</p>
                                        </IonLabel>
                                    </div>
                                </div>
                            </IonItem>

                           </LongPressable>
                    ))}

                </div>

                <IonModal  isOpen={showModalOptions} cssClass='custom-class1' >
                    <IonContent className='trans-bg' fullscreen onClick={()=>{
                        setShowModalOptions(false)
                    }}>
                    </IonContent>
                    <IonFooter class="ion-no-border ion-padding foot">
                        <IonItem lines="full">
                            <div slot="start" >
                                <label htmlFor="image1">
                                    <IonIcon size="large" color="primary" icon={imageOutline}/>
                                </label>

                                <input className="filetype" type="file" id="image1" accept="image/x-png,image/jpeg,image/"   onChange={onChange}  />
                            </div>
                            <label htmlFor="image1">Select Image</label>

                        </IonItem>

                        <IonItem lines="full">
                            <div slot="start" >
                                <label htmlFor="cameraInput">
                                    <IonIcon size="large" color="primary" icon={cameraOutline}/>
                                </label>

                                <input className="filetype" type="file" capture="camera" name="camera"  id="cameraInput" accept="image/x-png,image/jpeg,image/"   onChange={onChange}  />
                            </div>
                            <label htmlFor="cameraInput">Take Picture</label>

                        </IonItem>



                    </IonFooter>
                </IonModal>


                <IonActionSheet
                    isOpen={showActionSheet}
                    onDidDismiss={() => setShowActionSheet(false)}

                    buttons={[{
                        text: 'Delete',
                        role: 'destructive',
                        icon: trash,
                        handler: () => {
                            setShowActionSheet(false);
                            deleteMsg(id);
                        }
                    },
                {
                        text: 'Cancel',
                        icon: closeCircle,
                        role: 'cancel',
                        handler: () => {

                        }
                    }]}
                >
                </IonActionSheet>


            </IonContent>

        </IonPage>

    );
};






