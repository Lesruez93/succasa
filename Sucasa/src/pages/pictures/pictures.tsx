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
import firebase from "firebase";


export default function  Pictures (props:any)  {

const  [properties,setProperties] = useState<any>([]);
const [isProp, setIsProp] = useState<any>(false);
    const [empty, setEmpty] = useState<any>(false);
    const [loader, setLoader] = useState<any>(true);
    const [searchText, setSearchText] = useState('');
    const db =firebase.firestore();


    function nav() {
        const id:any = localStorage.getItem('property_id');
        db.collection('properties').doc(id).update({requirements:'skipped'}).then();
        props.history.replace('./manage-property')
    }

    return (
        <IonPage>
            <IonHeader >
                <IonToolbar color="medium">
                   <IonTitle>Upload Pictures</IonTitle>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref={'./move-in-date'} color='light'  text=''/>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>


        <div >
                <IonImg className='img1' src='./assets/img/pictures.jpg'/>
                <IonCard className='card  ion-no-margin'>
                    <div className={'ion-text-center '}>

                        <IonCardSubtitle className='ion-margin-top'><h1>Upload Pictures</h1></IonCardSubtitle>

                    </div>

                    <div  className={'ion-text-center ion-padding'}>



                        <IonCardContent>
                            We suggest adding a few pictures of the property, make sure you include all rooms and areas. If you want to use one of our professional photographers instead you can skip this step and we will arrange a photographer for you                        </IonCardContent>
                        <div  className={'ion-padding'}>
                            <IonButton    onClick={e => {
                                e.preventDefault();
                               nav()
                            }} className='next smaller' expand={'block'}>
                                Skip
                            </IonButton>

                            <IonButton    onClick={e => {
                                e.preventDefault();
                                props.history.push({
                                    pathname:'/add-property-upload',
                                })
                            }} className='next smaller' expand={'block'}>
                                Add
                            </IonButton>
                        </div>
                    </div>

                </IonCard>
                </div>


            </IonContent>

        </IonPage>
    );
};


