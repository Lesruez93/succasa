import React, {useState} from 'react';
import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonDatetime,
    IonHeader, IonInput,
    IonItem, IonLabel,
    IonPage,
    IonText,
    IonToolbar
} from '@ionic/react';
import './start-working-date.css';
import moment from "moment";


export default function  StartWorkingDate(props:any) {
    const [selectedDate, setSelectedDate] = useState<any>(null);
    const [salary, setSalary] = useState<any>(null);


    let propData : any ={};

    return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar  >
            <IonButtons slot="start">
                <IonBackButton defaultHref={'./'} color='dark'  text=''/>
            </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
          <div className={'ion-text-center '}>

              <h2>Add your property</h2>

          </div>


    <div className={'ion-text-center ion-padding'}>
        <IonText><strong>
            Please can you provide us with details of your employment history
        </strong>
        </IonText>
        <IonItem className='ion-item ion-margin-top' lines='none'>

            <IonDatetime   placeholder="What date did you start working"  value={selectedDate} onIonChange={e => setSelectedDate(e.detail.value!)}/>
        </IonItem>

        <IonItem color={'none'} lines={'none'}>
            <IonLabel position={'stacked'} >What is your annual Salary</IonLabel>
            <IonInput  value={salary} onIonChange={y => setSalary(y.detail.value!)}  className='input ion-padding-start' >£</IonInput>
        </IonItem>
    </div>




          <div className={'ion-padding'}>
          <IonButton  disabled={ !selectedDate || salary}  onClick={e => {
              e.preventDefault();

              function next() {
                  if(selectedDate ){
                      propData.ealiest_available_date = moment(selectedDate).format('YYYY-MM-DD') ;
                      localStorage.setItem("employmentData", JSON.stringify(propData));
                     props.history.push(
                         '/property-type'
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


