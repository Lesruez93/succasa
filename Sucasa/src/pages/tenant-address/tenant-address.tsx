import React, {useState} from 'react';
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
    IonToolbar,
    useIonViewWillEnter
} from '@ionic/react';
import './tenant-address.css';
import {caretForward, paperPlane} from "ionicons/icons";
import axios from "axios";
import API, {getApiRequest, register} from "../../api";
import {Plugins} from '@capacitor/core';


export default function TenantAddress (props:any)  {
    const [address, setAddress] = useState<any>(null);
    const [addresses, setAddresses] = useState(false);
    const [addressList, setAddressList] = useState<any>([]);
    const [postCode, setText] = useState<any>(null);
    const [message, setMessage] = useState<any>(null);
    const [years, setYears] = useState<any>(null);
    const [color, setColor] = useState<any>(null);
    const [showToast, setShowToast] = useState(false);
    const [showLoading, setShowLoading] = useState(false);

let newData:any;


useIonViewWillEnter(()=>{
    try {
        newData = JSON.parse(localStorage.user);
    }catch (e) {
        console.log(e)
    }
});

    function showPosition(position:any) {

        getAddressByCoord(position.coords.latitude,position.coords.longitude)
    }
    function getAddressByCoord(lat:number,lng:number) {
        axios({
            method: 'get', //you can set what request you want to be
            url: API.GeocodingUrl+lat+','+lng +'&key='+API.API_KEY,
    }).then((res:any)=>{
        setAddress(res.data.results[0].formatted_address);
            setShowLoading(false);

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


    function navHome() {
        let data = {
            "name": newData.name,
            "title": newData.title,
            "is_company": newData.is_company.toString(),
            "id_type_id": newData.id_type_id.toString(),
            "id_document": "",
            "dob": newData.dob,
            "user_type":newData.user_type,
            "postcode": postCode,
            "street_address": address,
            "company_number": newData.company_number || null,
            "company_name": newData.company_name || null
        };
        setShowLoading(true);
        getApiRequest('auth/user').then((resp:any)=>{

            register(data,resp.data.id).then((res:any)=>{
                setShowToast(true);
                setShowLoading(false);
                setColor('success');
                setMessage('Info updated');
                setTimeout(()=>{
                    props.history.push('/tabs/tab1');
                    setShowToast(false);
                },1000)


            }).catch((error)=>{
                console.log(error);
                setColor('danger');
                setMessage('Something went wrong');
                setShowLoading(false);
                setShowToast(true)

            }).then().catch()
        });

    }

    return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar  >
            <IonButtons slot="start">
                <IonBackButton defaultHref={'./dob'} color='dark'  text=''/>
            </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>


          <div className={'ion-text-center '}>

        <h2>Tenancy history</h2>

          </div>
          <div className={'ion-margin-top ion-padding'}>
              <IonText>Please can you provide us with details of your previous addresses</IonText>
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

          <div>
              <IonItem color={'none'} lines={'none'}>
                  <IonLabel position={'stacked'} >PostCode</IonLabel>
                  <IonInput  value={postCode} onIonChange={y => setText(y.detail.value!)}  className={'input'}  />
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
              <IonInput  value={address} onIonChange={y => setAddress(y.detail.value!)}  className={'input'}  />
          </IonItem>

              <div>
                  <IonItem color={'none'} lines={'none'}>
                      <IonLabel position={'stacked'} >How many years spent at address?</IonLabel>
                      <IonInput  value={years} onIonChange={y => setYears(y.detail.value!)}  className={'input'}  />
                  </IonItem>
              </div>
          </div>

          <div className={'ion-padding'}>
              <IonButton    onClick={e => {
                  e.preventDefault();
                    navHome()
              }} className={'next'} expand={'block'}>

                  Complete account
              </IonButton>
          </div>


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


