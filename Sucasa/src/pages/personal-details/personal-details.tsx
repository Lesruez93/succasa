import React, {useState} from 'react';
import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonItem,
    IonLabel,
    IonListHeader,
    IonPage,
    IonRadio,
    IonRadioGroup,
    IonRow,
    IonToolbar
} from '@ionic/react';
import './personal-details.css';


export default function PersonalDetails (props:any) {
    const [selected, setSelected] = useState<number>(2);



    let newData :any = {};
    try {
        newData = JSON.parse(localStorage.user);
    }
    catch (e) {

    }

    function isSelected() {
            newData.is_company = selected;
            if (selected === 1){

                localStorage.setItem('user',JSON.stringify(newData));
                props.history.push('/company-details');
            } else{
                localStorage.setItem('user',JSON.stringify(newData));
                localStorage.setItem('details','true');
                props.history.push('./welcome');
            }


    }



    return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar  >
            <IonButtons slot="start">
                <IonBackButton color='dark'  defaultHref={'./personal-details2'} text=''/>
            </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>


          <div className={'ion-text-center '}>

        <h2>Personal Details</h2>

          </div>
          <div className={'ion-margin-top ion-padding'}>
              <IonRadioGroup value={selected} onIonChange={e => setSelected(e.detail.value)}>
                  <IonListHeader>
                      <IonLabel>Are you operating as a company?</IonLabel>
                  </IonListHeader>
                  <IonGrid>
                      <IonRow>
                          <IonCol>
                              <IonItem lines={'none'}>
                              <IonLabel>Yes</IonLabel>
                              <IonRadio mode={'md'}  slot="start" value={1} />
                          </IonItem>
                          </IonCol>
                          <IonCol>
                              <IonItem lines={'none'}>
                                  <IonLabel>No</IonLabel>
                                  <IonRadio className={'ion-radio'} mode={'md'} slot="start" value={2} />
                              </IonItem>
                          </IonCol>
                      </IonRow>
                  </IonGrid>
                  <IonButton onClick={() => {

                    isSelected()
                  }} className={'next'} expand={'block'}>

                            Next
                      </IonButton>

              </IonRadioGroup>
      </div>

      </IonContent>
    </IonPage>
  );
};

