import React, {useEffect, useState} from 'react';
import {
    IonAvatar,
    IonBackButton,
    IonButtons,
    IonCard,
    IonContent,
    IonHeader,
    IonImg,
    IonItem,
    IonLabel,
    IonPage,
    IonTitle,
    IonToolbar
} from '@ionic/react';

export default function Tenants  (props:any)  {


    const [tenants,setTenants]= useState<any>(['Lester']);
    let ar = [1,2];

    useEffect(() => {


    }, []);


  return (
    <IonPage>
        <IonHeader className="ion-no-border">
            <IonToolbar color='medium'  >
                <IonTitle>
                 Tenants
                </IonTitle>
                <IonButtons slot="start">
                    <IonBackButton defaultHref={'/tenant-added'} color='light'  text=''/>
                </IonButtons>
            </IonToolbar></IonHeader>
      <IonContent fullscreen>

          {tenants.map((msg:any)=>(
            <IonCard routerLink={'/tenancies'} key={msg} onClick={()=>{

            }} className="ion-padding">

                    <IonItem  lines='none' >
                        {ar.map((i:any)=>(
                    <IonAvatar className='-margin-left' key={i} slot="start">
                 <IonImg src={'./assets/img/pic.png'}/>
                    </IonAvatar>
                        ))
                        }
                  <IonLabel>
                      <h3>{msg}</h3>
                      <p> Property</p>
                  </IonLabel>

              </IonItem>
            </IonCard>
          ))
          }

          <div>

          </div>

      </IonContent>
    </IonPage>
  );
};

