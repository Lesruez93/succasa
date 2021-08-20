import React, {useState} from 'react';
import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonCard,
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonPage,
    IonRadio,
    IonRadioGroup,
    IonText,
    IonToolbar
} from '@ionic/react';
import './personal-details-tenant.css';


export default function PersonalDetailsTenant  (props:any)  {
    const [selected, setSelected] = useState<number>(4);

    const changeState = () => {
        setSelected(selected);
        goToPicture()
    };

    function goToPicture() {
        props.history.push({
            pathname:'/personal-details-id-upload',
            state: { data: selected }

        });


    }

    return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar  >
            <IonButtons slot="start">
                <IonBackButton defaultHref={'./personal-details2'} color='dark'  text=''/>
            </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>

          <div className={'ion-text-center '}>

              <h2>Personal Details</h2>

          </div>
          <div className={'ion-text-center ion-padding'}>
              <IonText>
                  Please select a legal form of ID for your Sucasa account.
              </IonText>

          </div>
          <div className={'ion-margin-top ion-padding'}>
              <IonRadioGroup value={selected} onIonChange={e => setSelected(e.detail.value)}>


                  <IonCard className={'ion-padding-left'}>
                      <IonItem color={'none'} lines={'none'}>
                          <IonLabel> <div>
                              <h2>National Passport</h2>
                              <p>This must be a valid passport</p>
                          </div></IonLabel>
                          <IonRadio className={'ion-radio'} mode={'md'} slot="end" value={1} />
                      </IonItem>
                  </IonCard>

                  <IonCard className={'ion-padding-left ion-card'}>
                  <IonItem color={'none'} lines={'none'}>
                      <IonLabel> <div>
                          <h2>Driver’s License</h2>
                          <p>This must have an up-to-date address</p>
                      </div></IonLabel>
                      <IonRadio className={'ion-radio'} mode={'md'} slot="end" value={2} />
                  </IonItem>
              </IonCard>

                  <IonCard className={'ion-padding-left ion-card'}>
                      <IonItem color={'none'} lines={'none'}>
                          <IonLabel> <div>
                              <h2>Travel Card</h2>
                              <p>This must show full name</p>
                          </div></IonLabel>
                          <IonRadio className={'ion-radio'} mode={'md'} slot="end" value={2} />
                      </IonItem>
                  </IonCard>


                  <IonCard className={'ion-padding-left ion-card'}>
                      <IonItem color={'none'} lines={'none'}>
                          <IonLabel> <div>
                              <h2>Travel Card</h2>
                              <p>This must show your full name</p>
                          </div></IonLabel>
                          <IonRadio className={'ion-radio'} mode={'md'} slot="end" value={3} />
                      </IonItem>
                  </IonCard>


                  <IonCard className={'ion-padding-left ion-card'}>
                      <IonItem color={'none'} lines={'none'}>
                          <IonLabel> <div>
                              <h2>National Identity Card</h2>
                              <p>This must include photo identification </p>
                          </div></IonLabel>
                          <IonRadio className={'ion-radio'} mode={'md'} slot="end" value={4} />
                      </IonItem>
                  </IonCard>

                  <IonButton  onClick={e => {
                      e.preventDefault();
                     changeState()
                  }} className={'next'}  expand={'block'}>

                            Next
                      </IonButton>

              </IonRadioGroup>
      </div>

      </IonContent>
    </IonPage>
  );
};

