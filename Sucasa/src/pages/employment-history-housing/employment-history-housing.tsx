import React, {useState} from 'react';
import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonPage,
    IonSelect,
    IonSelectOption,
    IonText,
    IonToolbar
} from '@ionic/react';
import './employment-history-housing.css';


export default function EmploymentHistoryHousing (props:any) {

    const [status, setStatus] = useState<any>('Universal credit');

    let tenacyHistory :any;



    function next() {


    }

    function changeSelect(y: any) {
        setStatus(y.detail.value);

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
            Please can you provide us with details of your employment
        </IonText>

        <IonItem color={'none'} lines={'none'}>
            <IonLabel position={'stacked'} >What type of housing benefit </IonLabel>
            <IonSelect  value={status} className={'input-select'} onIonChange={(y)=>

              changeSelect(y)

            }>
                <IonSelectOption value={'Universal credit'}>Universal credit</IonSelectOption>
                <IonSelectOption value={'LHA'}>LHA</IonSelectOption>
                <IonSelectOption value={'DSS'}>DSS</IonSelectOption>
                <IonSelectOption value={'Other'}>Other</IonSelectOption>


            </IonSelect>


        </IonItem>


    </div>




          <div className={'ion-padding'}>
          <IonButton  disabled={ !status  }  onClick={e => {
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

