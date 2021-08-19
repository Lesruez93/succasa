import React, {useEffect, useState} from 'react';
import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonIcon,
    IonInput,
    IonItem,
    IonLabel,
    IonLoading,
    IonPage,
    IonRow,
    IonSelect,
    IonSelectOption,
    IonText,
    IonToast,
    IonToolbar
} from '@ionic/react';
import './address.css';
import {caretForward, paperPlane} from "ionicons/icons";
import axios from "axios";
import API, {getApiRequest, toast, updateData} from "../../api";
import {Plugins} from '@capacitor/core';


export default function AddressEdit (props:any)  {
    const [address, setAddress] = useState<any>(null);
    const [addresses, setAddresses] = useState(false);
    const [addressList, setAddressList] = useState<any>([]);
    const [postCode, setText] = useState<any>(null);
    const [message, setMessage] = useState<any>(null);
    const [color, setColor] = useState<any>(null);
    const [showToast, setShowToast] = useState(false);
    const [showLoading, setShowLoading] = useState(false);

    const [data,setData ] = useState<any>({
        address:'',
        postcode :''
    } );

    const onInputChange = (e:any) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    useEffect(()=>{
        getApiRequest('properties/'+localStorage.getItem('property_id')).then(r=>{
            setData(r.data.data.attributes)
        }).catch()
    },[]);

    function showPosition(position:any) {

        getAddressByCoord(position.coords.latitude,position.coords.longitude)
    }
    function getAddressByCoord(lat:number,lng:number) {
        axios({
            method: 'get', //you can set what request you want to be
            url: API.GeocodingUrl+lat+','+lng +'&key='+API.API_KEY,
        }).then((res:any)=>{
            try {
                setText(res.data.results[0].address_components.find((addr:any) => addr.types[0] === "postal_code").short_name);

            }
            catch (e) {
                setShowLoading(false);
                alert("Postal code not found, enter it manually")

            }
            try {
                setAddress(res.data.results[0].formatted_address);
                setShowLoading(false);

            }
            catch (e) {
                setShowLoading(false);
                alert("Address not found, enter address manually")
            }

        })
    }

    function getAddressByPostal(postCode:any,country:any) {
        axios({
            method: 'get', //you can set what request you want to be
            url: API.PostalUrl+postCode+'|country:' + country+'&key='+API.API_KEY,
        }).then((res:any)=>{
            setAddressList(res.data.results);
            setAddresses(true);
            setShowLoading(false);

        }).catch(e=>{
            alert("Address not found, enter address manually")

        })
    }
    async  function getLocation() {
        setShowLoading(true);
        // if (navigator.geolocation) {
        //     navigator.geolocation.getCurrentPosition(showPosition);
        // }else {
        //     setShowLoading(false);
        //
        //     alert('error')
        // }

        // handleRefreshPosition();



    }

    async function getCurrentPosition() {
        setShowLoading(true);
        const { Geolocation } = Plugins;

        const coordinates = await Geolocation.getCurrentPosition();
        console.log('Current', coordinates);
        showPosition(coordinates)

    }


    function nav(e:any) {
        e.preventDefault();
        setShowLoading(true);
        updateData({street_address:address,
            post_code:postCode},'users',localStorage.getItem('user_id'))
            .then(res=>{
                setShowLoading(true);
                toast('Updated').then().catch();
                props.history.push('../')

            }).catch(e=>{
            setShowLoading(true)

        })


    }

    return (
        <IonPage>
            <IonHeader className="ion-no-border">
                <IonToolbar  >
                    <IonButtons slot="start">
                        <IonBackButton defaultHref={'./settings'} color='dark'  text=''/>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>


                <div className={'ion-text-center '}>

                    <h2>Your Address</h2>

                </div>
                <div className={'ion-margin-top ion-padding'}>
                    <IonButton   onClick={e=>{
                        getCurrentPosition().then((res:any)=>{

                        },error=>{
                            setShowLoading(false);
                        })
                    }} fill={'outline'}  color={'medium'}    className={'location'} expand={'block'}>

                        Use current location
                        <IonIcon  slot="start"  color={'medium'}  icon={paperPlane}/>
                    </IonButton>
                    <div className='ion-margin-top ion-text-center'>
                        <IonText  color='primary'>{address}</IonText>
                    </div>
                </div>

                <div className={'ion-margin-top'}>
                    <IonGrid>
                        <IonRow>
                            <IonCol size={'5'}>
                                <hr/>



                            </IonCol>
                            <IonCol size={'2'}>
                                <h3>Or</h3>
                            </IonCol>
                            <IonCol size={'5'}>
                                <hr/>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </div>
                <form onSubmit={event1 => nav(event1)}>
                    <div>
                        <IonItem color={'none'} lines={'none'}>
                            <IonLabel position={'stacked'} >PostCode</IonLabel>
                            <IonInput  value={postCode} onIonChange={e => onInputChange(e)}  className={'input'}  />
                        </IonItem>
                    </div>


                    <div className={'ion-padding'}>
                        <IonButton disabled={!postCode} onClick={e=>{
                            setShowLoading(true);

                            getAddressByPostal(postCode,'GB')
                        }}    className={'find'} expand={'block'}>

                            Find my address
                        </IonButton>
                    </div>

                    <div>
                        <IonItem color={'none'} lines={'none'}>
                            <IonLabel position={'stacked'} >Select address</IonLabel>
                            <IonSelect disabled={!addresses} value={address} className={'input-select'} onIonChange={y => setAddress(y.detail.value)}  >
                                {addressList.map((ad:any)=>(<IonSelectOption key={ad.formatted_address} value={ad.formatted_address} >
                                    {ad.formatted_address}

                                </IonSelectOption>)) }
                            </IonSelect>
                        </IonItem>
                        <div className={'ion-padding'}>
                            <IonIcon className={'ion-margin-top'} slot={'start'} icon={caretForward} />
                            <IonLabel>Enter manually</IonLabel>

                        </div>
                        <IonItem color={'none'} lines={'none'}>
                            <IonLabel position={'stacked'} >Address</IonLabel>
                            <IonInput  required value={address} onIonChange={e => onInputChange(e)} className={'input'}  />
                        </IonItem>
                    </div>

                    <div className={'ion-padding'}>
                        <IonButton type='submit' className={'next'} expand={'block'}>

                            Next
                        </IonButton>
                    </div>
                </form>

            </IonContent>
            <IonToast
                isOpen={showToast}
                onDidDismiss={() => setShowToast(false)}
                message={message}
                position={'top'}
                color={color}
                duration={2000}
            />
            <IonLoading
                cssClass='my-custom-class'
                isOpen={showLoading}
                onDidDismiss={() => setShowLoading(false)}
                message={'Please wait...'}

            />
        </IonPage>
    );
};


