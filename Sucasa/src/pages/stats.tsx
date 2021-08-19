import React, {useEffect, useState} from 'react';
import {
    IonBackButton, IonBadge,
    IonButtons,
    IonCol,
    IonContent,
    IonHeader, IonItem, IonLabel,
    IonPage,
    IonRow,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import useSWR from "swr";
import {fetcher, fetcherOption} from "../api";


export default function  Stats (props:any) {

    const { data, error } = useSWR('stats', fetcher,fetcherOption);

    useEffect(()=>{
        // getApiRequest('properties/'+localStorage.getItem('property_id')).then((res:any)=>{
        //     setProperty(res.data.data.attributes)
        // },err=>{
        //
        // })
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
                        My Stats
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent  className='ion-padding'>
            <IonItem>
                <IonLabel>
                    Landlord Rating
                </IonLabel>

                <IonBadge slot='end'>{data?.data?.attributes?.rating?.toFixed()}</IonBadge>
            </IonItem>
                <IonItem>
                    <IonLabel>
                        Total property listings
                    </IonLabel>

                    <IonBadge slot='end'>{data?.data?.attributes?.properties_count}</IonBadge>
                </IonItem>
                <IonItem>
                <IonLabel>
                    Occupied property listings
                </IonLabel>

                <IonBadge slot='end'>{data?.data?.attributes?.occupied_properties}</IonBadge>
            </IonItem>
                <IonItem>
                <IonLabel>
                    Advertised property listings
                </IonLabel>

                <IonBadge slot='end'>{data?.data?.attributes?.advertized_properties}</IonBadge>
            </IonItem>
                <IonItem>
                <IonLabel>
                    Total tenants
                </IonLabel>

                <IonBadge slot='end'>{data?.data?.attributes?.tenancy}</IonBadge>
            </IonItem>
                 <IonItem>
                <IonLabel>
                    Monthly rent roll
                </IonLabel>

                <IonBadge slot='end'>{data?.data?.attributes?.monthly_rental_roll}</IonBadge>
            </IonItem>

                <IonItem>
                    <IonLabel>
                        Total rent collected

                    </IonLabel>

                    <IonBadge slot='end'>{data?.data?.attributes?.total_rental_collected}</IonBadge>
                </IonItem>
            </IonContent>
        </IonPage>
    );
};


