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
    IonLabel,
    IonLoading,
    IonPage,
    IonToolbar,
    useIonViewWillEnter
} from '@ionic/react';
import './manage-property.css';
import {checkmarkCircle} from "ionicons/icons";
import {fetcher, fetcherOption, getApiRequest} from "../../api";
import firebase from "firebase";
import useSWR from "swr";


export default function  ManageProperty (props:any) {
    const [showLoading, setShowLoading] = useState(false);
    const [property,setProperty] = useState<any>({});
    const [array,setArray] = useState<any>([]);
  const { data, error } = useSWR('properties/'+localStorage?.getItem('property_id'), fetcher,fetcherOption);
    if (props.location.state !=='add-prop' && props.location.state !== 'propAdded') { localStorage.setItem('propData',JSON.stringify(data?.data.attributes));}
    const db = firebase.firestore();

    function nav() {
        props.history.push('/profile');

    }


    useEffect(()=>{
        if (props.location.state !=='add-prop' && props.location.state !== 'propAdded') {


            const id: any = localStorage.getItem('property_id');
            db.collection('properties').doc(id).onSnapshot((snapshot => {

                setProperty(snapshot.data());

            }));
        }

    },[db, property]);
    function getDocuments(){
        getApiRequest(`properties/${localStorage.getItem('property_id')}?include=documents.documenttype`)
            .then((res:any)=>{
                let ids:any = [];
                setShowLoading(false);
                try {

                    for (let d of res.data.included) {

                        if (d.type === "documenttypes") {

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


        if (props.location.state !=='add-prop' && props.location.state !== 'propAdded') {
           // setShowLoading(true);
            try {
                setArray(JSON.parse(localStorage.documents));
                setShowLoading(false);
                getDocuments();
            }
            catch (e) {
                getDocuments()
            }

        }

    });

    return (
    <IonPage>
        <IonHeader className="ion-no-border">
            <IonToolbar className={'ion-margin-top'}  >
                <IonButtons  slot="start">
                    <IonBackButton defaultHref={'./tabs/portfolio'} color='dark'  text=''/>
                </IonButtons>


            </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>

            <div className='ion-text-center ion-padding'>

                <h2>Add information and start adding your property</h2>

            </div>

          <IonCard className={'ion-padding'}>
            <IonItem  color={'none'} detail={false} lines={'none'}>
                <IonLabel>
                  Property Details
                </IonLabel>
                {property?.type &&    <IonIcon  icon={checkmarkCircle} color="success" size={'large'} slot="end"/>}
                {!property?.type &&    <IonButton onClick={e=>{
                    e.preventDefault();
                    props.history.push({
                        pathname:'./property-address',

                    })
                }}  slot='end'    color='medium'>
                    Continue
                </IonButton>}
            </IonItem>
        </IonCard>
            <IonCard className={'ion-padding'}>
                <IonItem  color={'none'} detail={false} lines={'none'}>
                    <IonLabel>
                        Tenancy Details
                    </IonLabel>
                    {!property?.tenancy &&    <IonButton onClick={e=>{
                        e.preventDefault();
                        props.history.push({
                            pathname:'./tenancy-details',
                        })

                    }} disabled={!property?.type} slot='end'    color='medium'>
                        Continue
                    </IonButton>}

                    {property?.tenancy &&    <IonIcon  icon={checkmarkCircle} color="success" size={'large'} slot="end"/>}

                </IonItem>
            </IonCard>
            <IonCard className={'ion-padding'}>
                <IonItem  color={'none'} detail={false} lines={'none'}>
                    <IonLabel>
                        Compliance
                    </IonLabel>
                    {!property?.compliance &&
                    <IonButton onClick={e=>{
                        e.preventDefault();
                        props.history.push('./compliance')
                    }} disabled={!property?.tenancy} slot='end'    color='medium'>
                        Continue
                    </IonButton>}

                    {property?.compliance &&    <IonIcon  icon={checkmarkCircle} color="success" size={'large'} slot="end"/>}
                </IonItem>
            </IonCard>
            <IonCard className={'ion-padding'}>
                <IonItem  color={'none'} detail={false} lines={'none'}>
                    <IonLabel>
                     Tenant requirements
                    </IonLabel>
                    {!property?.requirements &&          <IonButton onClick={e=>{
                        e.preventDefault();
                        props.history.push('./tenancy-requirements')
                    }} disabled={!property?.compliance}  slot='end'    color='medium'>
                        Continue
                    </IonButton>}
                    {property?.requirements &&    <IonIcon  icon={checkmarkCircle} color="success" size={'large'} slot="end"/>}

                </IonItem>
            </IonCard>
<div className="ion-padding">
    <IonButton disabled={!property?.requirements}  onClick={e=>{
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


