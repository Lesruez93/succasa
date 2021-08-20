import React, {useEffect, useState} from 'react';
import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonCard,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel, IonLoading,
    IonPage,
    IonToolbar, useIonViewWillEnter
} from '@ionic/react';
import './tenant-refencing.css';
import {checkmarkCircle, settingsOutline} from "ionicons/icons";
import {getApiRequest} from "../../api";
import firebase from "firebase";


export default function  TenantReferencingLandlord (props:any) {
    const [showLoading, setShowLoading] = useState(false);
    const [property,setProperty] = useState<any>({});

    const [array,setArray] = useState<any>([]);
    const db = firebase.firestore();

    function nav() {
        props.history.push('/profile');

    }

    useEffect(()=>{
     //   const id: any = localStorage.getItem('property_id');
        db.collection('referencing').doc('1').onSnapshot((snapshot => {

            setProperty(snapshot.data());

        }));
    },[db]);

    function getDocuments(){
        getApiRequest(`properties/${localStorage.getItem('property_id')}?include=documents.documenttype`)
            .then((res:any)=>{
                let ids:any = [];
                setShowLoading(false);
                try {

                    for (let d of res.data.included) {

                        if (d.type === "documenttypes") {
                            console.log(d.id);
                            ids.push(d.id)

                        }
                    }
                    setArray(ids);
                    localStorage.setItem('documents',JSON.stringify(ids));
                }catch (e) {

                }
            })

    }
    useIonViewWillEnter(()=>{
        // try {
        //     setArray(JSON.parse(localStorage.documents));
        //     setShowLoading(false);
        //     getDocuments();
        // }
        // catch (e) {
        //     getDocuments()
        // }

    });

    return (
    <IonPage>
        <IonHeader >
            <IonToolbar color='medium'   >
                <IonButtons   slot="start">
                    <IonBackButton defaultHref={'./'} color='light'  text=''/>
                </IonButtons>


            </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>

            <div className='ion-text-center ion-padding'>

                <h2>Add information and start adding your property</h2>

            </div>

          <IonCard className={'ion-padding'}>
            <IonItem onClick={e=>{
                e.preventDefault();
                props.history.push({
                    pathname:'./property-overview',

                })
            }} color={'none'} detail={false} lines={'none'}>
                <IonLabel>
                  Personal Details
                </IonLabel>
                <IonIcon icon={checkmarkCircle} color="success" size={'large'} slot="end"/>
            </IonItem>
        </IonCard>
            <IonCard className={'ion-padding'}>
                <IonItem onClick={e=>{
                    e.preventDefault();

                }} color={'none'} detail={false} lines={'none'}>
                    <IonLabel>
                        Previous Landlord
                    </IonLabel>
                    <IonButton  slot='end'    color='medium'>
                        Continue
                    </IonButton>
                </IonItem>
            </IonCard>
            <IonCard className={'ion-padding'}>
                <IonItem onClick={e=>{
                    e.preventDefault();
                    props.history.push({
                        pathname:'./my-documents',

                    })
                }} color={'none'} detail={false} lines={'none'}>
                    <IonLabel>
                       Employment history
                    </IonLabel>
                    <IonButton hidden={array.length === 3 } slot='end'    color='medium'>
                        Continue
                    </IonButton>

                    <IonIcon hidden={array.length !== 3 }  icon={checkmarkCircle} color="success" size={'large'} slot="end"/>
                </IonItem>
            </IonCard>
            <IonCard className={'ion-padding'}>
                <IonItem onClick={e=>{
                    e.preventDefault();
                    props.history.push('./tenancy-requirements')

                }} color={'none'} detail={false} lines={'none'}>
                    <IonLabel>
                     ID verification
                    </IonLabel>
                    <IonButton  slot='end'    color='medium'>
                        Continue
                    </IonButton>
                </IonItem>
            </IonCard>
<div className="ion-padding">
    <IonButton  onClick={e=>{
        e.preventDefault();
        props.history.push({
            pathname:'./property-overview',
            state:props.location.state
        })
    }} className={'next'} expand={'block'}>

        Next
    </IonButton>
</div>
            <IonLoading
                cssClass='my-custom-class'
                isOpen={showLoading}
                onDidDismiss={() => setShowLoading(false)}
                message={'Loading...'}

            />
      </IonContent>
    </IonPage>
  );
};


