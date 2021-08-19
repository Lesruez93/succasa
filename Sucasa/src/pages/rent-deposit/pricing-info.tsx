import React, {useState} from 'react';
import {
    IonBackButton,
    IonButton,
    IonButtons, IonCheckbox,
    IonContent,
    IonHeader,
    IonInput,
    IonItem, IonLabel,
    IonPage,
    IonText,
    IonToolbar
} from '@ionic/react';
import './rent-deposit.css';


export default function  PricingInfo (props:any)  {
    const [price, setPrice] = useState<any>(null);
    const [deposit, setDeposit] = useState<any>(null);
    const [checked, setChecked] = useState(false);

    const checkboxList = [
        { val: 'Electricity', isChecked: true },
        { val: 'Gas', isChecked: false },
        { val: 'TV Licence', isChecked: false },
        { val: 'Council Tax', isChecked: false },
        { val: 'WiFi', isChecked: false },
        { val: 'Cleaning', isChecked: false },
        { val: 'None of the above', isChecked: false }
    ];




    function next() {

        props.history.push('/tenancy-terms');
    }

    return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar  >
            <IonButtons slot="start">
                <IonBackButton defaultHref={'/property-overview'} color='dark'  text=''/>
            </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
          <div className={'ion-text-center '}>

              <h2>Edit your property</h2>

          </div>


    <div className={'ion-text-center ion-padding'}>
        <IonText>
            Please provide information regarding rent and deposit.
        </IonText>


        <IonItem className='ion-item ion-margin-top ' lines='none'>

            <IonInput  type="number"  placeholder='Price per calendar month' value={price} onIonChange={y => setPrice(y.detail.value)}  className='input ion-padding-start'  >£ &nbsp;&nbsp;</IonInput>
        </IonItem>

        <IonItem className='ion-item ion-margin-top ' lines='none'>
            <IonInput type="number"  placeholder='Deposit' value={deposit} onIonChange={y => setDeposit(y.detail.value)}  className='input ion-padding-start'  >£ &nbsp;&nbsp;  </IonInput>
        </IonItem>
    </div>
          <div className={'ion-text-center ion-padding'}>
              <IonText>
                  <strong>  Please select which bills will be included in the rent</strong>
              </IonText>

          </div>
          <div className={'ion-margin-top ion-padding'}>
              {checkboxList.map(({ val, isChecked }, i) => (
                  <IonItem key={i}>
                      <IonLabel>{val}</IonLabel>
                      <IonCheckbox mode='md' slot="end" value={val} checked={isChecked} />
                  </IonItem>
              ))}




          </div>



          <div className={'ion-padding'}>
          <IonButton  disabled={ !price || !deposit}  onClick={e => {
              e.preventDefault();
              next()
          } }
          className={'next'} expand={'block'}>

              save
          </IonButton>
          </div>
      </IonContent>
    </IonPage>
  );
};

