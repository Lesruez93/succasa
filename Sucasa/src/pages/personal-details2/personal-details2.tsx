import React, {useState} from 'react';
import {
    IonAlert,
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent, IonDatetime,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonListHeader,
    IonPage,
    IonRadio,
    IonRadioGroup, IonTitle,
    IonToolbar, useIonViewWillEnter
} from '@ionic/react';
import './personal-details2.css';
import 'react-phone-input-2/lib/style.css'
import ReactPhoneInput from "react-phone-input-2";
import { isValidPhoneNumber } from 'react-phone-number-input'
import moment from "moment";


export default function  PersonalDetails (props:any) {
    let newData :any = {};
    try {
        newData = JSON.parse(localStorage.user);
    }
    catch (e) {

    }

    const [selected, setSelected] = useState<string>("Mr");
    const [name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [number, setNumber] = useState<any>('');
    const [selectedDate, setSelectedDate] = useState<any>(null);
    const [showAlert, setShowAlert] = useState<any>(true);
    const [showAlert1, setShowAlert1] = useState<any>(false);

    const[firstNameErr,setFirstNameErr] = useState('');
    const[lastNameErr,setLastNameErr] = useState("");
    const[dobErr,setDobErr] = useState("");
    const[numErr,setNumErr] = useState("");
    const[numValidErr,setNumValidErr] = useState<any>('');



    const  handleOnChange = (value:any) => {



        setNumber('+'+value)

    };
    const formValidation = () =>
    {
        let firstNameErr:any = {};
       let lastNameErr:any = {};
        let dobErr:any = {};
        let numErr:any = {};
        let isValid = true;

        if(!name)
        {
            firstNameErr = "First name is required";
            isValid = false;
        }
        if(!last_name)
        {
            lastNameErr = "Last name is required";
            isValid = false;
        }


        // if(!number)
        // {
        //     numErr = "Phone number is required";
        //     isValid = false;
        // }
        if(isValidPhoneNumber(number) !== true){

            numErr = 'Invalid phone number';
        isValid = false;

        }

        if(!selectedDate)
        {
            dobErr = "Date of birth is required";
            isValid = false;
        }

        setFirstNameErr(firstNameErr);
        setLastNameErr(lastNameErr);
        setNumErr(numErr);
        setDobErr(dobErr);

        return isValid;

    };

   // const isValidN = () => {
   //      try {
   //          return isValidPhoneNumber(number) === true;
   //      }catch (e) {
   //
   //
   //      }
   //  };



    function onSubmit() {

        newData.title = selected;
        newData.name = name;
        newData.last_name = last_name;
        newData.number = number;
        newData.dob = moment(selectedDate).format('YYYY-MM-DD');

        localStorage.setItem('user', JSON.stringify(newData));
        if (props.location.state !== "Landlord") {
            localStorage.setItem('details', 'true');
            props.history.push('./welcome');
        } else {
            props.history.push('/personal-details');
        }


    }

    function next(e:any) {
        e.preventDefault();
        const isValid = formValidation();
        if (isValid){
            setShowAlert1(true)
        }

    }




    return (
        <IonPage>
            <IonHeader className="ion-no-border">
                <IonToolbar color='medium' >
                    <IonTitle>Personal Details</IonTitle>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref={'./welcome'} color='light'  text=''/>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>



                <div className={'ion-margin-top ion-padding'}>
                    <form onSubmit={(event1 => next(event1))}>

                    <IonRadioGroup value={selected} onIonChange={e => setSelected(e.detail.value)}>
                        <IonListHeader>
                            <IonLabel>What is your title?</IonLabel>
                        </IonListHeader>

                                    <IonItem lines={'none'}>
                                        <IonLabel>Mr</IonLabel>
                                        <IonRadio mode={'md'}  slot="start" value="Mr" />
                                    </IonItem>


                                    <IonItem lines={'none'}>
                                        <IonLabel>Mrs</IonLabel>
                                        <IonRadio className={'ion-radio'} mode={'md'} slot="start" value="Mrs" />
                                    </IonItem>

                                <IonItem lines={'none'}>
                                    <IonLabel>Miss</IonLabel>
                                    <IonRadio className={'ion-radio'} mode={'md'} slot="start" value="Miss" />
                                </IonItem>

                                <IonItem lines={'none'}>
                                <IonLabel>Ms</IonLabel>
                                <IonRadio className={'ion-radio'} mode={'md'} slot="start" value="Ms" />
                            </IonItem>


                    </IonRadioGroup>

                    <IonItem lines={'none'}>
                    <IonLabel   position="stacked">First Name</IonLabel>
                    <IonInput   value={name} onIonChange={e=>{setFirstName(e.detail.value!)}} placeholder='First Name'  className='ion-margin-top input'  />

                </IonItem>
                        <div className='ion-text-center' >   {Object.keys(firstNameErr).map((key:any)=>{
                            return <IonLabel key={key}   color='danger' >{firstNameErr[key]}</IonLabel>
                        })}</div>

                    <IonItem lines='none'>
                        <IonLabel   position="stacked">Last Name</IonLabel>
                        <IonInput   value={last_name} onIonChange={y => {setLastName(y.detail.value!)}} placeholder='Last Name'  className='ion-margin-top input'  />

                    </IonItem>
                        <div className='ion-text-center' >     {Object.keys(lastNameErr).map((key:any)=>{
                            return <IonLabel key={key} color='danger'>{lastNameErr[key]}</IonLabel>
                        })}</div>

                    <IonItem  lines='none'>
                        <IonLabel   position="stacked">Date of birth</IonLabel>
                        <IonDatetime className='ion-margin-top input' placeholder="Select Your Date of Birth"  max={'2005'} value={selectedDate} onIonChange={e => setSelectedDate(e.detail.value!)}/>
                    </IonItem>
                        <div className='ion-text-center' >     {Object.keys(dobErr).map((key:any)=>{
                            return <IonLabel  className='err'  key={key} color='danger'>{dobErr[key]}</IonLabel>
                        })}</div>

                        <div className='ion-margin'>
                            <IonLabel className='ion-margin-bottom'   position="stacked">Phone Number</IonLabel>
                        </div>
                            <div className='ion-margin'>

                            <ReactPhoneInput
                                value={number}
                                placeholder={'Phone number'}
                                enableSearch={true}
                                country={'gb'}
                                onChange={handleOnChange}
                            />
                        </div>
                        <div className='ion-text-center' >
                            {Object.keys(numErr).map((key:any)=>{
                            return <IonLabel className='err' key={key} color='danger'>{numErr[key]}</IonLabel>
                        })}

                        </div>



                    <IonButton type='submit'   className={'next'} expand={'block'}>

                    Next
                </IonButton>
                    </form>
                </div>

                <IonAlert
                    isOpen={showAlert}
                    onDidDismiss={() => setShowAlert(false)}
                    header={'Info'}
                    message={'Please enter the correct details on your National ID, or else we might not be able to verify your account'}
                    buttons={['Continue']}
                />

                <IonAlert
                    isOpen={showAlert1}
                    onDidDismiss={() => setShowAlert1(false)}
                    header={'Info'}
                    message={'Are you sure, you entered the correct details'}
                    buttons={
                        [
                            {
                                text: 'Cancel',

                                handler: () => {

                                }
                            },
                        {
                            text: 'Yes, continue',
                            handler: () => {
                              onSubmit()
                            }
                        }

                        ]


                    }
                />
            </IonContent>
        </IonPage>
    );
};

