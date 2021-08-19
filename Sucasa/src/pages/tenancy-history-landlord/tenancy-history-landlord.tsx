import React, {useState} from 'react';
import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonPage,
    IonText,
    IonToolbar
} from '@ionic/react';
import './tenancy-history.css';


export default function TenancyHistoryLandlord (props:any) {
    const [name, setName] = useState<any>(null);
    const [email, setEmail] = useState<any>(null);
    const [number, setNumber] = useState<any>(null);
    let tenacyHistory :any;

    function next() {


        localStorage.setItem('tenancyData',JSON.stringify(tenacyHistory));
        props.history.push('/property-address')
    }

    return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar  >
            <IonButtons slot="start">
                <IonBackButton defaultHref={'./tenant-referencing'} color='dark'  text=''/>
            </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
          <div className={'ion-text-center '}>

              <h2>Tenancy history</h2>

          </div>


    <div className={'ion-text-center ion-padding'}>
        <IonText>
            Please can you provide us with details of your previous landlord
        </IonText>

        <IonItem className=' ion-margin-top' lines='none'>
            <IonLabel position='stacked' > Full Name</IonLabel>

            <IonInput   value={name} onIonChange={y => setName(y.detail.value!)}  className='input'  />
        </IonItem>

        <IonItem className=' ion-margin-top' lines='none'>
            <IonLabel position='stacked' > Email Address</IonLabel>
            <IonInput  type='email' value={email} onIonChange={y => setEmail(y.detail.value!)}  className='input'  />
        </IonItem>

        <IonItem className=' ion-margin-top' lines='none'>
            <IonLabel position='stacked' > Phone Number</IonLabel>

            <IonInput type='number'  value={number} onIonChange={y => setNumber(y.detail.value!)}  className='input'  />
        </IonItem>
    </div>




          <div className={'ion-padding'}>
          <IonButton  disabled={ !name ||!email || !number}  onClick={e => {
              e.preventDefault();
              next()
          } }
          className={'next'} expand={'block'}>

              Next
          </IonButton>
          </div>
      </IonContent>
    </IonPage>
  );
};

