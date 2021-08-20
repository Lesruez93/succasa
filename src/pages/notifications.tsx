import React, {useEffect, useState} from 'react';
import {
    IonAvatar, IonBackButton, IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonNote,
    IonPage,
    IonTitle,
    IonToolbar, useIonViewWillEnter
} from '@ionic/react';
import './Tab3.css';
import {notificationsCircle, people} from "ionicons/icons";
import firebase from 'firebase';

export default function Notification  (props:any)  {
    const db = firebase.firestore();

    const [msgs,setMsgs]= useState<any>([]);
    const [uid,setUid]= useState<any>();

    useEffect(() => {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                setUid(user.uid);
                return db.collection('notifications').where('uid','==',user.uid).onSnapshot((snapshot) => {
                    const postData:any = [];
                    snapshot.forEach((doc) => postData.push({ ...doc.data(), docId: doc.id }));

                    setMsgs(postData);
                });
            }
        });

    }, [db, uid]);


    useIonViewWillEnter(()=>{
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
            setUid(user.uid)
            }
        });
    });
  return (
    <IonPage>
        <IonHeader className="ion-no-border">
            <IonToolbar color='medium'  >
                <IonTitle>
                    Notifications
                </IonTitle>
                <IonButtons slot="start">
                <IonBackButton color='light' defaultHref='./settings' text=''/>
            </IonButtons>

            </IonToolbar></IonHeader>
      <IonContent fullscreen>

          {msgs.map((msg:any)=>(
              <IonItem key={msg.docId} onClick={()=>{

              }} className="ion-margin-top">
                  <IonAvatar slot="start">
                      <IonIcon size={'large'} color='medium' icon={notificationsCircle} />

                  </IonAvatar>
                  <IonLabel>
                      <h3>{msg?.title}</h3>
                      <p> Hello</p>
                  </IonLabel>
                  <IonNote slot="end"><p  className="small-text">Now</p></IonNote>
              </IonItem>
          ))
          }


      </IonContent>
    </IonPage>
  );
};

