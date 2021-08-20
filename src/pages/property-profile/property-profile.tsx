import React, {useState} from 'react';
import {
    IonAlert,
    IonBackButton,
    IonButton,
    IonButtons,
    IonCardSubtitle,
    IonContent,
    IonHeader,
    IonIcon,
    IonImg,
    IonPage,
    IonTitle,
    IonToolbar,
    useIonViewWillEnter
} from '@ionic/react';
import {deleteRequest} from "../../api";
import {trash} from "ionicons/icons";
import firebase from "firebase";
import {PropertyIdStore} from "../../Store/UserStore";


export default function  PropertyProfile (props:any)  {
    const db = firebase.firestore();

    const [showAlert, setShowAlert] = useState(false);
    const [showAlert2, setShowAlert2] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const propertyId = PropertyIdStore.useState(s => s.propertyId);

    //  const { data, error } = useSWR('properties/'+localStorage.getItem('property_id'), fetcher,fetcherOption);

                useIonViewWillEnter(()=>{
              //   Dataset(propertyId)
                });


    return (
        <IonPage>
            <IonHeader >
                <IonToolbar color="medium">
                   <IonTitle> Property Details
                   </IonTitle>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref={'/tabs/portfolio'} color='light'  text=''/>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>


        <div >
                <IonImg className='prop-image' src='./assets/img/no-image.png'/>


                    <div className={'ion-text-center '}>

                        <IonCardSubtitle className='ion-margin-top'><h6> Status:
                        </h6></IonCardSubtitle>

                    </div>

                    <div  className={'ion-text-center ion-padding'}>



                        <div  className={'ion-padding'}>
                            <IonButton  fill='outline'  color='medium'  onClick={e => {
                                e.preventDefault();
                                props.history.push('./property-overview')
                            }} className='smaller' expand={'block'}>
                                Edit property details
                            </IonButton>

                            <IonButton  fill='outline'  color='medium'   onClick={e => {
                                e.preventDefault();
                                props.history.push({
                                    pathname:'/add-tenant',
                                    state:'partner',
                                })
                            }} className='smaller' expand={'block'}>
                                Add a tenant
                            </IonButton>

                            <IonButton  color='medium' fill='outline'  onClick={e => {
                                e.preventDefault();
                                props.history.push({
                                    pathname:'/add-partner',
                                    state:'partner',
                                })
                            }} className='smaller' expand={'block'}>
                                Add a partner
                            </IonButton>

                            <IonButton color='medium'   fill='outline'  onClick={e => {
                                e.preventDefault();
                                props.history.push('/advertise')
                            }} className=' smaller' expand={'block'}>
                                Advertise your property
                            </IonButton>


                            <IonButton   fill='outline'  color='medium'  onClick={e => {
                                e.preventDefault();
                                props.history.push('/duplicate')

                            }} className='smaller' expand={'block'}>
                                Duplicate this listing
                            </IonButton>

                            <IonButton color='danger'   fill='outline'  onClick={e => {
                                e.preventDefault();
                               setShowAlert(true)

                            }} className=' smaller' expand={'block'}>
                                {showDelete &&
                                <div>
                                    <IonIcon icon={trash}>

                                    </IonIcon>
                                    Deleting.....
                                </div>
                                }

                                {!showDelete &&   <p>Delete this property</p>
                                }
                            </IonButton>
                        </div>
                    </div>

                </div>


                <IonAlert
                    isOpen={showAlert}
                    onDidDismiss={() => setShowAlert(false)}
                    header={'Warning!'}
                    message={'Delete this <strong>property</strong>!!! this process cannot be undone'}
                    buttons={[
                        {
                            text: 'Cancel',
                            role: 'cancel',
                            cssClass: 'secondary',
                            handler: blah => {

                            }
                        },
                        {
                            text: 'Delete',
                            handler: () => {
                                setShowDelete(true);

                                deleteRequest('properties',propertyId)
                                    .then(r=>{
                                      //  const id:any = localStorage.getItem('property_id');
                                        db.collection('properties').doc(propertyId).delete().then();
                                        setShowAlert2(true);
                                        setShowDelete(false);


                                    }).catch(e=>{
                                    setShowDelete(false);

                                })

                            }
                        }
                    ]}
                />
                <IonAlert
                    isOpen={showAlert2}
                    onDidDismiss={() => setShowAlert2(false)}
                    header={'Info!'}
                    message={'Property deleted'}
                    buttons={[
                        {
                            text: 'Done',
                            role: 'cancel',
                            cssClass: 'secondary',
                            handler: blah => {
                                props.history.replace('./')
                            }
                        },

                    ]}
                />


            </IonContent>

        </IonPage>
    );
};


