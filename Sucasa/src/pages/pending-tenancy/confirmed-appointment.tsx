import React, {useState} from 'react';
import {
    IonAlert,
    IonBackButton,
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonContent,
    IonHeader,
    IonImg,
    IonPage,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import firebase from "firebase";


export default function  ConfirmedAppointment (props:any)  {
    const db =firebase.firestore();
    const [showAlert,setShowAlert] = useState<boolean>(false);

    function nav() {
        const id:any = localStorage.getItem('property_id');
        db.collection('properties').doc(id).update({compliance:'skipped'}).then();
        props.history.replace('./manage-property')
    }

    function addToCal() {


    }

    return (
        <IonPage>
            <IonHeader >
                <IonToolbar color="medium">
                   <IonTitle>Confirm Appointment</IonTitle>
                    <IonButtons slot="start">
                    <IonBackButton color='light' defaultHref='./pending-tenancy' text=''/>
                </IonButtons>
                </IonToolbar>

            </IonHeader>
            <IonContent >


        <div >
                <IonImg  src='./assets/img/success.jpg'/>
                <IonCard className='card2  ion-no-margin'>


                    <div  className={'ion-text-center ion-padding'}>



                        <IonCardContent>
                            Confirmed appointment for AppointmentTimeRequest on AppointmentDate at PropertyAddress with FirstName (tenant)

                        </IonCardContent>
                            <div  className={'ion-padding'}>


                            <IonButton   fill='outline' color='medium'  onClick={e => {
                                e.preventDefault();
                               addToCal()

                            }}  expand={'block'}>
                                Add to your calendar
                            </IonButton>
                                <IonButton  fill='outline' color='medium'  onClick={e => {
                                    e.preventDefault();
                                    props.history.push('./appointment-reschedule')

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

                            }
                        }]}
                />
            </IonContent>

        </IonPage>
    );
};


