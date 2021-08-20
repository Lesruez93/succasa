import React, {useEffect, useState} from 'react';
import {
    IonBackButton,
    IonBadge,
    IonButtons,
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonPage,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import './property-overview.css';
import {getApiRequest} from "../../api";


export default function  PropertySummary (props:any) {
    let data = props.location.state;

    const [property,setProperty] = useState<any>({});

    useEffect(()=>{
        getApiRequest('properties/'+localStorage.getItem('property_id')).then((res:any)=>{
            setProperty(res.data.data.attributes)
        },err=>{

        })
    },[]);
    function nav() {
        props.history.push('/profile');

    }

    return (
        <IonPage>
            <IonHeader >
                <IonToolbar color='medium'  >
                    <IonButtons slot="start">
                        <IonBackButton defaultHref={'/property-profile'} color='light'  text=''/>
                    </IonButtons>
                    <IonTitle>
                        Property Description
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent  className='ion-padding'>
                <IonItem>
                    <IonLabel>
                        Property Address:

                    </IonLabel>

                    <IonBadge slot='end'> {property?.street_address}</IonBadge>
                </IonItem>
                <IonItem>
                    <IonLabel>
                        Property Type

                    </IonLabel>

                    <IonBadge slot='end' hidden={property?.is_private === 1}>Shared</IonBadge>
                    <IonBadge slot='end'  hidden={property?.is_private !== 1}>Private</IonBadge>
                </IonItem>

                <IonItem>
                    <IonLabel>
                        Bedrooms

                    </IonLabel>

                    <IonBadge slot='end'>  {property?.number_of_bedrooms}</IonBadge>
                </IonItem>


                <IonItem>
                    <IonLabel>
                        Bathrooms
                    </IonLabel>

                    <IonBadge slot='end'>{property?.number_of_bathrooms}
                    </IonBadge>
                </IonItem>


                <IonItem>
                    <IonLabel>Furnished:
                    </IonLabel>

                    <IonBadge slot='end'>{property?.furnished}
                    </IonBadge>
                </IonItem>

                <IonItem>
                    <IonLabel>Available from
                    </IonLabel>

                    <IonBadge slot='end'>{property?.ealiest_available_date}
                    </IonBadge>
                </IonItem>

                <IonItem>
                    <IonLabel>Rent is:
                    </IonLabel>

                    <IonBadge slot='end'>{property?.rent}
                    </IonBadge>
                </IonItem>

                <IonItem>
                    <IonLabel>Bill included are
                    </IonLabel>

                    <IonBadge slot='end'>bills
                    </IonBadge>
                </IonItem>

                <IonItem>
                    <IonLabel>Compliance Information
                    </IonLabel>

                    <IonBadge slot='end'>
                    </IonBadge>
                </IonItem>

                <IonItem>
                    <IonLabel>Documents included
                    </IonLabel>

                    <IonBadge slot='end'>EPC
                    </IonBadge>
                </IonItem>





            </IonContent>
        </IonPage>
    );
};


