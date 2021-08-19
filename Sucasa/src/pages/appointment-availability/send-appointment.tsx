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
    IonText,
    IonToolbar
} from '@ionic/react';
import moment from "moment";


export default function  SendAppointment (props:any)  {
    const [selectedDate, setSelectedDate] = useState<any>(moment(moment().format()).format('MM/DD/YYYY'));
    const [showAlert,setShowAlert] = useState<boolean>(false);


    function next() {


    }

    return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar  color='medium'>
            <IonButtons slot="start">
                <IonBackButton defaultHref={'../'} color='light'  text=''/>
            </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent >
          <div className={'ion-text-center '}>

              <h2> Send appointment</h2>

          </div>

<IonGrid>
    <div className={'ion-text-center ion-padding'}>
        <IonText>
            What date you want to start doing appointments
        </IonText>

    </div>

          <IonItem className={'ion-item'} lines='none'>
              <IonDatetime  placeholder="Date"  value={selectedDate} onIonChange={e => setSelectedDate(e.detail.value!)}/>
          </IonItem>

</IonGrid>
          <div className={'ion-padding'}>
          <IonButton  disabled={ !selectedDate }  onClick={e => {
              e.preventDefault();



              next()
          }} className={'next'} expand={'block'}>

              Send appointment request
          </IonButton>
          </div>
          <IonAlert
              isOpen={showAlert}
              onDidDismiss={() => setShowAlert(false)}
              message={ "Your appointment request has been to the landlord. We will let you know once it has been accepted in your dashboard"}
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


