import React, {useState} from 'react';
import {
    IonAvatar,
    IonButton,
    IonButtons,
    IonContent,
    IonIcon,
    IonItem,
    IonLabel,
    IonPage,
    IonToolbar
} from '@ionic/react';
import './profile.css';
import {camera, settingsOutline} from "ionicons/icons";
import {getApiRequest} from "../../api";


export default function Profile() {
const  [profile,setProfile] = useState<any>(null);

    getApiRequest('auth/user').then((resp:any)=> {
            setProfile(resp.data)

    });
    return (
    <IonPage>

        <IonToolbar color='medium' >
            <IonButtons slot="end">
                <IonIcon color='light' size={'large'}  icon={settingsOutline}/>
            </IonButtons>
        </IonToolbar>

      <IonContent fullscreen>
          <div className={'vertical-center'}>
              <IonAvatar className={'avatar'}>
                  <IonIcon size={'large'} icon={camera}/>
              </IonAvatar>
          </div>
<div className={'ion-text-center'}>


    <h2>{profile?.name}</h2>
    <IonButton size={'small'} color={'medium'} fill={'solid'}>
        {profile?.user_type}
    </IonButton>

</div>

<div className={'ion-padding'}>
          <IonItem  className={'ion-margin-bottom'} color={'none'}  >
              <IonLabel><strong>My Details</strong>
              </IonLabel>
              <IonButton color='medium' className={'editButton'} fill='clear'>Edit</IonButton>
          </IonItem>

    <IonItem className={'ion-margin-top'} detail={true} color={'none'}  >
        <IonLabel><strong>My settings</strong>
        </IonLabel>
    </IonItem>
</div>
      </IonContent>

        <div className={'ion-text-center'}>
            <IonButton className={'editButton ion-margin-bottom'} color={'dark'} fill='clear'>Log out</IonButton>

        </div>
    </IonPage>
  );
};


