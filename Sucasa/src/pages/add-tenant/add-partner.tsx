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


export default function  AddPartner (props:any)  {





    return (
        <IonPage>
            <IonHeader >
                <IonToolbar color="medium">
                   <IonTitle> Invite Partner
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
                            Here you can invite a landlord partner to manage the property with you.
                            <br/>
                            This could be your spouse or business partner Your partner will be able to view all the documents and will be notified anytime you make any changes to the property
                            <br/>


                        </IonCardContent>

                        <div  className={'ion-padding'}>

                            <IonButton    onClick={e => {
                                e.preventDefault();
                                props.history.push({
                                    pathname:'/invite-partner',
                                })
                            }} className='next smaller' expand={'block'}>
                                Invite partner
                            </IonButton>


                        </div>
                    </div>

                </IonCard>
                </div>


            </IonContent>

        </IonPage>
    );
};


