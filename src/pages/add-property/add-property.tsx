import React, {useState} from 'react';
import {
    IonAlert,
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonListHeader,
    IonPage,
    IonRadio,
    IonRadioGroup,
    IonToolbar
} from '@ionic/react';
import './add-property.css';


export default function AddProperty (props:any)  {
    const [showAlert3, setShowAlert3] = useState(false);
    const [selected, setSelected] = useState<any>('0');
    let propData : any = {};

    try {
        propData = JSON.parse(localStorage.propData);
    }
    catch (e) {

    }

    function ifShared(value:any) {
        if (value === 'shared'){
            return setShowAlert3(true)
        }else {
            propData.is_private = selected;
            localStorage.setItem('propData',JSON.stringify(propData));
            props.history.push('/property-title');
        }
    }



    return (
        <IonPage>
            <IonHeader className="ion-no-border">
                <IonToolbar  >
                    <IonButtons    slot="start">
                        <IonBackButton defaultHref={'./property-address'} color='dark'  text=''/>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonAlert
                    isOpen={showAlert3}
                    onDidDismiss={() => setShowAlert3(false)}
                    cssClass='my-custom-class'
                    header={'You have listed this property as a shared property.'}
                    message={'You will need to provide the following details to continue for each room you are listing.'}
                    buttons={[

                        {
                            text: 'Continue',

                            handler: () => {
                                propData.is_private = '1';
                                localStorage.setItem('propData',JSON.stringify(propData));
                                props.history.push('/property-title');
                            }
                        }
                    ]}
                />

                <div className={'ion-text-center '}>

                    <h2>Add your property</h2>

                </div>
                <div className={'ion-margin-top ion-padding'}>
                    <IonRadioGroup value={selected} onIonChange={e => setSelected(e.detail.value)}>
                        <IonListHeader>
                            <IonLabel>Is this a private property or a shared property?</IonLabel>
                        </IonListHeader>

                        <IonItem lines={'none'}>
                            <IonLabel>Private</IonLabel>
                            <IonRadio mode={'md'}  slot="start" value="0" />
                        </IonItem>

                        <IonItem lines={'none'}>
                            <IonLabel>Shared</IonLabel>
                            <IonRadio className={'ion-radio'} mode={'md'} slot="start" value="1" />
                        </IonItem>

                        <div>
                            <h2><strong>
                                Please Note:
                            </strong></h2>
                            <p>
                                <strong>Private Property </strong> -One person or a couple will be living in this property.
                            </p>

                            <p> <strong>Shared Property</strong> - The property is shared with more than one tenant.</p>
                        </div>


                    </IonRadioGroup>
                </div>

            </IonContent> <IonButton onClick={() => ifShared(selected)}  className='next ion-margin-bottom' expand={'block'}>

            Next
        </IonButton>
        </IonPage>
    );
};
