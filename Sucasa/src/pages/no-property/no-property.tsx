import React from 'react';
import {IonCard, IonCardContent, IonCardSubtitle, IonContent, IonItem, IonLabel, IonPage, IonText} from '@ionic/react';
import './no-property.css';


export default function  NoProperty(props:any)  {



    return (
    <IonPage>

      <IonContent fullscreen>
          <img src='./assets/img/dcbg.png'/>
          <IonCard className='card  ion-no-margin'>
              <div className={'ion-text-center '}>

                  <IonCardSubtitle className='ion-margin-top'><h1>My documents</h1></IonCardSubtitle>

              </div>

              <div className={'ion-text-center ion-padding'}>
                  <IonCardContent>
                      For your peace of mind, you can check the legal documents that your landlord has here.
                  </IonCardContent>

              </div>

              <IonCard onClick={e => {
                  e.preventDefault();
                  props.history.push('/landlord-documents');
              }} className={'ion-padding'}>
                  <IonItem color={'none'} detail={true} lines={'none'}>
                      <IonLabel> <div>
                          <h2><strong>46a Temple Drive, South Oxhe…</strong></h2>
                          <IonText color='danger'>0/4 Documents added</IonText>
                      </div></IonLabel>
                  </IonItem>
              </IonCard>
          </IonCard>

</IonContent>
    </IonPage>
  );
};


