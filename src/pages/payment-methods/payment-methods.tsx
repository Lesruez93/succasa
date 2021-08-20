import React, {useState} from 'react';
import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonCard,
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonLoading,
    IonPage,
    IonRadio,
    IonRadioGroup,
    IonText,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import {getUser, toast, updateData} from "../../api";


export default function PaymentMethods  (props:any)  {
    const [selected, setSelected] = useState<number>(1);
    const [showLoading,setShowLoading]= useState(false);
   const paymentMethods = ["Paypal","Stripe","OpenBanking","I will collect payments manually"];



    const changeState = () => {

        setShowLoading(true);
        updateData({payment_method:selected},'users',getUser().id).then(()=>{
            toast('Payment method updated successfully');
            props.history.goBack();
            setShowLoading(false);
        }).catch(()=>{
            toast('Failed please try again');
            setShowLoading(false);
        })

    };



    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color='secondary'  >
                    <IonButtons slot="start">
                        <IonBackButton defaultHref={'/settings'} color='light'  text=''/>
                    </IonButtons>
                    <IonTitle>Payment Methods</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent >


                <div className={'ion-text-center ion-padding'}>
                    <IonText>
                        Please select  the  method you want to receive payments with
                    </IonText>

                </div>
                <div className={'ion-margin-top ion-padding'}>
                    <IonRadioGroup value={selected} onIonChange={e => setSelected(e.detail.value)}>


                        { paymentMethods.map((p)=>(
                            <IonCard key={p} className={'ion-padding-left'}>
                                <IonItem  color={'none'} lines={'none'}>
                                    <IonLabel> <div>
                                        <h2>{p}</h2>

                                    </div></IonLabel>
                                    <IonRadio className={'ion-radio'} mode={'md'} slot="end" value={p} />
                                </IonItem>
                            </IonCard>
                        ))}
                    </IonRadioGroup>


                        <IonButton  onClick={e => {
                            e.preventDefault();
                            changeState()
                        }} className={'next'}  expand={'block'}>

                            Confirm
                        </IonButton>


                </div>
                <IonLoading
                    cssClass='my-custom-class'
                    isOpen={showLoading}
                    onDidDismiss={() => setShowLoading(false)}
                    message={'Please wait...'}

                />
            </IonContent>
        </IonPage>
    );
};

