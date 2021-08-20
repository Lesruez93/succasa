import React, {useState} from 'react';
import {
    IonBackButton,
    IonButton,
    IonButtons,
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


export default function  TenancyDetails (props:any)  {

const  [properties,setProperties] = useState<any>([]);
const [isProp, setIsProp] = useState<any>(false);
    const [empty, setEmpty] = useState<any>(false);
    const [loader, setLoader] = useState<any>(true);
    const [searchText, setSearchText] = useState('');

    const db =firebase.firestore();

    function nav() {
        const id:any = localStorage.getItem('property_id');
        db.collection('properties').doc(id).update({tenancy:"skipped"}).then();
        props.history.replace('./manage-property')
    }

    return (
        <IonPage>
            <IonHeader >
                <IonToolbar color="medium">
                   <IonTitle> Tenancy Details</IonTitle>
                    <IonButtons slot="start">
                        <IonBackButton color='light' defaultHref='./manage-property' text=''/>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>


        <div >
                <IonImg className='img1' src='./assets/img/tenancy.jpg'/>
                <IonCard className='card  ion-no-margin'>
                    <div className={'ion-text-center '}>

                        <IonCardSubtitle className='ion-margin-top'><h1> Tenancy Details</h1></IonCardSubtitle>

                    </div>

                    <div  className={'ion-text-center ion-padding'}>



                        <IonCardContent>
                             Here is where you will be able to add your monthly rent price, select your tenancy terms, decide on your earliest move in date and set your tenant preferences... You can skip and finish this later if you wish
                        </IonCardContent>
                        <div  className={'ion-padding'}>


                            <IonButton    onClick={e => {
                                e.preventDefault();
                                props.history.push({
                                    pathname:'/rent-deposit',
                                })
                            }} className='next smaller' expand={'block'}>
                                Add
                            </IonButton>

                            <IonButton    onClick={e => {
                            e.preventDefault();
                          nav()
                        }} className='next smaller' expand={'block'}>
                            Skip
                        </IonButton>
                        </div>
                    </div>

                </IonCard>
                </div>


            </IonContent>

        </IonPage>
    );
};


