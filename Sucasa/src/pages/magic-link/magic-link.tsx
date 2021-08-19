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
    IonText,
    IonToolbar
} from '@ionic/react';
import './magic-link.css';
import urls from "../../urls";
import firebase from 'firebase';


export default function  MagicLink (props:any) {
    const [email, setEmail] = useState<any>();
    const [showLoading, setShowLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const actionCodeSettings = {
        // URL you want to redirect back to. The domain (www.example.com) for this
        // URL must be in the authorized domains list in the Firebase Console.
        url: 'https://sucasa-826f9.web.app',
        // This must be true.
        handleCodeInApp: true,
        iOS: {
            bundleId: 'com.sucasa.app'
        },
        android: {
            packageName: 'com.sucasa.app',
            installApp: true,
            minimumVersion: '12'
        },
        dynamicLinkDomain: 'https://sucasa-826f9.web.app'
    };

   function nav(){
       setShowLoading(true);
       firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings)
           .then(() => {
               // The link was successfully sent. Inform the user.
               // Save the email locally so you don't need to ask the user for it again
               // if they open the link on the same device.
             localStorage.setItem('emailForSignIn', email);
             setShowAlert(true)
               // ...
           })
           .catch((error) => {
               setShowLoading(false);
               console.log(error)
               let errorCode = error.code;
               let errorMessage = error.message;
               // ...
           });
    }


    return (
        <IonPage>
            <IonHeader className="ion-no-border">
                <IonToolbar  >
                    <IonButtons slot="start">
                        <IonBackButton color='dark'  text=''/>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>


                <div className={'ion-text-center '}>

                    <h2>What is your email address?</h2>

                </div>
                <div className={'ion-text-center ion-padding'}>
                    <IonText>
                        Please provide your email, we’ll send you a link to sign in instantly
                    </IonText>

                </div>
                <div className={'ion-margin-top ion-padding'}>
                    <IonItem lines={'none'}>
                        <IonLabel  position="stacked">Email</IonLabel>
                        <IonInput  className={'input'}  value={email} onIonChange={y => setEmail(y.detail.value!)} />
                    </IonItem>

                    <IonButton   onClick={e => {
                        e.preventDefault();
                        nav()
                       // props.history.push(urls.PERSONAL_DETAILS2);

                    }} className={'next'} expand={'block'}>

                        Send magic link
                    </IonButton>
                </div>
                <IonLoading
                isOpen={showLoading}
                onDidDismiss={() => setShowLoading(false)}
                message={'Please wait...'}

            />

                <IonAlert
                    isOpen={showAlert}
                    onDidDismiss={() => setShowAlert(false)}
                    message={'Check your email to complete the sign in process'}
                    header={'Done'}

                />
            </IonContent>
        </IonPage>
    );
};

