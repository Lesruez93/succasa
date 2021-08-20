import React, {useEffect, useState} from 'react';
import {
    IonAvatar,
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonImg,
    IonItem,
    IonLabel,
    IonPage,
    IonTitle,
    IonToolbar
} from '@ionic/react';

export default function TenantsCard  (props:any)  {


    const [tenants,setTenants]= useState<any>(['Mr Lester', 'Mr Simba']);
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
                    <IonBackButton defaultHref={'/tenants'} color='light'  text=''/>
                </IonButtons>
            </IonToolbar>
        </IonHeader>
      <IonContent>
          <div className={'ion-text-center'}>


              <h2>Tenancy Details</h2>
          </div>

          <div className='vertical-center ion-margin-top' >
                {ar.map((i:any)=>(

                <IonAvatar key={i} >
                <IonImg src={'./assets/img/pic.png'}/>
                </IonAvatar>

                ))
                }
        </div>
          <div className='ion-margin-top'>
              <IonItem lines='full'>
                  <IonLabel slot='start'>
                      <h2>Tenants</h2>
              </IonLabel>

                      <IonLabel  >
                          {tenants.map((t:any)=>(
                              <h2 className='ln' key={t}>
                      {t }
                          </h2> ))
                          }
                      </IonLabel>



              </IonItem>


              <IonItem lines='full'>
                  <IonLabel slot='start'>
                      <h2>Property</h2>
                  </IonLabel>

                      <p>
                          12 High Street
                          Erdington
                          Birmingham
                          B23 7JJ
                      </p>

              </IonItem>

              <IonItem lines='full'>
                  <IonLabel slot='start'>
                      <h2>Tenancy start date</h2>
                  </IonLabel>

                  <p>
                     01/12/2020

                  </p>

              </IonItem>

              <IonItem lines='full'>
                  <IonLabel slot='start'>
                      <h2>Tenancy term</h2>
                  </IonLabel>

                  <p>
                    6 months

                  </p>

              </IonItem>

              <IonItem lines='full'>
                  <IonLabel slot='start'>
                      <h2>Tenancy end date</h2>
                  </IonLabel>

                  <p>
                    30/01/2021

                  </p>

              </IonItem>

              <IonItem lines='full'>
                  <IonLabel slot='start'>
                      <h2>Monthly rent</h2>
                  </IonLabel>

                  <p>
                      $100

                  </p>

              </IonItem>

              <IonItem lines='full'>
                  <IonLabel slot='start'>
                      <h2>Deposit paid</h2>
                  </IonLabel>

                  <p>
                      $50

                  </p>

              </IonItem>

              <IonItem lines='full'>
              <IonLabel slot='start'>
                  <h2>Deposit protection reference</h2>
              </IonLabel>

              <p>
                 4566yf

              </p>

          </IonItem>

              <IonItem lines='full'>
                  <IonLabel slot='start'>
                      <h2>View agreement</h2>
                  </IonLabel>

                  <p>
                    no agreement
                  </p>

              </IonItem>
          </div>
          <div className='ion-padding'>
          <IonButton   className={'next'} expand={'block'}>

              Arrange appointment
          </IonButton>


          <IonButton   className={'next'} expand={'block'}>

              Amend tenancy
          </IonButton>

          </div>
      </IonContent>
    </IonPage>
  );
};

