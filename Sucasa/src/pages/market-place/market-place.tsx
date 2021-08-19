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
    IonText, IonTitle,
    IonToolbar
} from '@ionic/react';


export default function MarketPlace  (props:any)  {
    const [selected, setSelected] = useState<number>(1);
    const [selected2, setSelected2] = useState<number>();
    const [selected3, setSelected3] = useState<any>();
    console.log(selected2)

    const changeState = () => {
        setSelected(selected);
        goToPicture()
    };

    function goToPicture() {


        props.history.push({
            pathname:'/make-booking',
            state: {
                data: {
                    zoopla: selected3 || 0,
                    facebook: selected2 || 0
                }
            }
        });


    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color='secondary'  >
                    <IonButtons slot="start">
                        <IonBackButton defaultHref={'/advertise-dashboard'} color='light'  text=''/>
                    </IonButtons>
                    <IonTitle>Online marketplaces</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent >


                <div className={'ion-text-center ion-padding'}>
                    <IonText>
                        Please select what marketplaces you want to advertise your property
                    </IonText>

                </div>
                <div className={'ion-margin-top ion-padding'}>
                    <IonRadioGroup value={selected} onIonChange={e => setSelected(e.detail.value)}>


                        <IonCard className={'ion-padding-left'}>
                            <IonItem color={'none'} lines={'none'}>
                                <IonLabel> <div>
                                    <h2>Sucasa</h2>

                                </div></IonLabel>
                                <IonRadio className={'ion-radio'} mode={'md'} slot="end" value={1} />
                            </IonItem>
                        </IonCard>
                    </IonRadioGroup>
                    <IonRadioGroup  allowEmptySelection={true} value={selected2} onIonChange={e => setSelected2(e.detail.value)}>
                        <IonCard className={'ion-padding-left ion-card'}>
                            <IonItem color={'none'} lines={'none'}>
                                <IonLabel> <div>
                                    <h2>Facebook Marketplace</h2>

                                </div></IonLabel>
                                <IonRadio   className={'ion-radio'} mode={'md'} slot="end" value={1} />

                            </IonItem>
                        </IonCard>

                    </IonRadioGroup>
                    <IonRadioGroup allowEmptySelection={true} value={selected3} onIonChange={e => setSelected3(e.detail.value)}>
                        <IonCard className={'ion-padding-left ion-card'}>
                            <IonItem color={'none'} lines={'none'}>
                                <IonLabel> <div>
                                    <h2>Zoopla</h2>

                                </div></IonLabel>
                                <IonRadio className={'ion-radio'} mode={'md'} slot="end" value={1} />
                            </IonItem>
                        </IonCard>


</IonRadioGroup>

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

