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


export default function Availability  (props:any)  {
    const [selected, setSelected] = useState<number>();

    const [ selectedDate, setSelectedDate] = useState<any>();

    let dates = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    const changeState = () => {
       props.history.push('/booking')
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
                        <IonBackButton defaultHref={'./welcome'} color='dark'  text=''/>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>

                <div className={'ion-text-center '}>

                    <h2>Appointment availability</h2>

                </div>
                <div className={'ion-text-center ion-padding'}>
                    <IonText>
                        Please select the amount of time per viewing block
                    </IonText>

                </div>
                <div className={'ion-margin-top ion-padding'}>
                    <IonRadioGroup value={selected} onIonChange={e => setSelected(e.detail.value)}>


                        <IonCard className={'ion-padding-left'}>
                            <IonItem color={'none'} lines={'none'}>
                                <IonLabel> <div>
                                    <h2>30 Minute</h2>

                                </div></IonLabel>
                                <IonRadio className={'ion-radio'} mode={'md'} slot="end" value={1} />
                            </IonItem>
                        </IonCard>

                        <IonCard className={'ion-padding-left ion-card'}>
                            <IonItem color={'none'} lines={'none'}>
                                <IonLabel> <div>
                                    <h2>60 Minute</h2>

                                </div></IonLabel>
                                <IonRadio className={'ion-radio'} mode={'md'} slot="end" value={2} />
                            </IonItem>
                        </IonCard>



                    </IonRadioGroup>
                </div>


                <div className={'ion-text-center '}>

                    <h2>What days are you available?</h2>

                </div>

                <div className={'ion-margin-top ion-padding'}>
                          <IonRadioGroup value={selectedDate} onIonChange={e => setSelectedDate(e.detail.value)}>

                              {dates.map((date:any)=>(
                                  <IonCard  key={date} className={'ion-padding-left'}>
                                      <IonItem color={'none'} lines={'none'}>
                                          <IonLabel> <div>
                                              <h2>{date}</h2>

                                          </div></IonLabel>
                                          <IonRadio className={'ion-radio'} mode={'md'} slot="end" value={date} />
                                      </IonItem>
                                  </IonCard>
                              ))
                              }

                        <IonButton disabled={!selected || !selectedDate}  onClick={e => {
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

