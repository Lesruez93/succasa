import React from 'react';
import {
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


export default function  Advertised (props:any)  {




    return (
        <IonPage>
            <IonHeader >
                <IonToolbar color="medium">
                   <IonTitle>Property advertised</IonTitle>
                    <IonButtons slot="start">
                    <IonBackButton color='light' defaultHref='./property-profile' text=''/>
                </IonButtons>
                </IonToolbar>

            </IonHeader>
            <IonContent >


        <div>
                <IonImg src='./assets/img/compliance.jpg'/>
                <IonCard className='card  ion-no-margin'>
                    <div className={'ion-text-center '}>


                    </div>

                    <div  className={'ion-text-center ion-padding'}>



                        <IonCardContent>
                            Well done! Your property will be live within the next 24 hours. You will be notified of all enquiries and viewing requests via your dashboard
                        </IonCardContent>
                            <div  className={'ion-padding'}>


                            <IonButton    onClick={e => {
                                e.preventDefault();
                              props.history.push('./tabs/dashboard')
                            }} className='next smaller' expand={'block'}>
                                Duplicate
                            </IonButton>

                        </div>
                    </div>

                </IonCard>
                </div>


            </IonContent>

        </IonPage>
    );
};


