import React, {useState} from 'react';
import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardTitle,
    IonContent,
    IonHeader,
    IonImg,
    IonPage,
    IonTitle,
    IonToolbar,
    IonCardSubtitle
} from '@ionic/react';


export default function  MySubscriptions (props:any)  {

    const  [properties,setProperties] = useState<any>([]);
    const [isProp, setIsProp] = useState<any>(false);
    const [empty, setEmpty] = useState<any>(false);
    const [loader, setLoader] = useState<any>(true);
    const [searchText, setSearchText] = useState('');




    return (
        <IonPage>
            <IonHeader >
                <IonToolbar color="medium">
                    <IonTitle>My Subscriptions</IonTitle>
                    <IonButtons slot="start">
                        <IonBackButton color='light' defaultHref='./settings' text=''/>
                    </IonButtons>
                </IonToolbar>

            </IonHeader>
            <IonContent >


                <div >
                    <IonImg src='./assets/img/dcbg.png'/>
                    <IonCard className='card  ion-no-margin'>
                        <div className={'ion-text-center '}>


                        </div>

                        <div  className={'ion-text-center ion-padding'}>



                            <IonCardContent>
                                <IonCardSubtitle> Tier 1 - 3 Active property listings</IonCardSubtitle>

                            </IonCardContent>
                            <div  className={'ion-padding'}>


                                <IonButton    onClick={e => {
                                    e.preventDefault();
                                    props.history.push('./upgrade-package')
                                }} className='next smaller' expand={'block'}>
                                    Upgrade package
                                </IonButton>

                            </div>
                        </div>

                    </IonCard>
                </div>


            </IonContent>

        </IonPage>
    );
};


