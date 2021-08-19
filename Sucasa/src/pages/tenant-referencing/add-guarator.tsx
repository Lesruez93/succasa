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


export default function  AddGuarantor (props:any)  {

    const  [properties,setProperties] = useState<any>([]);





    return (
        <IonPage>
            <IonHeader >
                <IonToolbar color="medium">
                    <IonTitle>Add Guarantor</IonTitle>
                    <IonButtons slot="start">
                        <IonBackButton color='light' defaultHref='./tabs/dashboard' text=''/>
                    </IonButtons>
                </IonToolbar>

            </IonHeader>
            <IonContent >


                <div >
                    <IonImg src='./assets/img/success.jpg'/>
                    <IonCard className='card  ion-no-margin'>


                        <div  className={'ion-text-center ion-padding'}>



                            <IonCardContent>

                             Unfortunately we were not able to confirm all of your details that you have provided.
                                As a result Tongayi has requested to include a guarantor on to tenancy
                            <br/>

                            This will require them to create a account with us and successfully complete the referencing process <br/>

                                    Alternatively you can cancel the tenancy process <br/>



                            </IonCardContent>
                            <div  className={'ion-padding'}>


                                <IonButton    onClick={e => {
                                e.preventDefault();
                                props.history.replace('./invite-guarantor')
                            }} className='next smaller' expand={'block'}>
                                Invite my guarantor
                            </IonButton>

                                <IonButton    onClick={e => {
                                    e.preventDefault();

                                }} className='next smaller' expand={'block'}>
                                    cancel tenancy process
                                </IonButton>

                            </div>
                        </div>

                    </IonCard>
                </div>


            </IonContent>

        </IonPage>
    );
};


