import React, {useState} from 'react';
import {
    IonAlert,
    IonButton,
    IonButtons,
    IonCard,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonLoading,
    IonPage,
    IonToolbar, useIonViewDidEnter
} from '@ionic/react';
import {checkmarkCircle} from "ionicons/icons";
import {getApiRequest, getUser, postData, postUserType, register, toast} from "../../api";


export default function  WelcomeScreen (props:any) {
    const [showAlert, setShowAlert] = useState<any>(false);
    const [showToast, setShowToast] = useState(false);
    const [message, setMessage] = useState<any>(null);
    const [color, setColor] = useState<any>(null);
    const [showLoading, setShowLoading] = useState(false);

    let newData :any = {};
    try {
        newData = JSON.parse(localStorage.user);
    }
    catch (e) {

    }



    function goToDash() {
        if(!localStorage.getItem('idverified')){
            setShowAlert(true)

        }

    }

  function navHome() {
        // let data = {
        //     "name": newData.name,
        //     "title": newData.title,
        //     "is_company": newData.is_company,
        //     "id_type_id": newData.id_type_id,
        //     "id_document": null,
        //     "dob": newData.dob,
        //     "user_type":'landlord',
        //     "postcode": newData.postCode || null,
        //     "street_address": newData.address,
        //     "company_number": newData.company_number || null,
        //     "company_name": newData.company_name || null
        // };
        setShowLoading(true);
       postUserType({user_id:newData.id},newData.user_type.toLowerCase()+'s').then(()=>{
           register(newData,newData.id).then((res:any)=>{
               localStorage.setItem('user',JSON.stringify(res.data.attributtes))

           }).then(()=>{
               setShowLoading(false);
               let k:any = sessionStorage.getItem('token');
               localStorage.setItem(k,'token');
               toast('Info updated').then();
               setShowLoading(false);
               setTimeout(()=>{
                   //   setShowToast(false);
                   props.history.push('/tabs/dashboard');

               },1000)

           }).catch((error)=>{

               setColor('danger');
               setMessage('Something went wrong');
               setShowLoading(false);
               setShowToast(true)

           })
       }).catch(()=>{

       });




    }

    return (
        <IonPage>
            <IonHeader className="ion-no-border">
                <IonToolbar className={'ion-margin-top'}  >
                    <IonButtons  slot="start">
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>

                <div className='ion-text-center ion-padding'>

                    <h2>Personal Details</h2>

                </div>

                <IonCard className={'ion-padding'}>
                    <IonItem  color={'none'} detail={false} lines={'none'}>
                        <IonLabel>
                            Personal Details
                        </IonLabel>
                        <IonIcon icon={checkmarkCircle} color="success" size={'large'} slot="end"/>
                    </IonItem>
                </IonCard>
                <IonCard className={'ion-padding'}>
                    <IonItem  color={'none'} detail={false} lines={'none'}>
                        <IonLabel>
                            Address Details
                        </IonLabel>
                        { !localStorage.getItem('address') &&    <IonButton onClick={e=>{
                            e.preventDefault();
                            props.history.push('./address')

                        }} hidden={getUser().street_address} slot='end'    color='medium'>
                            Continue
                        </IonButton>}

                        { localStorage.getItem('address') &&  <IonIcon  icon={checkmarkCircle} color="success" size={'large'} slot="end"/>}
                    </IonItem>
                </IonCard>
                <IonCard className={'ion-padding'}>
                    <IonItem color={'none'} detail={false} lines={'none'}>
                        <IonLabel>
                            ID Verification

                        </IonLabel>
                        {!localStorage.getItem('idverified') && <IonButton onClick={e => {
                            e.preventDefault();
                            props.history.push({
                                pathname: './upload-id',

                            })
                        }} slot='end' color='medium'>
                            Continue
                        </IonButton>
                        }

                        { localStorage.getItem('idverified') &&    <IonIcon  icon={checkmarkCircle} color="success" size={'large'} slot="end"/>}
                    </IonItem>
                </IonCard>

                <div className="ion-padding">
                    <IonButton  onClick={e=>{
                        e.preventDefault();
                        goToDash()

                    }} className='next' expand={'block'}>

                        Complete Registration
                    </IonButton>
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
                    header={'Info'}
                    message={'ID not verified you may verify your ID Later'}
                    buttons={[

                        {
                            text: 'Verify',
                            handler: () => {
                                props.history.push({
                                    pathname:'./personal-details-id',

                                })
                            }
                        },
                        {
                            text: 'Continue',
                            handler: () => {
                        navHome()
                            }
                        },

                    ]}
                />
            </IonContent>
        </IonPage>
    );
};


