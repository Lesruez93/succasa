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


export default function  TenantSuccess (props:any)  {

    const  [properties,setProperties] = useState<any>([]);
    const [isProp, setIsProp] = useState<any>(false);
    const [empty, setEmpty] = useState<any>(false);
    const [loader, setLoader] = useState<any>(true);
    const [searchText, setSearchText] = useState('');




    return (
        <IonPage>
            <IonHeader >
                <IonToolbar color="medium">
                    <IonTitle>Invitation Success</IonTitle>
                    <IonButtons slot="start">
                        <IonBackButton color='light' defaultHref='./add-tenant' text=''/>
                    </IonButtons>
                </IonToolbar>

            </IonHeader>
            <IonContent >


                <div >
                    <IonImg src='./assets/img/compliance.jpg'/>
                    <IonCard className='card  ion-no-margin'>
                        <div className={'ion-text-center '}>

                            <IonCardSubtitle className='ion-margin-top'><h1>Invitation Success</h1></IonCardSubtitle>

                        </div>

                        <div  className={'ion-text-center ion-padding'}>



                            <IonCardContent>
                                Your tenant invitation email has been sent!

                                We will let you know once they have created their account

                            </IonCardContent>
                            <div  className={'ion-padding'}>


                                <IonButton    onClick={e => {
                                    e.preventDefault();
                                    props.history.push({
                                        pathname:'/tenants',
                                    })
                                }} className='next smaller' expand={'block'}>
                                    Thanks, take me back to my dashboard
                                </IonButton>

                            </div>
                        </div>

                    </IonCard>
                </div>


            </IonContent>

        </IonPage>
    );
};


