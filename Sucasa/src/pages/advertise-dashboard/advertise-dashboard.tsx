import React, {useState} from 'react';
import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonCard,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonLoading,
    IonPage, IonTitle,
    IonToolbar
} from '@ionic/react';
import {checkmarkCircle} from "ionicons/icons";


export default function  AdvertiseDashboard (props:any) {
    const [showLoading, setShowLoading] = useState(false);
    const [array,setArray] = useState<any>([]);
    function nav() {
        // props.history.push('/profile');

    }



    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color='secondary'  >
                    <IonButtons slot="start">
                        <IonBackButton defaultHref={'/advertise'} color='light'  text=''/>
                    </IonButtons>
                    <IonTitle>Advertise dashboard</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>



                <IonCard className={'ion-padding'}>
                    <IonItem color={'none'} detail={false} lines={'none'}>
                        <IonLabel className='ion-text-wrap'>
                            Appointment availability
                        </IonLabel>
                        {/*<IonIcon icon={checkmarkCircle} color="success" size={'large'} slot="end"/>*/}
                        <IonButton  onClick={e=>{
                            e.preventDefault();
                            props.history.push({
                                pathname:'/appointment-availability',

                            })
                        }} slot='end'    color='medium'>
                            Continue
                        </IonButton>
                    </IonItem>
                </IonCard>
                <IonCard className={'ion-padding'}>
                    <IonItem  color={'none'} detail={false} lines={'none'}>
                        <IonLabel>
                            Online marketplaces
                        </IonLabel>
                        <IonButton   slot='end'  onClick={e=>{
                            e.preventDefault();
                            props.history.push({
                                pathname:'/select-market-place',

                            })
                        }}  color='medium'>
                            Continue
                        </IonButton>
                    </IonItem>
                </IonCard>
                <IonCard className={'ion-padding'}>
                    <IonItem onClick={e=>{
                        e.preventDefault();
                        props.history.push({
                            pathname:'/property-overview',

                        })
                    }} color={'none'} detail={false} lines={'none'}>
                        <IonLabel className='ion-text-wrap'>
                            Confirm property details
                        </IonLabel>
                        <IonButton disabled slot='end'    color='medium'>
                            Continue
                        </IonButton>

                        <IonIcon hidden={array.length !== 3 }  icon={checkmarkCircle} color="success" size={'large'} slot="end"/>
                    </IonItem>
                </IonCard>

                <div className="ion-padding">
                    <IonButton  onClick={e=>{
                        e.preventDefault();
                        props.history.push({
                            pathname:'./property-overview',
                            state:props.location.state
                        })
                    }} className={'next'} expand={'block'}>

                        Next
                    </IonButton>
                </div>
                <IonLoading
                    cssClass='my-custom-class'
                    isOpen={showLoading}
                    onDidDismiss={() => setShowLoading(false)}
                    message={'Loading...'}

                />
            </IonContent>
        </IonPage>
    );
};


