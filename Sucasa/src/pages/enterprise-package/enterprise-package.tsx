import React, {useState} from 'react';
import {
    IonBackButton,
    IonButton, IonButtons,
    IonCard,
    IonCardContent,
    IonCardSubtitle,
    IonContent,
    IonHeader,
    IonImg, IonInput, IonItem, IonLabel,
    IonPage, IonTextarea,
    IonTitle,
    IonToolbar
} from '@ionic/react';


export default function  EnterprisePackage (props:any)  {

    const  [properties,setProperties] = useState<any>([]);

    const [loader, setLoader] = useState<any>(true);





    return (
        <IonPage>
            <IonHeader >
                <IonToolbar color="medium">
                    <IonTitle>Enterprise Portfolio Package</IonTitle>
                    <IonButtons slot="start">
                        <IonBackButton color='light' defaultHref='./subscription' text=''/>
                    </IonButtons>
                </IonToolbar>

            </IonHeader>
            <IonContent >


                <div >
                    <IonImg src='./assets/img/compliance.jpg'/>
                    <IonCard className='card  ion-no-margin'>


                        <div  className={'ion-text-center ion-padding'}>



                            <IonCardContent>
                                This package is suitable for Landlords with large portfolios or property Manager looking for a better way to manage their portfolio

                            </IonCardContent>
                            <div  className={'ion-padding'}>

                                <IonItem color={'none'} lines={'none'}>
                                    <IonLabel position={'stacked'} >Subject</IonLabel>
                                    <IonTextarea  disabled  value={'I would like to sign up to your enterprise subscription package'}  />

                                </IonItem>
                                <IonButton    onClick={e => {
                                    e.preventDefault();
                                    props.history.push({
                                        pathname:'./',
                                    })
                                }} className='next smaller' expand={'block'}>
                                    Send call back request
                                </IonButton>

                            </div>
                        </div>

                    </IonCard>
                </div>


            </IonContent>

        </IonPage>
    );
};


