import React, {useState} from 'react';
import {
    IonButton,
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


export default function  UploadId (props:any)  {

const  [properties,setProperties] = useState<any>([]);
const [isProp, setIsProp] = useState<any>(false);
    const [empty, setEmpty] = useState<any>(false);
    const [loader, setLoader] = useState<any>(true);
    const [searchText, setSearchText] = useState('');




    return (
        <IonPage>
            <IonHeader >
                <IonToolbar color="medium">
                   <IonTitle>Complete Registration</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>


        <div >
                <IonImg src='./assets/img/dcbg.png'/>
                <IonCard className='card  ion-no-margin'>
                    <div className={'ion-text-center '}>

                        <IonCardSubtitle className='ion-margin-top'><h1>Upload ID</h1></IonCardSubtitle>

                    </div>

                    <div  className={'ion-text-center ion-padding'}>



                        <IonCardContent>
                            Note: Tenants may not want to rent from an unverified Landlord
                        </IonCardContent>
                        <div  className={'ion-padding'}>
                            <IonButton    onClick={e => {
                                e.preventDefault();
                                props.history.replace('./welcome')
                            }} className='next smaller' expand={'block'}>
                                I don't want to Verify my account I will upload my ID Later
                            </IonButton>

                            <IonButton    onClick={e => {
                                e.preventDefault();
                                props.history.push({
                                    pathname:'./personal-details-id',
                                })
                            }} className='next' expand={'block'}>

                               Upload Now

                            </IonButton>
                        </div>
                    </div>

                </IonCard>
                </div>


            </IonContent>

        </IonPage>
    );
};


