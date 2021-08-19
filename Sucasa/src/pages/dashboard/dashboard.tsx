import React, {useEffect, useState} from 'react';
import {
    IonAlert,
    IonAvatar,
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardSubtitle,
    IonContent,
    IonHeader,
    IonIcon,
    IonImg,
    IonItem,
    IonLabel,
    IonPage,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import {informationCircle, notificationsCircle, settingsOutline} from "ionicons/icons";
import {getApiRequest} from "../../api";
import firebase from 'firebase';
import {UserStore} from "../../Store/UserStore";
//import { useDispatch } from 'react-redux';


export default function  Dashboard (props:any)  {
 //y   const dispatch = useDispatch();

    const  [properties,setProperties] = useState<any>([]);
    const [invites, setAlerts] = useState<any>([]);
    const [docid, setID] = useState<any>('');
    const [showAlert, setShowAlert] = useState<any>('');
    const [showAlert2, setShowAlert2] = useState<any>(false);
    const [showAlert3, setShowAlert3] = useState<any>(false);
    const user = UserStore.useState(s => s.user);
    const [loader, setLoader] = useState<any>(true);
    const [searchText, setSearchText] = useState('');


    useEffect(()=>{

        getApiRequest('auth/user').then((res:any)=> {

            firebase.firestore().collection('invites').where('email','==', res.data.email)
                .onSnapshot((snapshot => {
                    const dataF:any = [];
                    snapshot.forEach((doc) => dataF.push({ ...doc.data(), id: doc.id }));
                    setAlerts(dataF)
                }))
        })

    },[]);


    return (
        <IonPage>
            <IonHeader >
                <IonToolbar color="medium">
                    <IonTitle>Dashboard</IonTitle>
                    <IonButtons   slot="end">
                      <IonIcon onClick={(e=>{
                          e.preventDefault();
                          props.history.push('/settings')
                      })} icon={settingsOutline} color='light' size='large'/>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>



                <div >
                    <IonImg src='./assets/img/dcbg.png'/>
                    <IonCard className='card  ion-no-margin'>
                        <div className={'ion-text-center '}>

                            <IonCardSubtitle className='ion-margin-top'><h1>My Dashboard</h1></IonCardSubtitle>

                        </div>

                        <div  className={'ion-text-center'}>

                            <IonCardContent>
                                <IonItem lines='full'>
                                    <IonAvatar slot='start'>
                                        <IonIcon size='large' icon={informationCircle} color='medium'/>
                                    </IonAvatar>
                                    <IonLabel>
                                        You have no Alerts

                                    </IonLabel>


                                </IonItem>

                                {!user?.payment_method &&
                                <IonItem routerLink={'/add-payment-method'} detail={false} lines='full'>
                                    <IonAvatar slot='start'>
                                        <IonIcon size='large' icon={notificationsCircle} color='medium'/>
                                    </IonAvatar>
                                    <IonLabel className='ion-text-wrap'>
                                        Add Payment method
                                    </IonLabel>

                                </IonItem>
                                }
                                { invites &&    <div>
                                {invites?.map((i: any) => (
                                    <IonItem onClick={e=>{
                                        setID(i);
                                        setShowAlert(true)
                                    }} key={i.id} lines='full'>
                                        <IonAvatar slot='start'>
                                            <IonIcon size='large' icon={notificationsCircle} color='medium'/>
                                        </IonAvatar>
                                        <IonLabel className='ion-text-wrap'>
                                            {i.from } has invited you to a Property
                                        </IonLabel>

                                    </IonItem>

                                ))
                                }
                            </div>}


                                        <IonItem routerLink={'/add-guarantor'} detail={false} lines='full'>
                                            <IonAvatar slot='start'>
                                                <IonIcon size='large' icon={notificationsCircle} color='medium'/>
                                            </IonAvatar>
                                            <IonLabel className='ion-text-wrap'>
                                                Tongai has requested a guarantor
                                            </IonLabel>

                                        </IonItem>



                                {user?.user_type === 'Landlord'&&      <IonButton routerLink={'/subscription'}  expand='block' size='small' fill='outline' color='primary'>
                                Choose your subscription package
                            </IonButton>}

                                {user?.user_type !== 'Landlord'&& <IonButton  routerLink={'/add-landlord'}  expand='block' size='small' fill='outline' color='primary'>
                                   Invite LandLord
                                </IonButton>}


                            </IonCardContent>

                        </div>

                    </IonCard>
                </div>

                <IonAlert
                    isOpen={showAlert}
                    onDidDismiss={() => setShowAlert(false)}

                    header={'Alert'}
                    message={docid.from + ' has invited you to a Property'}
                    buttons={[
                        {
                            text: 'Decline',
                            role: 'cancel',
                            cssClass: 'secondary',
                            handler: blah => {
                                firebase.firestore().collection('invites')
                                    .doc(docid.id).delete().then();
                                setShowAlert3(true)
                            }
                        },
                        {
                            text: 'Accept',
                            handler: () => {
                                firebase.firestore().collection('invites')
                                    .doc(docid.id).delete().then();
                                setShowAlert2(true)
                            }
                        }
                    ]}
                />
                <IonAlert
                    isOpen={showAlert2}
                    onDidDismiss={() => setShowAlert2(false)}

                    header={'Alert'}
                    message={'This property has been added to your portfolio dashboard, you can now start the tenancy process'}
                    buttons={[

                        {
                            text: 'Done',
                            handler: () => {

                            }
                        }
                    ]}
                />
                <IonAlert
                    isOpen={showAlert3}
                    onDidDismiss={() => setShowAlert3(false)}

                    header={'Alert'}
                    message={'We have let'+ docid.from+ ' you have rejected the property invitation'}
                    buttons={[

                        {
                            text: 'Done',
                            handler: () => {

                            }
                        }
                    ]}
                />
            </IonContent>



        </IonPage>
    );
};


