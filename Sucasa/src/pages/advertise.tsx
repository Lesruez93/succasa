import React, {useState} from 'react';
import {
    IonBackButton,
    IonButton, IonButtons,
    IonCard,
    IonCardContent,
    IonCardSubtitle,
    IonContent,
    IonHeader,
    IonImg, IonLabel,
    IonPage,
    IonTitle,
    IonToolbar
} from '@ionic/react';


export default function  Advertise (props:any)  {

const  [properties,setProperties] = useState<any>([]);
const [isProp, setIsProp] = useState<any>(false);
    const [empty, setEmpty] = useState<any>(false);
    const [loader, setLoader] = useState<any>(true);
    const [searchText, setSearchText] = useState('');




    return (
        <IonPage>
            <IonHeader >
                <IonToolbar color="medium">
                   <IonTitle> Advertise your property
                   </IonTitle>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref={'/property-profile'} color='light'  text=''/>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>


        <div >
                <IonImg className='img2'  src='./assets/img/advertise.jpg'/>

                <IonCard className='card2  ion-no-margin'>
                    <div className={'ion-text-center '}>



                    </div>

                    <div  className={'ion-text-center ion-padding'}>

                        <IonCardContent>
                            We have partnered with major online marketplaces to give your property maximum exposure

                        </IonCardContent>

                        <div  className={'ion-padding'}>

                            <IonButton    onClick={e => {
                                e.preventDefault();
                                props.history.push({
                                    pathname:'/advertise-dashboard',
                                })
                            }} className='next smaller' expand={'block'}>
                                Advertise your property
                            </IonButton>


                        </div>
                    </div>

                </IonCard>
                </div>


            </IonContent>

        </IonPage>
    );
};


