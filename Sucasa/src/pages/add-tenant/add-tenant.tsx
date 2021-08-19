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


export default function  AddTenant (props:any)  {




    return (
        <IonPage>
            <IonHeader >
                <IonToolbar color="medium">
                   <IonTitle> Invite Tenant
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
                            Here you can invite an existing tenant that you currently have in your property or invite a new tenant
                        </IonCardContent>

                        <div  className={'ion-padding'}>

                            <IonButton    onClick={e => {
                                e.preventDefault();
                                props.history.push({
                                    pathname:'/invite-tenant',
                                })
                            }} className='next smaller' expand={'block'}>
                                Invite tenant
                            </IonButton>


                        </div>
                    </div>

                </IonCard>
                </div>


            </IonContent>

        </IonPage>
    );
};


