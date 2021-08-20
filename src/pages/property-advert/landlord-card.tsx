import React from 'react';
import {
    IonAvatar,
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonIcon,
    IonPage,
    IonTitle,
    IonToolbar
} from '@ionic/react';


import {chatbubbleOutline} from "ionicons/icons";
import useSWR from "swr";
import {fetcher, fetcherOption} from "../../api";
import Avatar from "../../components/Avatar";
import moment from 'moment';

export default function LandlordCard (props:any)  {
console.log(props.match.params.id);
    const { data, error } = useSWR('users/'+props.match.params.id, fetcher,fetcherOption);

    return (
        <IonPage>

            <IonToolbar color='medium' >

                <IonButtons slot="start">
                    <IonBackButton defaultHref={'./tabs/dashboard'} color='light'  text=''/>
                </IonButtons>
                <IonTitle>
                    My Profile
                </IonTitle>
            </IonToolbar>

            <IonContent fullscreen>
                <div className='vertical-center ion-margin-top'  >

                    <IonAvatar  className='avatar'>
                        <Avatar id={data?.data?.attributes?.profile_photo_path}/>
                    </IonAvatar>

                </div>
                <div className={'ion-text-center'}>
                    <h2>{data?.data?.attributes?.name}</h2>
                    <h5>Verified</h5>
                    <p>Rating</p>
                    <p>Joined: {moment(data?.data?.attributes?.createdAt).format("DD/MM/YYYY")}</p>
                    <IonButton  onClick={()=>{
                    }} size={'small'} color={'medium'} fill='outline'>
                        Chat<IonIcon slot='end' icon={chatbubbleOutline}/>
                    </IonButton>

                </div>
            </IonContent>.....
        </IonPage>
    );
};


