import React, {useState} from 'react';
import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonCard,
    IonCol,
    IonContent,
    IonHeader,
    IonLoading,
    IonPage,
    IonRow,
    IonText,
    IonToast,
    IonToolbar,
    useIonViewWillEnter
} from '@ionic/react';
import './tenant-address-details.css';


export default function TenantAddressDetails (props:any)  {
    const [address, setAddress] = useState<any>(null);
    const [addresses, setAddresses] = useState(false);
    const [addressList, setAddressList] = useState<any>([]);
    const [postCode, setText] = useState<any>(null);
    const [message, setMessage] = useState<any>(null);
    const [years, setYears] = useState<any>(null);
    const [color, setColor] = useState<any>(null);
    const [showToast, setShowToast] = useState(false);
    const [showLoading, setShowLoading] = useState(false);

let newData:any;


useIonViewWillEnter(()=>{
    try {
        newData = JSON.parse(localStorage.user);
    }catch (e) {
        console.log(e)
    }
});





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

              <h2>Tenancy history</h2>

          </div>
          <div className='ion-text-center ion-margin-top ion-padding '>
              <IonText>Please can you provide us with details of your previous addresses</IonText>
          </div>


          <IonCard className="ion-padding">
            <IonRow >
                <IonCol size='10' className='ion-padding-start ion-padding-end' >
                    <p>
                        1a Butterwick Close
                        1a Butterwick Close
                        1a Butterwick Close
                        1a Butterwick Close


                    </p>

            </IonCol>

                <IonCol size='2'>
                    <IonButton size='small' color='medium'> Edit</IonButton>
                </IonCol>
            </IonRow>
          </IonCard>

          <div className={'ion-padding'}>
              <IonButton    className={'find'}  onClick={e => {
                  e.preventDefault();

              }}  expand={'block'}>

                 Add another address
              </IonButton>
          </div>

          <div className={'ion-padding'}>
              <IonButton    onClick={e => {
                  e.preventDefault();

              }} className={'next'} expand={'block'}>

                  Next
              </IonButton>
          </div>
      </IonContent>
        <IonToast
            isOpen={showToast}
            onDidDismiss={() => setShowToast(false)}
            message={message}
            position={'top'}
            color={color}
            duration={2000}
        />
        <IonLoading
            cssClass='my-custom-class'
            isOpen={showLoading}
            onDidDismiss={() => setShowLoading(false)}
            message={'Please wait...'}

        />
    </IonPage>
  );
};


