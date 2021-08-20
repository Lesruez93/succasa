import React, {useState} from 'react';
import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonCheckbox,
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonPage,
    IonText,
    IonToolbar
} from '@ionic/react';
import './add-bills.css';
import firebase from "firebase";


export default function  AddBills (props:any)  {
    const [checked, setChecked] = useState(false);
    const db =firebase.firestore();

    const checkboxList = [
        { val: 'Electricity', isChecked: true },
        { val: 'Gas', isChecked: false },
        { val: 'TV Licence', isChecked: false },
        { val: 'Council Tax', isChecked: false },
        { val: 'WiFi', isChecked: false },
        { val: 'Cleaning', isChecked: false },
        { val: 'None of the above', isChecked: false }
    ];






    function changeState() {
        const id:any = localStorage.getItem('property_id');
        db.collection('properties').doc(id).update({tenancy:true}).then();

        props.history.replace('/manage-property')
    }

    return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar  >
            <IonButtons slot="start">
                <IonBackButton color='dark'  defaultHref='./renewal-type' text=''/>
            </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>

          <div className={'ion-text-center '}>

              <h2>Add your property</h2>

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


                  <IonButton  onClick={e => {
                      e.preventDefault();
                     changeState()
                  }} className={'next'}  expand={'block'}>

                            Next
                      </IonButton>

      </div>

      </IonContent>
    </IonPage>
  );
};

