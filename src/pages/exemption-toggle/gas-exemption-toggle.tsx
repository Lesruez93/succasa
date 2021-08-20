import React, {useState} from 'react';
import {
    IonAlert,
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonPage,
    IonText,
    IonTitle,
    IonToggle,
    IonToolbar
} from '@ionic/react';


export default function  GasExemptionToggle (props:any) {

    const [showAlert3, setShowAlert3] = useState(true);
    const [checked, setChecked] = useState(false);
    const [no, setNo] = useState(false);
    const [yes, setYes] = useState(false);
    const [text, setText] = useState<any>(null);


    function submit(e:any) {
        e.preventDefault()

        }

    return (
        <IonPage>
            <IonHeader className="ion-no-border">
                <IonToolbar color='medium'  >
                    <IonButtons slot="start">
                        <IonBackButton  defaultHref={'./property-compliance-document'} color='light'  text=''/>
                    </IonButtons>
                    <IonTitle>Gas Safety Certificate</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent >

                <IonAlert
                    isOpen={showAlert3}
                    onDidDismiss={() => setShowAlert3(false)}

                    header={'Gas Safety Certificate'}
                    message={'Do you have a valid Gas Safety Certificate?’'}
                    buttons={[

                        {
                            text: 'Yes',

                            handler: () => {
                        setChecked(true)
                            }
                        },
                        {
                            text: 'No',

                            handler: () => {
                                setNo(true)

                            }
                        }
                    ]}
                />


                {no &&
                <div>
                    <div className={'ion-text-center ion-padding'}>
                    <h4>
                        Is your property exempt from providing a Gas Safety Certificate?
                    </h4>

                </div>
                <IonItem>
                    <IonLabel> No, Yes</IonLabel>
                    <IonToggle color='medium' checked={checked} onIonChange={e => setChecked(e.detail.checked)} />
                </IonItem>
                    </div>

                }

                {checked  &&
                <div  className='ion-margin-top ion-padding'>
                    <form onSubmit={(event1 => submit(event1))}>
                    <IonText>
                        <strong>This is found on the top right of the certificate </strong>
                    </IonText>

                    <IonItem className='ion-item ion-margin-top' lines='none'>
                        <IonInput  required  max='6' placeholder='Enter Gas Safety' type='number' value={text} onIonChange={y => setText(y.detail.value!)}  className='input'  />
                    </IonItem>

                    <IonButton type='submit' className={'next'} expand={'block'}>

                        Submit
                    </IonButton>
                    </form>
                </div>
                }
            </IonContent>
        </IonPage>
    );
};
