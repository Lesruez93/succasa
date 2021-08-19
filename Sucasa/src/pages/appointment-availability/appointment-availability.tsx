import React, {useState} from 'react';
import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonDatetime,
    IonGrid,
    IonHeader,
    IonItem,
    IonPage,
    IonText,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import moment from "moment";
import firebase from "firebase";
import {PropertyIdStore, UserStore} from "../../Store/UserStore";
import useSWR from "swr";
import {fetcher, fetcherOption, toast} from "../../api";


export default function  AppointmentAvailability (props:any)  {
    const db = firebase.firestore();

    const [selectedDate, setSelectedDate] = useState<any>(moment(moment().format()).format('MM/DD/YYYY'));
    const user:any = UserStore.useState(s => s.user);
    const propertyId:any = PropertyIdStore.useState(s => s.propertyId);
    const { data, error } = useSWR('properties/'+propertyId, fetcher,fetcherOption);




    function next() {
        db.collection('alerts').add({
            uid:props.location.state,
            message:`New appointment request from ${user} for your ${data.attributes.title}`,
            type:'prompt',
            date:moment(selectedDate).format('YYYY-MM-DD'),
            property_id:propertyId,
            time:Date.now.toString()
        }).then(()=>{
            toast('Your appointment request has been sent to the landlord. We will let you know once it has been accepted in your dashboard')
        }).catch(()=>{
            toast('failed please try again')
        })

    }

    return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar  color='medium'>
            <IonButtons slot="start">
                <IonBackButton defaultHref={'./property-advert'} color='light'  text=''/>
            </IonButtons>
            <IonTitle> Viewing request</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent >


<IonGrid>
    <div className={'ion-text-center ion-padding'}>
        <IonText>
            What date you want to start doing appointments
        </IonText>

    </div>

          <IonItem className={'ion-item'} lines='none'>
              <IonDatetime  placeholder="Date"  displayFormat="YYYY-MM-DDTHH:mm" value={selectedDate} onIonChange={e => setSelectedDate(e.detail.value!)}/>
          </IonItem>

</IonGrid>
          <div className={'ion-padding'}>
          <IonButton  disabled={ !selectedDate }  onClick={e => {
              e.preventDefault();
              next()
          }} className={'next'} expand={'block'}>

              Next
          </IonButton>
          </div>
      </IonContent>
    </IonPage>
  );
};


