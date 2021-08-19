import React, {useState} from 'react';
import {
    IonAvatar,
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonLoading,
    IonPage,
    IonTitle,
    IonToast,
    IonToolbar
} from '@ionic/react';
import {fetcher, fetcherOption, getApiRequest, postData, toast} from "../../api";
import useSWR from "swr";
import Slides from "../../components/ExploreContainer";
import Avatar from "../../components/Avatar";
import moment from 'moment';
import {PropertyIdStore, UserStore} from "../../Store/UserStore";


export default function  PropertyAdvert(props:any)  {
    const [showToast, setShowToast] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const [message, setMessage] = useState<any>(null);
    const [color, setColor] = useState<any>(null);
    const propertyId:any = PropertyIdStore.useState(s => s.propertyId);
    const user:any = UserStore.useState(s => s.user);
    const [listing,setListing]= useState<boolean>(false);

    const { data, error } = useSWR('properties/'+ propertyId+'?include=user.landlord', fetcher,fetcherOption);


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
            postData({
                property_id:propertyId,
                user_id:user.id
            },`saved-properties`).then(() => {
                setShowLoading(false);
                setListing(true)
                toast('Property saved to listing successfully ');

            }).catch(() => {
                toast('Failed please try again');
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
                <IonTitle>Property Details</IonTitle>

            </IonToolbar>
        </IonHeader>


      <IonContent fullscreen>
         <Slides  id={propertyId}/>
          <IonItem lines='none'>
              <div slot='start'>
                  <p>
                      {data?.data?.attributes?.address}

                  </p>
              </div>

          </IonItem>
          <div className='ion-padding'>
              <IonLabel>
              <strong>{data?.data?.attributes?.number_of_bedrooms} Bed flat   --    </strong>

          </IonLabel>
              <IonLabel>
                  <strong>{data?.data?.attributes?.number_of_bathrooms} Bathroom   ---   </strong>
              </IonLabel>
              <IonLabel>
              <strong>{data?.data?.attributes?.furnished}      </strong>
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

          <IonItem routerLink={'landlord-card/11'}>
              <IonAvatar slot='start'>
                  <Avatar id={data?.included[0]?.attributes?.profile_photo_path}/>
              </IonAvatar>
              <IonLabel>
                  <h3>{data?.included[0]?.attributes?.name}</h3>
                  <p>Verified</p>
                  <p>Joined: {moment(data?.included[0]?.attributes?.createdAt).format("DD/MM/YYYY")}</p>
              </IonLabel>
          </IonItem>

          <div className='ion-padding '>
          <IonButton disabled={listing} onClick={()=>{
              submitData()
          }}   color='dark' fill='outline' className=' ion-margin-bottom' expand={'block'}>

              Save Listing
          </IonButton>

              <IonButton onClick={()=>{
                  submitData()
              }}  color='dark' fill='outline' className=' ion-margin-bottom' expand={'block'}>

                  Request viewing
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

