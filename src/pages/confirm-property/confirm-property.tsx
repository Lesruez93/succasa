import React, {useState} from 'react';
import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonCard,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonLoading,
    IonPage,
    IonTitle,
    IonToast,
    IonToolbar
} from '@ionic/react';
import './confirm-property.css';
import {
    cameraOutline,
    clipboardSharp,
    cloudUploadOutline,
    documentOutline,
    documentTextOutline,
    settingsOutline
} from "ionicons/icons";
import {fetcher, fetcherOption, getApiRequest} from "../../api";
import useSWR from "swr";
import Slides from "../../components/ExploreContainer";
import Dataset from "../../components/dataset";
import {PropertyIdStore} from "../../Store/UserStore";

export default function  ConfirmProperty(props:any)  {
    const [showToast, setShowToast] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const [message, setMessage] = useState<any>(null);
    const [image, setImages] = useState<any>(null);
    const [color, setColor] = useState<any>(null);
    const propertyId:any = PropertyIdStore.useState(s => s.propertyId);

    const { data, error } = useSWR('properties/'+ propertyId, fetcher,fetcherOption);


    const [showAlert, setShowAlert] = useState<boolean>(false);





    function navGas() {
        props.history.push({
            pathname:'/add-document',
            state:{document:"Gas safety certificate",
                id:"2",
                url:"./confirm-property"
            }
        })
    }


    function navEPC() {
        props.history.push({
            pathname:'/add-epc',
            state:{document:"EPC",
                id:"1",
                url:"./confirm-property"
            }
        })
    }


    function navInsuarance() {
        props.history.push({
            pathname:'/add-document',
            state:{document:"EICR certificate",
                id:"3",
                url:"./confirm-property"
            }
        })
    }

    function navPat() {
        props.history.push({
            pathname:'/add-document',
            state:{document:"PAT certificate",
                id:"4",
                url:"./confirm-property"
            }
        })
    }

    function submitData() {
            setShowLoading(true);
            getApiRequest(`properties/${propertyId}/advertise`).then(() => {
                setShowLoading(false);
                props.history.push('./advertised')

            }).catch(() => {
                alert('Failed please try again');
                setShowLoading(false)
            });
        }

    return (
    <IonPage>
        <IonHeader className="ion-no-border">
            <IonToolbar color='medium' >
                <IonButtons slot="start">
                    <IonBackButton  color='dark'  text=''/>
                </IonButtons>
                <IonTitle>Confirm Property</IonTitle>
                <IonButtons slot="end">
                    <IonIcon className='icon-large' color='light' size={'medium'}  icon={settingsOutline}/>
                </IonButtons>
            </IonToolbar>
        </IonHeader>


      <IonContent fullscreen>
         <Slides  id={propertyId}/>
          <IonItem lines='none'>
              <div slot='start'>
                  <h2><strong>
                      £{data?.data?.attributes?.rent} pcm
                  </strong>
                  </h2>
              </div>
              <IonLabel className='ion-margin-top' color='medium'>
                  Tenancy info
              </IonLabel>
                <IonIcon  onClick={e=>{
                    e.preventDefault();
                    props.history.push('./add-property-upload');
                }} slot='end' icon={cloudUploadOutline}/>
          </IonItem>
          <div className='ion-padding'>
              <IonLabel>
              <strong>{data?.data?.attributes?.number_of_bedrooms} bed flat        </strong>

          </IonLabel>
              <IonLabel>
                  <strong>{data?.data?.attributes?.number_of_bathrooms} bathroom     </strong>
              </IonLabel>
              <IonLabel>
              <strong>{data?.data?.attributes?.furnished}  </strong>
          </IonLabel>

              <p>
                  {data?.data?.attributes?.street_address}
              </p>
          </div>
          <div className='ion-padding'>
              <p>
                  Date available: {data?.data?.attributes?.ealiest_available_date}
              </p>

              <p>
                  Tenancy terms: {data?.data?.attributes?.tenancy_term}
              </p>

              <p>Tenancy length: {data?.data?.attributes?.renewal_terms}</p>
          </div>

          <IonCard >
              <IonItem color={'none'} detail={true} lines={'none'}>
                  <IonIcon icon={clipboardSharp}/>
                  <IonLabel  className='ion-margin-start'> Full description</IonLabel>
              </IonItem>
          </IonCard>


          <IonCard >
              <IonItem onClick={e=>{
                  e.preventDefault();
                  props.history.push('./property-photos');
              }} color={'none'} detail={true} lines={'none'}>
                  <IonIcon icon={cameraOutline}/>
                  <IonLabel  className='ion-margin-start'> Photos({Dataset(propertyId)?.data?.length})</IonLabel>
              </IonItem>
          </IonCard>

          <IonCard >
              <IonItem onClick={e=>{
                  e.preventDefault();
                    navEPC()
              }}

                       color={'none'} detail={true} lines={'none'}>
                  <IonIcon icon={documentTextOutline}/>
                  <IonLabel className='ion-margin-start'>EPCs ()</IonLabel>
              </IonItem>
          </IonCard>

          <IonCard >
              <IonItem
                  onClick={e=>{
                      e.preventDefault();

                      navGas()
                  }}
                  color={'none'} detail={true} lines={'none'}>
                  <IonIcon icon={documentOutline}/>
                  <IonLabel  className='ion-margin-start'>Gas safety certificate</IonLabel>
              </IonItem>
          </IonCard>
          <IonCard >
              <IonItem onClick={e=>{
                  e.preventDefault();

                 navInsuarance()
              }}
                  color={'none'} detail={true} lines={'none'}>
                  <IonIcon icon={documentOutline}/>
                  <IonLabel  className='ion-margin-start'>EICR certificate</IonLabel>
              </IonItem>
          </IonCard>

          <IonCard >
              <IonItem onClick={e=>{
                  e.preventDefault();

                  navPat()
              }}
                       color={'none'} detail={true} lines={'none'}>
                  <IonIcon icon={documentOutline}/>
                  <IonLabel  className='ion-margin-start'>PAT certificate</IonLabel>
              </IonItem>
          </IonCard>

          <div className='ion-padding bg'>
          <IonButton onClick={()=>{
              submitData()
          }}  color='light' className=' ion-margin-bottom' expand={'block'}>

              Confirm property now
          </IonButton>
      </div>
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
      </IonContent>

    </IonPage>
  );
};

