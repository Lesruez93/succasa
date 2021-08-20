import React, {useState} from 'react';
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


export default function  AddLandlord (props:any)  {




    return (
        <IonPage>
            <IonHeader >
                <IonToolbar color="medium">
                   <IonTitle> Invite Landlord
                   </IonTitle>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref={'/property-profile'} color='light'  text=''/>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>


        <div >
                <IonImg  src='./assets/img/dcbg.png'/>

                <IonCard className='card  ion-no-margin'>
                    <div className={'ion-text-center '}>



                    </div>

                    <div  className={'ion-text-center ion-padding'}>

                        <IonCardContent>
                            Here you can invite a landlord you currently have or a new landlord for a property you are planning to rent
                            <br/>
                            <br/>
                            Don't worry this is on us… This invitation will grant them a free 12 month subscription package
                        </IonCardContent>

                        <div  className={'ion-padding'}>

                            <IonButton    onClick={e => {
                                e.preventDefault();
                                props.history.push({
                                    pathname:'/invite-landlord',
                                })
                            }} className='next smaller' expand={'block'}>
                                Invite landlord
                            </IonButton>


                        </div>
                    </div>

                </IonCard>
                </div>


            </IonContent>

        </IonPage>
    );
};


