import React, {useEffect, useState} from 'react';
import {
    IonAvatar, IonCard,
    IonContent,
    IonHeader,
    IonIcon, IonImg,
    IonItem,
    IonLabel,
    IonNote,
    IonPage,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import './Tab3.css';
import {people} from "ionicons/icons";
import firebase from 'firebase';

export default function Tab3  (props:any)  {
    const db = firebase.firestore();

    const [msgs,setMsgs]= useState<any>([]);

    useEffect(() => {

        return db.collection('chat').onSnapshot((snapshot) => {
            const postData:any = [];
            snapshot.forEach((doc) => postData.push({ ...doc.data(), docId: doc.id }));
            console.log(postData);  // <------
            setMsgs(postData);
        });
    }, [db]);


  return (
    <IonPage>
        <IonHeader className="ion-no-border">
            <IonToolbar color='medium'  >
                <IonTitle>
                    Chat
                </IonTitle>
            </IonToolbar></IonHeader>
      <IonContent fullscreen>

          {msgs.map((msg:any)=>(
              <IonCard routerLink={'/tenancies'} key={msg.id} onClick={()=>{
                  props.history.push({
                      pathname:'/chat',
                      state:msg
                  })
              }} className="ion-padding">

                  <IonItem  key={msg.id}  lines='none' >
                      {msg.tenants.map((i:any)=>(
                          <IonAvatar className='-margin-left' key={i} slot="start">
                              <IonImg src={'./assets/img/pic.png'}/>
                          </IonAvatar>
                      ))
                      }
                      <IonLabel>
                          <h3> </h3>
                          <p> Property Address</p>
                      </IonLabel>

                  </IonItem>
              </IonCard>

              // <IonItem key={msg.docId} onClick={()=>{
              //     props.history.push({
              //         pathname:'/chat',
              //         state:msg
              //     })
              // }} className="ion-margin-top">
              //     <IonAvatar slot="start">
              //         <IonIcon size={'large'} color='medium' icon={people} />
              //
              //     </IonAvatar>
              //     <IonLabel>
              //         <h3>{msg?.title}</h3>
              //         <p> Hello</p>
              //     </IonLabel>
              //     <IonNote slot="end"><p  className="small-text">Now</p></IonNote>
              // </IonItem>
          ))
          }


      </IonContent>
    </IonPage>
  );
};

