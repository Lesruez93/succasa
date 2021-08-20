import React from 'react';
import {loadStripe} from '@stripe/stripe-js';
import {Elements,} from '@stripe/react-stripe-js';
import {IonBackButton, IonButtons, IonHeader, IonPage, IonTitle, IonToolbar} from "@ionic/react";
import CheckoutForm from '../../components/stripe';


const stripePromise = loadStripe('pk_test_51IZKNrCN3WKOczCURWOdblC6iJEx77oyqdxW6tkLWMbNDqydgTLzH7tYMHgL7lK0XiS4ONkQ9m11mPzwBJnXeYTu00hseFshJw');


const Checkout = (props:any) => (

    <IonPage>
        <IonHeader className="ion-no-border">
            <IonToolbar color='medium'  >
                <IonButtons slot="start">
                    <IonBackButton defaultHref={'./subscription'} color=''  text=''/>
                </IonButtons>
                <IonTitle>Pay with card</IonTitle>
            </IonToolbar>
        </IonHeader>


<Elements stripe={stripePromise}>
      <CheckoutForm props={props}/>
    </Elements>
    </IonPage>
);

export default Checkout
