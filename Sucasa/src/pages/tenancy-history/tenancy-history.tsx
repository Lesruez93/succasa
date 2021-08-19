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
import ReactPhoneInput from "react-phone-input-2";


export default function TenancyHistory (props:any) {
    const [name, setName] = useState<any>('');
    const [last_name, setLastName] = useState<any>('');
    const [email, setEmail] = useState<any>('');
    const [number, setNumber] = useState<any>('');


    const  handleOnChange = (value:any) => {
        setNumber('+'+value)
    };
    function next(e:any) {
        e.preventDefault();
        const data =
            {

                    "tenant_refferencing_id":"2",
                    "landlord_name": name +' '+last_name,
                    "landlord_email": email,
                    "landlord_mobile": number,
                    // "street_address": ,
                    // "postcode": "Dicta laborum saepe",
                    // "status": "Earum perspiciatis"
                }

    };

    return (
    <IonPage>
        <IonHeader className="ion-no-border">
            <IonToolbar color='medium'   >
            <IonButtons slot="start">
                <IonBackButton defaultHref={'./tenant-referencing'} color='light'  text=''/>
            </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
          <div className={'ion-text-center '}>

              <h2>Tenancy history</h2>

          </div>


    <div className={'ion-text-center ion-padding'}>
        <IonText>
            We now just need to confirm the details for your current landlord
        </IonText>
        <form onSubmit={(event1 => next(event1))}>
        <IonItem className=' ion-margin-top' lines='none'>
            <IonLabel position='stacked' > Full Name</IonLabel>

            <IonInput required  value={name} onIonChange={y => setName(y.detail.value!)}  className='input'  />
        </IonItem>

        <IonItem className=' ion-margin-top' lines='none'>
            <IonLabel position='stacked' > Last Name</IonLabel>

            <IonInput   required  value={last_name} onIonChange={y => setLastName(y.detail.value!)}  className='input'  />
        </IonItem>
        
        <IonItem className=' ion-margin-top' lines='none'>
            <IonLabel position='stacked' > Email Address</IonLabel>
            <IonInput required  type='email' value={email} onIonChange={y => setEmail(y.detail.value!)}  className='input'  />
        </IonItem>
        <div className='ion-margin'>
            <IonLabel  className='ion-margin-bottom'   position="stacked">Phone Number</IonLabel>
        </div>
        <div className='ion-margin'>

            <ReactPhoneInput

                value={number}
                placeholder={'Phone number'}
                enableSearch={true}
                country={'gb'}
                onChange={handleOnChange}
            />
        </div>

          <div className={'ion-padding'}>
          <IonButton  type='submit' disabled={ !name ||!email || !number}
          className={'next'} expand={'block'}>

              Next
          </IonButton>
          </div>
      </form>
    </div>
      </IonContent>
    </IonPage>
  );
};