// import React, { useState } from "react";
// import ReactDOM from "react-dom";
// import { useForm, Controller } from "react-hook-form";
// import {
//     IonContent,
//     IonPage,
//     IonItem,
//     IonRange,
//     IonLabel,
//     IonButton,
//     IonSelect,
//     IonSelectOption,
//     IonInput,
//     IonRadio,
//     IonRadioGroup,
//     IonListHeader,
//     IonHeader
// } from "@ionic/react";
//
// /* Core CSS required for Ionic components to work properly */
// import "@ionic/react/css/core.css";
//
// /* Basic CSS for apps built with Ionic */
// import "@ionic/react/css/normalize.css";
// import "@ionic/react/css/structure.css";
// import "@ionic/react/css/typography.css";
//
// let renderCount = 0;
// let initialValues = {
//     rangeInfo: -100,
//     fullName: "",
//     gender: "",
//     techCos: "",
//     email: ""
// };
//
// function App() {
//     const { control, handleSubmit, formState, reset, errors } = useForm({
//         defaultValues: { ...initialValues },
//         mode: "onChange"
//     });
//
//     const [data, setData] = useState();
//     renderCount++;
//
//     /**
//      *
//      * @param _fieldName
//      */
//     const showError = (_fieldName:any) => {
//         return (
//             (
//                 <div
//                     style={{
//                         color: "red",
//                         padding: 5,
//                         paddingLeft: 12,
//                         fontSize: "smaller"
//                     }}
//                 >
//                     {_fieldName}: {errors[_fieldName].message || "This field is required"}
//                 </div>
//             ) && errors[_fieldName]
//         );
//     };
//
//     /**
//      *
//      * @param data
//      */
//     const onSubmit = data => {
//         alert(JSON.stringify(data, null, 2));
//         setData(data);
//     };
//
//     console.log(errors);
//     return (
//         <IonPage>
//             <IonHeader>
//                 <h2>React Hook Form work with Ionic Components</h2>
//             </IonHeader>
//
//             <IonContent>
//                 <form onSubmit={handleSubmit(onSubmit)} style={{ padding: 18 }}>
//                     <span className="counter">Render Count: {renderCount}</span>
//
//                     <IonItem>
//                         <IonLabel>Name - IonInput</IonLabel>
//                         <Controller
//                             as={IonInput}
//                             control={control}
//                             onChangeName="onIonChange"
//                             onChange={([selected]) => {
//                                 console.log("fullName", selected.detail.value);
//                                 return selected.detail.value;
//                             }}
//                             name="fullName"
//                             rules={{
//                                 required: true,
//                                 minLength: { value: 4, message: "Must be 4 chars long" }
//                             }}
//                         />
//                     </IonItem>
//                     {showError("fullName")}
//
//                     <IonItem>
//                         <IonLabel>Email</IonLabel>
//                         <Controller
//                             as={IonInput}
//                             control={control}
//                             onChangeName="onIonChange"
//                             onChange={([selected]) => {
//                                 return selected.detail.value;
//                             }}
//                             name="email"
//                             rules={{
//                                 required: true,
//                                 pattern: {
//                                     value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
//                                     message: "invalid email address"
//                                 }
//                             }}
//                         />
//                     </IonItem>
//                     {showError("email")}
//                     <Controller
//                         as={
//                             <IonRadioGroup>
//                                 <IonListHeader>
//                                     <IonLabel>
//                                         <h1>Manufacturers</h1>
//                                     </IonLabel>
//                                 </IonListHeader>
//                                 <IonItem>
//                                     <IonLabel>Apple</IonLabel>
//                                     <IonRadio value="apple" />
//                                 </IonItem>
//                                 <IonItem>
//                                     <IonLabel>Amazon</IonLabel>
//                                     <IonRadio value="amazon" />
//                                 </IonItem>
//                                 <IonItem>
//                                     <IonLabel>Microsoft</IonLabel>
//                                     <IonRadio value="microsoft" />
//                                 </IonItem>
//                             </IonRadioGroup>
//                         }
//                         control={control}
//                         name="techCos"
//                         rules={{ required: true }}
//                         onChangeName="onIonChange"
//                         onChange={([selected]) => {
//                             console.log(selected.detail.value);
//                             return selected.detail.value;
//                         }}
//                     />
//
//                     <IonItem>
//                         <IonLabel>Gender</IonLabel>
//                         <Controller
//                             as={
//                                 <IonSelect placeholder="Select One">
//                                     <IonSelectOption value="FEMALE">Female</IonSelectOption>
//                                     <IonSelectOption value="MALE">Male</IonSelectOption>
//                                 </IonSelect>
//                             }
//                             control={control}
//                             onChangeName="onIonChange"
//                             onChange={([selected]) => {
//                                 console.log(selected.detail.value);
//                                 return selected.detail.value;
//                             }}
//                             name="gender"
//                             rules={{ required: true }}
//                         />
//                     </IonItem>
//
//                     <IonItem>
//                         <Controller
//                             as={
//                                 <IonRange min={-200} max={200} color="secondary">
//                                     <IonLabel slot="start">-200</IonLabel>
//                                     <IonLabel slot="end">200</IonLabel>
//                                 </IonRange>
//                             }
//                             control={control}
//                             name="rangeInfo"
//                             onChangeName="onIonChange"
//                             onChange={([selected]) => {
//                                 console.log(selected.detail.value);
//                                 return selected.detail.value;
//                             }}
//                             rules={{ required: true }}
//                         />
//                     </IonItem>
//                     <IonItem>
//                         <IonLabel>
//                             formState.isValid: {(formState.isValid === true).toString()}
//                         </IonLabel>
//                     </IonItem>
//                     {data && (
//                         <pre style={{ textAlign: "left" }}>
//               {JSON.stringify(data, null, 2)}
//             </pre>
//                     )}
//
//                     <IonButton
//                         type="button"
//                         onClick={() => {
//                             reset(initialValues);
//                         }}
//                     >
//                         Reset Form
//                     </IonButton>
//                     <IonButton type="submit" disabled={formState.isValid === false}>
//                         submit
//                     </IonButton>
//                 </form>
//             </IonContent>
//         </IonPage>
//     );
// }
//
// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);
