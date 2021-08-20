import React, {useState} from 'react';
import {
    IonAlert,
    IonBackButton,
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardSubtitle,
    IonContent,
    IonHeader,
    IonImg,
    IonLoading,
    IonPage,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import {getApiRequest} from "../../api";


export default function  AddPaymentMethod (props:any)  {




    return (
        <IonPage>
            <IonHeader >
                <IonToolbar color="medium">
                   <IonTitle>Add Payment Method</IonTitle>
                    <IonButtons slot="start">
                    <IonBackButton color='light' defaultHref='./tabs/dashboard' text=''/>
                </IonButtons>
                </IonToolbar>

            </IonHeader>
            <IonContent >


        <div>
                <IonImg src='./assets/img/payment.jpeg'/>
                <IonCard className='card2  ion-no-margin'>
                    <div className={'ion-text-center '}>


                    </div>

                    <div  className={'ion-text-center ion-padding'}>



                        <IonCardContent>
                            Please connect a primary payment method to collect your rent and make payments                        </IonCardContent>
                            <div  className={'ion-padding'}>


                            <IonButton    onClick={e => {
                                e.preventDefault();
                              props.history.push({
                                  pathname:'./payment-methods',
                                    state:'add'
                              })
                            }}
                                          className='next smaller' expand={'block'}>
                               Add
                            </IonButton>

                        </div>
                    </div>

                </IonCard>
                </div>


            </IonContent>

        </IonPage>
    );
};


