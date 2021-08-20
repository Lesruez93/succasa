import React, {useState} from 'react';
import {
    IonAlert,
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonDatetime,
    IonGrid,
    IonHeader,
    IonItem,
    IonPage,
    IonText, IonTitle,
    IonToolbar
} from '@ionic/react';
import moment from "moment";


export default function  AppointmentReschedule (props:any)  {
    const [selectedDate, setSelectedDate] = useState<any>();
    const [showAlert,setShowAlert] = useState<boolean>(false);

    function next() {
        setShowAlert(true)

    }

    return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar color='medium' >
            <IonButtons slot="start">
                <IonBackButton defaultHref={'../'} color='light'  text=''/>
            </IonButtons>
            <IonTitle>
                Reschedule Appointment
            </IonTitle>
        </IonToolbar>

      </IonHeader>
      <IonContent className={'ion-padding'}>


<IonGrid>
    <div className={'ion-text-center ion-padding'}>
        <IonText>
            Select new appointment date and time
        </IonText>

    </div>

          <IonItem className={'ion-item'} lines='none'>
              <IonDatetime  placeholder="Date" displayFormat='DD-MMM-YYYY  HH:mm'  pickerFormat='DD-MMM-YYYY  HH:mm' value={selectedDate} onIonChange={e => setSelectedDate(e.detail.value!)}/>
          </IonItem>

</IonGrid>
          <div className={'ion-padding'}>
          <IonButton  disabled={ !selectedDate }  onClick={e => {
              e.preventDefault();



              next()
          }} className={'next'} expand={'block'}>

              Request New Appointment
          </IonButton>
          </div>


          <IonAlert
              isOpen={showAlert}
              onDidDismiss={() => setShowAlert(false)}
              message={ "Your appointment request has been sent to FirstName (tenant). We will let you know when this has been confirmed"}
              header={'Success'}
              buttons={[
                  {
                      text: 'Done',
                      handler: () => {

                      }
                  }]}
          />
      </IonContent>
    </IonPage>
  );
};


