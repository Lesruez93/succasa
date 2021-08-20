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
import {getEpc} from "../../api";


export default function  ExemptionToggle (props:any) {

    const [showAlert3, setShowAlert3] = useState(true);
    const [checked, setChecked] = useState(false);
    const [no, setNo] = useState(false);
    const [yes, setYes] = useState(false);
    const [text, setText] = useState<any>(null);


    function submit() {
        getEpc().then((res:any)=>{

        }).catch(e=>{

        })}

    return (
        <IonPage>
            <IonHeader className="ion-no-border">
                <IonToolbar color='medium'  >
                    <IonButtons slot="start">
                        <IonBackButton  defaultHref={'./property-compliance-document'} color='light'  text=''/>
                    </IonButtons>
                    <IonTitle>EPC</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent >

                <IonAlert
                    isOpen={showAlert3}
                    onDidDismiss={() => setShowAlert3(false)}

                    header={'Energy Performance Certificate'}
                    message={'Do you have a valid Energy Performance Report?’'}
                    buttons={[

                        {
                            text: 'Yes',

                            handler: () => {

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
                        Is your property exempt from providing an Energy Performance Report?
                    </h4>

                </div>
                <IonItem>
                    <IonLabel> No, Yes</IonLabel>
                    <IonToggle color='medium' checked={checked} onIonChange={e => setChecked(e.detail.checked)} />
                </IonItem>
                    </div>

                }

                {checked &&
                <div className='ion-margin-top ion-padding'>
                    <IonText>
                        <strong>Enter Energy Performance Certificate reference </strong>
                    </IonText>

                    <IonItem className='ion-item ion-margin-top' lines='none'>
                        <IonInput  placeholder='EPC Code' value={text} onIonChange={y => setText(y.detail.value!)}  className='input'  />
                    </IonItem>

                    <IonButton  disabled={ !text }  onClick={e => {
                        e.preventDefault();
                        submit()
                    } }
                                className={'next'} expand={'block'}>

                        Submit
                    </IonButton>
                </div>
                }
            </IonContent>
        </IonPage>
    );
};
