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


export default function  PropertyViewingFeedback (props:any)  {


    function nav() {

        props.history.replace('./rental-offer')
    }

    return (
        <IonPage>
            <IonHeader >
                <IonToolbar color="medium">
                   <IonTitle>Property viewing feedback</IonTitle>
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
                            We hope the property was perfect for your needs. If you wish to move into this property you can submit your rental offer below to begin the tenancy process

                       <br/>
                       <br/>
                            If you need more time to decide don't worry you can come back to this later
                        </IonCardContent>
                            <div  className={'ion-padding'}>


                            <IonButton    onClick={e => {
                                e.preventDefault();
                                props.history.push({
                                    pathname:'/property-compliance-document',
                                })
                            }} className='next smaller' expand={'block'}>
                                Submit my rental offer
                            </IonButton>
                                <IonButton    onClick={e => {
                                    e.preventDefault();
                                   nav()
                                }} className='next smaller' expand={'block'}>
                                    Sorry, it doesn't suit my needs
                                </IonButton>
                        </div>
                    </div>

                </IonCard>
                </div>


            </IonContent>

        </IonPage>
    );
};


