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
    IonLoading,
    IonPage,
    IonRadio,
    IonRadioGroup,
    IonRow, IonTitle, IonToast,
    IonToolbar
} from '@ionic/react';
import './tenancy-requirements.css';
import {postData} from "../../api";
import {PropertyIdStore} from "../../Store/UserStore";


export default function TenancyRequirements (props:any) {
    const [smoker, setSmoker] = useState<number>();
    const [pet, setPet] = useState<number>();
    const [students, setStudents] = useState<number>();
    const [benefit, setBenefit] = useState<number>();
    const [showLoading, setShowLoading] = useState(false);
    const [message, setMessage] = useState<any>(null);
    const [color, setColor] = useState<any>(null);
    const [showToast, setShowToast] = useState(false);
    const propertyId:any = PropertyIdStore.useState(s => s.propertyId);



    function isSelected() {
        setShowLoading(true);
            let data = {
                "property:id":propertyId,
                "smokers_allowed": smoker,
                "pets_welcome": pet,
                "students_welcome": students,
                "housing_benefits_accepted": benefit,
            };
                    postData(data,'tenantrequirements').then(()=>{
                        setColor('success');
                        setMessage('Saved');
                        setShowToast(true);
                        props.history.push('/move-in-date');

            setShowLoading(false)
        }).catch(()=>{
            setShowLoading(false);
            setMessage('Something went wrong please try again');
            setColor('danger');
            setShowToast(true);


        })

    }



    return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar color='medium'  >
            <IonButtons slot="start">
                <IonBackButton defaultHref={'./manage-property'} color='light'  text=''/>
            </IonButtons>
            <IonTitle>Tenant requirements</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>


          <div className={'ion-text-center '}>

        <h2>Tenant requirements</h2>

          </div>
          <div className={'ion-margin-top ion-padding'}>
              <IonRadioGroup value={smoker} onIonChange={e => setSmoker(e.detail.value)}>
                  <IonListHeader>
                      <IonLabel>Are smokers accepted</IonLabel>
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


              </IonRadioGroup>
              <IonRadioGroup value={pet} onIonChange={e => setPet(e.detail.value)}>
                  <IonListHeader>
                      <IonLabel>Are pets welcome?</IonLabel>
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
                                  <IonRadio  className={'ion-radio'} mode={'md'} slot="start" value={2} />
                              </IonItem>
                          </IonCol>
                      </IonRow>
                  </IonGrid>


              </IonRadioGroup>
              <IonRadioGroup value={students} onIonChange={e => setStudents(e.detail.value)}>
              <IonListHeader>
                  <IonLabel>Are students welcome</IonLabel>
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


          </IonRadioGroup>
              <IonRadioGroup value={benefit} onIonChange={e => setBenefit(e.detail.value)}>
                  <IonListHeader>
                      <IonLabel>Is house benefit accepted?</IonLabel>
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



              </IonRadioGroup>
              <IonButton disabled={!smoker || !benefit || !students || !pet} onClick={() => {

                  isSelected()
              }} className={'next'} expand={'block'}>

                  Submit
              </IonButton>
      </div>
          <IonLoading
              cssClass='my-custom-class'
              isOpen={showLoading}
              onDidDismiss={() => setShowLoading(false)}

              message={'Loading...'}

          />
          <IonToast
              isOpen={showToast}
              onDidDismiss={() => setShowToast(false)}
              message={message}
              position={'top'}
              color={color}
              duration={3000}
          />
      </IonContent>
    </IonPage>
  );
};

