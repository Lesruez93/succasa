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
    IonTextarea, IonTitle,
    IonToolbar
} from '@ionic/react';
import {postData} from "../../api";



export default function  ViewingFeedback (props:any) {



    const [subject, setText] = useState('');
    const [feedback, setLastName] = useState('');
    const [showAlert, setShowAlert] = useState<any>(false);
    const [showLoading, setShowLoading] = useState(false);



    // console.log(isValidPhoneNumber(number) === true);


    function done() {
        setShowAlert(false);
        props.history.push('./settings');
    }

    function submit() {
        if (subject || feedback) {
            setShowLoading(true);
            postData({
                "subject": subject,
                "body": feedback
            },'feedbacks').then(()=>{
                setShowLoading(false);
                setShowAlert(true);
            }).catch(()=>{
               setShowLoading(false)
            });

        }
    }

        return (
            <IonPage>
                <IonHeader className="ion-no-border">
                    <IonToolbar color='medium'>
                        <IonTitle>
                          Send Feedback
                        </IonTitle>
                        <IonButtons slot="start">
                            <IonBackButton defaultHref={'./settings'} color='light' text=''/>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent fullscreen>



                    <div className='ion-margin-top ion-padding' >
                        <div className='ion-text-center ion-margin-top '>

                            <p>It's unfortunate the property did not suit your requirements. Do you have any feedback that would help (landlord FirstName) improve the property?</p>

                        </div>



                        <IonItem lines='none'>
                            <IonLabel position="stacked">Feedback</IonLabel>
                            <IonTextarea value={feedback} onIonChange={y => setLastName(y.detail.value!)}
                                      placeholder='Feedback' className='ion-margin-top input'/>
                        </IonItem>

                        <IonButton   disabled={!feedback || !subject}  onClick={e => {
                            e.preventDefault();
                           submit()
                        }} className='next smaller' expand={'block'}>
                            Submit
                        </IonButton>
                    </div>


                    <IonAlert
                        isOpen={showAlert}
                        onDidDismiss={() => done()}
                        header={'Feedback sent'}
                        message={'Thank you for your feedback'}
                        buttons={['Okay']}
                    />

                    <IonLoading
                        cssClass='my-custom-class'
                        isOpen={showLoading}
                        onDidDismiss={() => setShowLoading(false)}
                        message={'Please wait...'}

                    />
                </IonContent>
            </IonPage>
        );
    }

