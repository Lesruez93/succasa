import React, {useState} from 'react';
import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonPage,
    IonText,
    IonToolbar
} from '@ionic/react';
import './rent-deposit.css';


export default function  RentDeposit (props:any)  {
    const [price, setPrice] = useState<any>(null);
    const [deposit, setDeposit] = useState<any>(null);

    let propData : any = {};

       try{
           propData = JSON.parse(localStorage.propData);
       }
       catch (e) {

       }




    function next() {
        propData.rent = price;
        propData.deposit = deposit;
        propData.additional_tenants = "3";
        propData.description =  propData.title;
        localStorage.setItem('propData',JSON.stringify(propData));
        props.history.push('/tenancy-terms');
    }

    return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar  >
            <IonButtons slot="start">
                <IonBackButton defaultHref={'../'} color='dark'  text=''/>
            </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
          <div className={'ion-text-center '}>

              <h2>Add your property</h2>

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




          <div className={'ion-padding'}>
          <IonButton  disabled={ !price || !deposit}  onClick={e => {
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

