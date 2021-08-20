import React, {useMemo, useState} from "react";
import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js";

import useResponsiveFontSize from "../utils/useResponsiveFontSize";
import {IonAlert, IonButton, IonContent, IonLoading} from "@ionic/react";
import './stripe.css';
import {getUser, pay, postData} from "../api";


const useOptions = () => {
    const fontSize = useResponsiveFontSize();
    const options = useMemo(
        () => ({
            style: {
                base: {
                    fontSize,
                    color: "#424770",
                    letterSpacing: "0.025em",
                    fontFamily: "Source Code Pro, monospace",
                    "::placeholder": {
                        color: "#aab7c4"
                    }
                },
                invalid: {
                    color: "#9e2146"
                }
            }
        }),
        [fontSize]
    );

    return options;
};

const CardForm = (props:any) => {
    const [message, setMessage] = useState<any>({});
    const [showAlert, setShowAlert] = useState<any>(false);
    const [showLoading, setShowLoading] = useState(false);
    const [cardComplete, setCardComplete] = useState(false);

    const stripe = useStripe();
    const elements = useElements();
    const options = useOptions();


    const handleSubmit = async (event:any) => {
        event.preventDefault();
        setShowLoading(true);
        const cardElement = elements.getElement(CardElement);

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        stripe.createToken(cardElement).then((res:any)=>{

            invoice(res.token.id);

        }).catch((error:any)=>{

            setMessage({status:"Error",message:error.message});
            setShowAlert(true);
            setShowLoading(false);
        });





    };




   function invoice(token:any) {
       const  data = {
           user_id:getUser().id,
           description: props.props.location.state.desc,
           package_id:'2',
           amount:props.props.location.state.amount,
           nextdue:'2022-02-02'
       };
        postData(data,'invoices').then((resp:any)=>{

            pay('invoices/'+resp.data.data.id+'/pay',token).then((res:any)=>{
                setMessage({status:"Success",message:'Payment Success'});
                setShowAlert(true);
                setShowLoading(false);
            }).catch(()=>{
                setMessage({status:"Error",message:'Something went wrong'});
                setShowAlert(true);
                setShowLoading(false);

            })

        }).catch(e=>{
            setMessage({status:"Error",message:'Something went wrong'});
            setShowAlert(true);
            setShowLoading(false);
        })

   }

    return (<IonContent className='ion-padding'>
            <form onSubmit={handleSubmit}>
                <label>
                    Card details
                    <CardElement
                        options={options}
                        onChange={(r:any)=>{
                            if (r.complete){
                                console.log()
                                setCardComplete(true)
                            }
                        }}

                    />
                </label>
                <IonButton expand='block' className='next' color='medium' type="submit" disabled={!cardComplete}>
                    Pay
                </IonButton>
            </form>


            <IonLoading
                isOpen={showLoading}
                onDidDismiss={() => setShowLoading(false)}
                message={'Processing ... '}

            />

            <IonAlert
                isOpen={showAlert}
                onDidDismiss={() => setShowAlert(false)}
                header={message.status}
                message={message.message}
                buttons={[
                    {
                        text: 'Ok',
                        handler: () => {

                        }
                    }]}
            />
        </IonContent>
    );
};

export default CardForm;
