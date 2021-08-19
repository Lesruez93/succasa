import React from 'react';
import {IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import './Tab1.css';
import urls from '../urls';

export default function  Tab1 ( props:any)  {


    return (
    <IonPage>

      <IonContent fullscreen>

          <div className={'ion-text-center ion-padding-top'}>
          <IonButton   onClick={e => {
              e.preventDefault();
              props.history.push(urls.LOGIN);
          }}
                       color="primary">Login</IonButton>
          </div>
      </IonContent>
    </IonPage>
  );
};


