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
    IonLabel,
    IonLoading,
    IonPage,
    IonText,
    IonToolbar
} from '@ionic/react';
import './company.css';
import {Plugins} from "@capacitor/core";
import '@capacitor-community/http';


export default function  Company(props:any) {

    const  [companyNumber, setCompanyNumber] = useState<any>(null);
    const  [companyName, setCompanyName] = useState<any>(null);
    const [showLoading, setShowLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const doGet = async () => {
        // Destructure as close to usage as possible for web plugin to work correctly
        // when running in the browser

    };

    let newData :any = {};
    try {
        newData = JSON.parse(localStorage.user);
    }
    catch (e) {

    }


    function nav() {
        newData.company_number = companyNumber;
        newData.company_name = companyName.name;
        localStorage.setItem('user',JSON.stringify(newData));
        localStorage.setItem('details','true');
        props.history.push('./welcome');
    }




    async function fetchCompany(){
        setShowLoading(true);

        const {Http} = Plugins;

     const {data,error} =  await Http.request({
            method: 'GET',
            url: 'https://api.company-information.service.gov.uk/company/00041424',
            headers: {
                "Access-Control-Allow-Origin": "*",
                Authorization: "Basic " + btoa("7b95b973-dc26-42f7-b003-9a86d70cdff3:")
            },

        });
     console.log(data);
         if (data) {
             setCompanyName(data);
             setShowLoading(false);

         }
         if (error) {
             setShowLoading(false);
             setShowAlert(true)

         };


    }

    return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar  >
            <IonButtons  slot="start">
                <IonBackButton defaultHref={'./personal-details'} color='dark'  text=''/>
            </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>


          <div className={'ion-text-center '}>

        <h2>Company Details</h2>

          </div>

          <div className={'ion-text-center ion-padding'}>
              <IonText>
                  Please provide your company details to progress
              </IonText>

          </div>

          <div>
              <IonItem color={'none'} lines={'none'}>
                  <IonLabel position={'stacked'} >Company number</IonLabel>
                  <IonInput  type='number' className={'input'} value={companyNumber} onIonChange={e => setCompanyNumber(e.detail.value)}  />
              </IonItem>
          </div>


              <div className={'ion-padding'}>
                  <IonButton  onClick={e => {
                      e.preventDefault();
                      fetchCompany()
                  }} disabled={!companyNumber}  className={'find'} expand={'block'}>

                      Find my company
                  </IonButton>
          </div>

          <div className='ion-padding'>

              <div className='ion-text-center'> <IonLabel   >Company details</IonLabel></div>
                      <p   className='ion-margin-top'  >{companyName?.company_name}<br/>
                     {companyName?.registered_office_address?.address_line_1}
                      {companyName?.registered_office_address?.address_line_2}<br/>
                          {companyName?.registered_office_address?.locality}<br/>
                      {companyName?.registered_office_address?.country}</p>





          </div>

{/*<div>*/}
{/*          <div className={'ion-padding'}>*/}
{/*              <IonIcon className={'ion-margin-top'} slot={'start'} icon={caretForward} />*/}
{/*              <IonLabel>Enter manually</IonLabel>*/}
{/*              <IonItem color={'none'} lines={'none'}>*/}
{/*                  <IonLabel position={'stacked'} >Company Name</IonLabel>*/}
{/*                  <IonInput  value={companyAddress} onIonChange={y => setCompanyAddress(y.detail.value!)}  className={'input'}  />*/}
{/*              </IonItem>*/}
{/*          </div>*/}
{/*      </div>*/}

        <div className={'ion-padding'}>
            <IonButton disabled={!companyNumber || !companyName}    onClick={e => {
                e.preventDefault();
               nav()
            }} className={'next'} expand={'block'}>

               Next
            </IonButton>
        </div>
      </IonContent>

        <IonLoading
        cssClass='my-custom-class'
        isOpen={showLoading}
        duration={5000}
        onDidDismiss={() => setShowLoading(false)}
        message={'Please wait...'}

    />

        <IonAlert
            cssClass='my-custom-class'
            isOpen={showAlert}
            header='Error'
            buttons={[
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {

                    }
                }]}
            onDidDismiss={() => setShowAlert(false)}
            message={'Sorry your company has not been found'}

        />
    </IonPage>
  );
};

