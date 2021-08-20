import React, {useState} from 'react';
import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonCol,
    IonContent,
    IonDatetime,
    IonGrid,
    IonHeader,
    IonItem,
    IonPage,
    IonRow,
    IonText,
    IonToolbar
} from '@ionic/react';
import './dob.css';
import moment from "moment";


export default function  Dob (props:any)  {
    const [selectedDate, setSelectedDate] = useState<any>(null);
    const [selectedMonth, setSelectedMonth] = useState<any>(null);
    const [selectedYear, setSelectedYear] = useState<any>(null);

    let newData :any = {};
    try {
        newData = JSON.parse(localStorage.user);
    }
    catch (e) {

    }
    return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar  >
            <IonButtons slot="start">
                <IonBackButton defaultHref={'/personal-details-id-upload'} color='dark'  text=''/>
            </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
          <div className={'ion-text-center '}>

              <h2>Personal Details</h2>

          </div>

<IonGrid>
    <div className={'ion-text-center ion-padding'}>
        <IonText>
            Please give your date of birth
        </IonText>

    </div>
    <IonRow>
        <IonCol>
          <IonItem className={'ion-item'} lines='none'>
              <IonDatetime displayFormat="DD" placeholder="Day" pickerFormat="DD" value={selectedDate} onIonChange={e => setSelectedDate(e.detail.value!)}/>
          </IonItem>
        </IonCol>
        <IonCol>
          <IonItem  className={'ion-item'} lines='none'>
              <IonDatetime displayFormat="MMMM" placeholder="Month" pickerFormat="MMMM" value={selectedMonth} onIonChange={e => setSelectedMonth(e.detail.value!)}/>
          </IonItem>
        </IonCol>
        <IonCol>
          <IonItem  className={'ion-item'} lines='none'>
              <IonDatetime  placeholder="Year" displayFormat="YYYY"  pickerFormat="YYYY " value={selectedYear} onIonChange={e => setSelectedYear(e.detail.value!)}/>
          </IonItem>
        </IonCol>
    </IonRow>
</IonGrid>
          <div className={'ion-padding'}>
          <IonButton  disabled={!selectedMonth || !selectedDate || !selectedYear}  onClick={e => {
              e.preventDefault();

              function next() {
                  if(selectedMonth && selectedDate && selectedYear){
                      newData.dob = moment(selectedYear).format('YYYY') + '-' + moment(selectedMonth).format('MM')  + '-' + moment(selectedDate).format('DD') ;
                      localStorage.setItem("userData", JSON.stringify(newData));
                      props.history.push(
                         '/your-address'
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


