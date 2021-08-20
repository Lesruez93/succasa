import React, {useState} from 'react';
import {
    IonActionSheet,
    IonAlert,
    IonBackButton,
    IonButton,
    IonButtons,
    IonCard,
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonPage,
    IonRadio,
    IonRadioGroup,
    IonText,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import {cardOutline, close} from "ionicons/icons";

import '@capacitor-community/stripe'; // only if you want web support
// Type Safe. Current capacitor 2 limitation
import {Plugins} from "@capacitor/core";

const { Stripe } = Plugins;

const openbanking = "./open-banking.png";


interface MSG {
    message:string,
    cost:string
}

export default function UpgradePackage  (props:any) {
    const [selected, setSelected] = useState<number>();
    const [message, setMessage] = useState<MSG>({message:'',cost:''});
    const [amount, setAmount] = useState<number>();
    const [free, setFree] = useState<boolean>();
    const [showActionSheet, setShowActionSheet] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const changeState = () => {
        setSelected(selected);

    };


    function savePayment(data: any) {
        fetch("/stripe-transaction-complete", {
            method: "post",
            body: JSON.stringify({
                orderID: data.orderID
            })
        });
    }

    async function payWithStripe() {

        await Stripe.setPublishableKey({key: 'pk_test_51IZKPCICLdFBLsKpyfKqqGckyxcAN9XCDFENLvU62yJRCi0hGgcRU5taAavadDpmzocyjI9JaqB7BODyTkCnV25Q00WGYUoOGI'});
        const clientSecret: string = 'sk_test_51IZKPCICLdFBLsKpnHEC2WM6dMh95jXYXoAvXmebxmokk34KdwqLJqIz2ipzMvixtE11MsfoViI997JSvw47BdZS00hpwy4LKv';

        const res = await Stripe.confirmSetupIntent({
            clientSecret,
            card: {
                number: '4242424242424242',
                exp_month: 12,
                exp_year: 25,
                cvc: '224',
            },
            redirectUrl: 'https://app.myapp.com', // Required for Android
        });

        console.log(res)
    }



    return (
        <IonPage>
            <IonHeader className="ion-no-border">
                <IonToolbar color='medium'>
                    {<IonButtons slot="start">
                        <IonBackButton defaultHref={'/tabs/dashboard'} color='light' text=''/>
                    </IonButtons>
                    }


                    <IonTitle>
                        Upgrade package
                    </IonTitle>

                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>

                <div>
                    <div className={'ion-text-center ion-padding'}>
                        <IonText>
                            Please select a subscription package suitable for how many property listings you plan on
                            managing in your portfolio
                        </IonText>

                    </div>
                    <div className={'ion-margin-top ion-padding'}>
                        <IonRadioGroup value={selected} onIonChange={e => setSelected(e.detail.value)}>
                            <IonCard className='ion-padding-left ion-card'>
                                <IonItem color={'none'} lines={'none'}>
                                    <IonLabel className="ion-text-wrap">
                                        <div>
                                            <h2>Free subscription package</h2>
                                        </div>

                                        <p className='ion-padding-top'> You can manage up to 1 property listing as a
                                            test user</p>
                                    </IonLabel>
                                    <IonRadio className={'ion-radio'} mode={'md'} slot="end" value={1}/>
                                </IonItem>
                            </IonCard>

                            <IonCard className={'ion-padding-left ion-card'}>
                                <IonItem color={'none'} lines={'none'}>
                                    <IonLabel className="ion-text-wrap">
                                        <div>
                                            <h2>Tier 1 Portfolio Package</h2>
                                        </div>

                                        <p className='ion-padding-top'>Manage up to 5 property listings <strong>$100</strong></p>
                                    </IonLabel>
                                    <IonRadio className={'ion-radio'} mode={'md'} slot="end" value={2}/>

                                </IonItem>
                            </IonCard>


                            <IonCard className={'ion-padding-left ion-card'}>
                                <IonItem color={'none'} lines={'none'}>
                                    <IonLabel className="ion-text-wrap">
                                        <div>
                                            <h2>Tier 2 Portfolio Package</h2>
                                        </div>

                                        <p className='ion-padding-top'> Manage up to 20 property listings <strong>$250</strong></p>
                                    </IonLabel>
                                    <IonRadio className={'ion-radio'} mode={'md'} slot="end" value={3}/>
                                </IonItem>
                            </IonCard>

                            <IonCard className={'ion-padding-left ion-card'}>
                                <IonItem color={'none'} lines={'none'}>
                                    <IonLabel className="ion-text-wrap">
                                        <div>
                                            <h2>Tier 3 Portfolio Package</h2>
                                        </div>

                                        <p className='ion-padding-top'> Manage up to 50 property listings <strong>$500</strong></p>
                                    </IonLabel>
                                    <IonRadio className={'ion-radio'} mode={'md'} slot="end" value={4}/>
                                </IonItem>
                            </IonCard>


                            <IonCard className={'ion-padding-left ion-card'}>
                                <IonItem color={'none'} lines={'none'}>
                                    <IonLabel className="ion-text-wrap">
                                        <div>
                                            <h2>Enterprise Package</h2>
                                        </div>

                                        <p className='ion-padding-top'> Landlord who wish to manage over 50 property
                                            units</p>
                                    </IonLabel>
                                    <IonRadio className={'ion-radio'} mode={'md'} slot="end" value={5}/>
                                </IonItem>
                            </IonCard>

                        </IonRadioGroup>

                        <IonButton disabled={!selected} onClick={e => {
                            e.preventDefault();

                            switch (selected) {
                                case 1:
                                    setFree(true);

                                    break;
                                case 2:
                                    setAmount(100);
                                    setMessage({message:'This package will give you full access to the app features up to 5 listings within your portfolio.',

                                        cost:'This package cost £100.00 annually'});
                                    setShowAlert(true);
                                    break;
                                case 3:
                                    setAmount(250);
                                    setMessage({message:'This package will give you full access to the app features up to 20 listings within your portfolio.' ,
                                        cost: 'This package cost £250.00 annually'});
                                    setShowAlert(true);
                                    break;
                                case 4:
                                    setAmount(500);
                                    setMessage({message:'This package will give you full access to the app features up to 50 listings within your portfolio',
                                        cost:'This package cost £500 annually'});
                                    setShowAlert(true);
                                    break;
                                case 5:
                                    props.history.push('./enterprise-package');
                                    break;

                            }

                        }} className={'next'} expand={'block'}>

                            Continue
                        </IonButton>


                    </div>
                </div>
                <IonActionSheet
                    isOpen={showActionSheet}
                    onDidDismiss={() => setShowActionSheet(false)}
                    cssClass='action'
                    buttons={[{
                        text: 'Open Banking',

                        icon: openbanking,
                        handler: () => {

                        }
                    }
                        ,
                        //     {
                        //     text: 'stripe',
                        //     icon: logostripe,
                        //     handler: () => {
                        //         setstripe(true)
                        //     }
                        // }
                        // ,
                        {
                            text: 'Credit/Debit Card',

                            icon: cardOutline,
                            handler: () => {
                                setShowActionSheet(false);
                                props.history.push({
                                    pathname:'./checkout',
                                    state:{amount:amount,
                                        desc:message.message}
                                })
                                //payWithStripe()
                            }
                        }, {
                            text: 'Cancel',
                            icon: close,
                            role: 'cancel',

                            handler: () => {

                            }
                        }]}
                >
                </IonActionSheet>

                <IonAlert
                    isOpen={showAlert}
                    onDidDismiss={() => setShowAlert(false)}

                    header={message.cost}
                    message={message.message}
                    buttons={[
                        {
                            text: 'Cancel',
                            role: 'cancel',
                            cssClass: 'secondary',
                            handler: blah => {


                            }
                        },
                        {
                            text: 'Continue',
                            handler: () => {
                                setShowActionSheet(true)
                            }
                        }
                    ]}
                />


            </IonContent>
        </IonPage>

    );
};

