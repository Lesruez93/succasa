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
    IonLabel, IonLoading,
    IonPage,
    IonToolbar
} from '@ionic/react';
import './personal-details2.css';
import 'react-phone-input-2/lib/style.css'


export default function  PersonalDetails (props:any) {
    const [showAlert, setShowAlert] = useState<any>(false);



    const [code, setCode] = useState('');
    const [loading,showLoading]=useState(false);


    function onSubmit() {


    }


    function next(event1: any) {

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

                    <h2>Please enter the invitation code you through an SMS</h2>

                </div>
                <div className={'ion-margin-top ion-padding'}>
                    <form onSubmit={(event1 => next(event1))}>



                        <IonItem lines={'none'}>
                            <IonLabel   position="stacked">Invitation</IonLabel>
                            <IonInput   value={code} onIonChange={e=>{setCode(e.detail.value!)}} placeholder='First Name'  className='ion-margin-top input'  />



                        </IonItem>

                        <IonButton type='submit'   className={'next'} expand={'block'}>

                            Next
                        </IonButton>
                    </form>
                </div>

                <IonAlert
                    isOpen={showAlert}
                    onDidDismiss={() => setShowAlert(false)}
                    header={'Info'}
                    message={'Please enter the correct details on your National ID, or else we might not be able to verify your account'}
                    buttons={['Continue']}
                />

                <IonLoading

                    message={'Please wait...'}
                    isOpen={loading}
                    onDidDismiss={() => showLoading(false)}



                />
            </IonContent>
        </IonPage>
    );
};

