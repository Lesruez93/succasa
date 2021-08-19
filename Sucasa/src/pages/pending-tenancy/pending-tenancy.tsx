import React, {useState} from 'react';
import {
    IonAlert,
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


export default function  PendingTenancy (props:any)  {
    const db =firebase.firestore();
    const [showAlert,setShowAlert] = useState<boolean>(false);

    function nav() {
        const id:any = localStorage.getItem('property_id');
        db.collection('properties').doc(id).update({compliance:'skipped'}).then();
        props.history.replace('./manage-property')
    }

    return (
        <IonPage>
            <IonHeader >
                <IonToolbar color="medium">
                   <IonTitle>Pending Tenancy</IonTitle>
                    <IonButtons slot="start">
                    <IonBackButton color='light' defaultHref='./manage-property' text=''/>
                </IonButtons>
                </IonToolbar>

            </IonHeader>
            <IonContent >


        <div >
                <IonImg src='./assets/img/dcbg.png'/>
                <IonCard className='card  ion-no-margin'>


                    <div  className={'ion-text-center ion-padding'}>



                        <IonCardContent>
                            John has requested to view your property at Room 2, 12 High Street, Erdington, Birmingham, B23 7JJ
                            <br/>
                            <br/>
                            <p>14th March 2021 at 10:30am</p>
                        </IonCardContent>
                            <div  className={'ion-padding'}>


                            <IonButton   fill='outline' color='medium'  onClick={e => {
                                e.preventDefault();
                                setShowAlert(true)

                            }}  expand={'block'}>
                                Accept appointment
                            </IonButton>
                                <IonButton  fill='outline' color='medium'  onClick={e => {
                                    e.preventDefault();

                                }}  expand={'block'}>
                                    Reschedule appointment
                                </IonButton>
                        </div>
                    </div>

                </IonCard>
                </div>

                <IonAlert
                    isOpen={showAlert}
                    onDidDismiss={() => setShowAlert(false)}
                    message={ "Well done! you have confirmed the appointment with John. Don't worry if you can't make it you can make amendments to the appointment from your dashboard"}
                    header={'Success'}
                    buttons={[
                        {
                            text: 'Done',
                            handler: () => {
                            props.history.push('./confirm-appointment')
                            }
                        }]}
                />
            </IonContent>

        </IonPage>
    );
};


