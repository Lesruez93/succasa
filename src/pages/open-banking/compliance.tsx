import React, {useState} from 'react';
import {
    IonBackButton,
    IonButton, IonButtons,
    IonCard,
    IonCardContent,
    IonCardSubtitle,
    IonContent,
    IonHeader,
    IonImg,
    IonPage,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import firebase from "firebase";


export default function  Compliance (props:any)  {
    const db =firebase.firestore();


    function nav() {

    }

    return (
        <IonPage>
            <IonHeader >
                <IonToolbar color="medium">
                    <IonTitle>Compliance</IonTitle>
                    <IonButtons slot="start">
                        <IonBackButton color='light' defaultHref='./manage-property' text=''/>
                    </IonButtons>
                </IonToolbar>

            </IonHeader>
            <IonContent >


                <div >
                    <IonImg src='./assets/img/compliance.jpg'/>
                    <IonCard className='card  ion-no-margin'>


                        <div  className={'ion-text-center ion-padding'}>



                            <IonCardContent>
                                Proceed with open banking
                            </IonCardContent>
                            <div  className={'ion-padding'}>


                                <IonButton    onClick={e => {
                                    nav()
                                }} className='next smaller' expand={'block'}>
                                    Proceed
                                </IonButton>


                                <IonButton    onClick={e => {
                                    e.preventDefault();
                                    nav()
                                }} className='next smaller' expand={'block'}>
                                    Back
                                </IonButton>
                            </div>
                        </div>

                    </IonCard>
                </div>


            </IonContent>

        </IonPage>
    );
};


