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
        const id:any = localStorage.getItem('property_id');
        db.collection('properties').doc(id).update({compliance:'skipped'}).then();
        props.history.replace('./manage-property')
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
                    <div className={'ion-text-center '}>

                        <IonCardSubtitle className='ion-margin-top'><h1>Compliance</h1></IonCardSubtitle>

                    </div>

                    <div  className={'ion-text-center ion-padding'}>



                        <IonCardContent>
                            Here is where you can upload all the important stuff!

                            You will need to have all your documents ready but don't worry if you have anything missing as you can always use our verified service providers to help fill in any gaps

                        </IonCardContent>
                            <div  className={'ion-padding'}>


                            <IonButton    onClick={e => {
                                e.preventDefault();
                                props.history.push({
                                    pathname:'/property-compliance-document',
                                })
                            }} className='next smaller' expand={'block'}>
                                Ok, I'm ready to add my documents
                            </IonButton>
                                <IonButton    onClick={e => {
                                    e.preventDefault();
                                   nav()
                                }} className='next smaller' expand={'block'}>
                                    Skip
                                </IonButton>
                        </div>
                    </div>

                </IonCard>
                </div>


            </IonContent>

        </IonPage>
    );
};


