import React, {useState} from 'react';
import {
    IonAlert,
    IonBackButton,
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardSubtitle,
    IonContent,
    IonHeader,
    IonImg,
    IonLoading,
    IonPage,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import {getApiRequest, postData} from "../../api";
import firebase from "firebase";


export default function  Duplicate (props:any)  {
    const db = firebase.firestore();
    const [showLoading,setShowLoading] = useState<boolean>(false);
    const [showAlert,setShowAlert] = useState<boolean>(false);
    function duplicateListing() {
        setShowLoading(true);
        postData({},`properties/${localStorage.getItem('property_id')}/duplicate`).then((res)=>{
            db.collection('properties').doc(res.data.id).set({requirements:false}).then();
            setShowLoading(false);
            setShowAlert(true)
        }).catch(()=>{
            alert('Failed please try again');
            setShowLoading(false)
        })
    }


    return (
        <IonPage>
            <IonHeader >
                <IonToolbar color="medium">
                   <IonTitle>Display duplicate</IonTitle>
                    <IonButtons slot="start">
                    <IonBackButton color='light' defaultHref='./property-profile' text=''/>
                </IonButtons>
                </IonToolbar>

            </IonHeader>
            <IonContent >


        <div >
                <IonImg src='./assets/img/compliance.jpg'/>
                <IonCard className='card  ion-no-margin'>
                    <div className={'ion-text-center '}>


                    </div>

                    <div  className={'ion-text-center ion-padding'}>



                        <IonCardContent>
                            Save yourself some time and just duplicate the listing you have just created. This is perfect if you have a HMO with identical rooms

                        </IonCardContent>
                            <div  className={'ion-padding'}>


                            <IonButton    onClick={e => {
                                e.preventDefault();
                                duplicateListing()
                            }} className='next smaller' expand={'block'}>
                                Duplicate
                            </IonButton>

                        </div>
                    </div>

                </IonCard>
                </div>

                <IonLoading
                    cssClass='my-custom-class'
                    isOpen={showLoading}
                    onDidDismiss={() => setShowLoading(false)}
                    message={'Please wait...'}

                />

                <IonAlert
                    isOpen={showAlert}
                    onDidDismiss={() => setShowAlert(false)}
                    message={ "Property duplicated"}
                    header={'Success'}
                    buttons={[
                        {
                            text: 'Ok',
                            handler: () => {
                                props.history.goBack()
                            }
                        }]}
                />
            </IonContent>

        </IonPage>
    );
};


