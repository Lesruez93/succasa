import React, {useState} from 'react';
import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonDatetime,
    IonHeader,
    IonItem,
    IonPage,
    IonText, IonTitle,
    IonToolbar
} from '@ionic/react';
import './move-in-date.css';
import moment from "moment";


export default function  MoveInDate(props:any) {
    const [selectedDate, setSelectedDate] = useState<any>(null);


    let propData : any = {}

    try {
     propData =   JSON.parse(localStorage.propData);
    }catch (e) {

    }

    return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar color='medium' >
            <IonButtons slot="start">
                <IonBackButton defaultHref={'./tenancy-requirements'} color='light'  text=''/>
            </IonButtons>
            <IonTitle>Move in Date</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
          <div className={'ion-text-center '}>

              <h2>Add your property</h2>

          </div>


    <div className={'ion-text-center ion-padding'}>
        <IonText>
            Please select the earliest available date.
        </IonText>
        <IonItem className={'ion-item'} lines='none'>
            <IonDatetime placeholder="Select Day"  value={selectedDate} onIonChange={e => setSelectedDate(e.detail.value!)}/>
        </IonItem>
    </div>




          <div className={'ion-padding'}>
          <IonButton  disabled={ !selectedDate}  onClick={e => {
              e.preventDefault();

              function next() {
                  if(selectedDate ){
                      propData.ealiest_available_date = moment(selectedDate).format('YYYY-MM-DD') ;
                      localStorage.setItem("propData", JSON.stringify(propData));
                     props.history.push(
                         '/upload-pictures'
                       );
                  }
              }

              next()
          }} className={'next'} expand={'block'}>

              Next
          </IonButton>
          </div>
      </IonContent>
    </IonPage>
  );
};


