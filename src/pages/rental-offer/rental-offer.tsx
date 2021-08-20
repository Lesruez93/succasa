import React, {useState} from 'react';
import {
    IonAlert,
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonDatetime,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonLoading,
    IonPage,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import API, {fetcher, fetcherOption, updateData} from "../../api";
import useSWR from "swr";
import moment from "moment";
import firebase from "firebase";


export default function  RentalOffer (props:any) {
    const db = firebase.firestore();


    const [rent, setMonthlyRent] = useState<any>();
    const [people, setTenancyNum] = useState<any>();
    const [message, setMessage] = useState<any>();
    const [selectedDate, setSelectedDate] = useState<any>(null);
    const [showAlert1, setShowAlert1] = useState<any>(false);
    const[monthlyRentErr,setmonthlyRentErr] = useState('');
    const[monthlyRentMinErr,setmonthlyRentMinErr] = useState('');
    const[tenancyNumErr,settenancyNumErr] = useState("");
    const[tenancyNumMaxErr,settenancyNumMaxErr] = useState("");
    const[moveInDateErr,setmoveInDateErr] = useState("");
    const[moveInDateMinErr,setmoveInDateMinErr] = useState("");
    const [showLoading, setShowLoading] = useState(false);
    const propertyId:any =  29//PropertyIdStore.useState(s => s.propertyId);
    const  today = moment().format('YYYY-MM-DD');    // 07/29/2021

    const { data, error } = useSWR('properties/'+propertyId, fetcher,fetcherOption);



    const formValidation = () =>
    {
        let monthlyRentErr:any = {};
        let monthlyRentMinErr:any = {};
       let tenancyNumErr:any = {};
        let tenancyNumMaxErr:any = {};
        let moveInDateErr:any = {};
        let moveInDateMinErr:any = {};
        let isValid = true;

        const diffDays = moment(selectedDate,'YYYY-MM-DD').diff( data.data.attributes.ealiest_available_date, 'days');
        console.log(diffDays);
        if(!rent)
        {
            monthlyRentErr = "Montly rent is required";
            isValid = false;
        }

        if (people > data.data.attributes.max_number_of_tenants ) {
            tenancyNumMaxErr = "Sorry the property is not suitable for the amount of tenants selected";
            isValid = false;
        }
        if (diffDays > 60) {
            moveInDateMinErr = 'Move In Date needs to be within 60 days of the property Move In Date';
            isValid = false;
        }
        if(!people)
        {
            tenancyNumErr = "Number of people is required";
            isValid = false;
        }
        if (rent < data.data.attributes.rent/2 ) {
            monthlyRentMinErr = "Sorry this offer is much lower than advertised";
            isValid = false;
        }

        if(!selectedDate)
        {
            moveInDateErr = "Move in date is required";
            isValid = false;
        }

        setmonthlyRentErr(monthlyRentErr);
        setmonthlyRentMinErr(monthlyRentMinErr);
        settenancyNumErr(tenancyNumErr);
        settenancyNumMaxErr(tenancyNumMaxErr);
        setmoveInDateErr(moveInDateErr);
        setmoveInDateMinErr(moveInDateMinErr);
        return isValid;

    };


    function onSubmit() {


        // newData.rent = rent;
        // newData.move_in_date = moment(selectedDate).format('YYYY-MM-DD');



    }

    function next(e:any) {
        e.preventDefault();
        const isValid = formValidation();
        if (isValid){
offer()
        }

    }


    function offer() {

        const dat = {
            "tenancy_id": "1",
            "status": "awaiting_referrencing",
            "comments": `Move in date${selectedDate}  and   ${people}  tenants `,
            "amount": rent
        };

            setShowLoading(true);
        // postData(dat,'rental-offers').then(()=>{
        //     setShowLoading(false);
        //     db.collection('').add({
        //         uid:data.id,
        //         tenants:people,
        //         rent:rent,
        //         date:moment(selectedDate).format('YYYY-MM-DD'),
        //         message:'New rental offer'
        //     })
        //     setShowAlert1(true)
        // }).catch(()=>{
        //     toast('Failed please try again').then();
        //     setShowLoading(false)
        // })
    }

    return (
        <IonPage>
            <IonHeader className="ion-no-border">
                <IonToolbar color='medium' >
                    <IonTitle>Rental offer</IonTitle>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref={'./welcome'} color='light'  text=''/>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>



                <div className={'ion-margin-top ion-padding'}>
                    <form onSubmit={(event1 => next(event1))}>



                    <IonItem lines={'none'}>
                    <IonLabel  className='ion-text-wrap'  position="stacked">What monthly rent will you be happy to pay?</IonLabel>
                    <IonInput  type='number' value={rent} onIonChange={e=>{setMonthlyRent(e.detail.value!)}} placeholder='Monthly rent'  className='ion-margin-top input'  />

                </IonItem>
                        <div className='ion-text-center' >   {Object.keys(monthlyRentErr).map((key:any)=>{
                            return <IonLabel key={key}   color='danger' >{monthlyRentErr[key]}</IonLabel>
                        })}</div>

                        <div className='ion-text-center' >   {Object.keys(monthlyRentMinErr).map((key:any)=>{
                            return <IonLabel key={key}   color='danger' >{monthlyRentMinErr[key]}</IonLabel>
                        })}</div>


                    <IonItem lines='none'>
                        <IonLabel className='ion-text-wrap'    position="stacked">How many people including yourself will be on the tenancy?</IonLabel>
                        <IonInput   value={people} onIonChange={y => {setTenancyNum(y.detail.value!)}} placeholder='Number of people' type='number'  className='ion-margin-top input'  />

                    </IonItem>
                        <div className='ion-text-center' >     {Object.keys(tenancyNumErr).map((key:any)=>{
                            return <IonLabel key={key} color='danger'>{tenancyNumErr[key]}</IonLabel>
                        })}</div>
                        <div className='ion-text-center' >     {Object.keys(tenancyNumMaxErr).map((key:any)=>{
                            return <IonLabel key={key} color='danger'>{tenancyNumMaxErr[key]}</IonLabel>
                        })}</div>

                    <IonItem  lines='none'>
                        <IonLabel  className='ion-text-wrap'  position="stacked">What date would you like to move in?</IonLabel>
                        <IonDatetime className='ion-margin-top input' min={today} placeholder="Move in Date" value={selectedDate} onIonChange={e => setSelectedDate(e.detail.value!)}/>
                    </IonItem>
                        <div className='ion-text-center' >     {Object.keys(moveInDateErr).map((key:any)=>{
                            return <IonLabel  className='err'  key={key} color='danger'>{moveInDateErr[key]}</IonLabel>
                        })}</div>
                        <div className='ion-text-center' >     {Object.keys(moveInDateMinErr).map((key:any)=>{
                            return <IonLabel  className='err'  key={key} color='danger'>{moveInDateMinErr[key]}</IonLabel>
                        })}</div>



                    <IonButton  type='submit'   className={'next'} expand={'block'}>

                  Submit
                </IonButton>
                    </form>
                </div>


                <IonLoading
                    cssClass='my-custom-class'
                    isOpen={showLoading}
                    onDidDismiss={() => setShowLoading(false)}
                    message={'Please wait...'}

                />
                <IonAlert
                    isOpen={showAlert1}
                    onDidDismiss={() => setShowAlert1(false)}
                    header={'Info'}
                    message={message}
                    buttons={
                        [
                        {
                            text: 'Ok',
                            role:'cancel',
                            handler: () => {

                            }
                        }

                        ]


                    }
                />
            </IonContent>
        </IonPage>
    );
};

