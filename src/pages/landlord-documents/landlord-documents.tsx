import React from 'react';
import {
    IonBackButton,
    IonButtons,
    IonCard,
    IonContent,
    IonHeader, IonIcon,
    IonItem,
    IonLabel,
    IonPage,
    IonText,
    IonToolbar
} from '@ionic/react';
import './landlord-documents.css';
import {settingsOutline} from "ionicons/icons";


export default function  LandLordDocuments (props:any) {

    function nav() {
        props.history.push('/profile');

    }

    return (
    <IonPage>
        <IonHeader className="ion-no-border">
            <IonToolbar className={'ion-margin-top'}  >
                <IonButtons slot="start">
                    <IonBackButton color='dark'  text=''/>
                </IonButtons>

                <IonButtons onClick={e => {
                    e.preventDefault();
                    nav();
                }} slot="end">
                    <IonIcon color='dark' size={'large'}  icon={settingsOutline}/>
                </IonButtons>
            </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>

            <div className={'ion-text-center '}>

                <h2>Landlord Documents</h2>

            </div>
            <div className={'ion-text-center ion-padding'}>
                <IonText>
                    When you upload these documents your tenants will be able to see.
                </IonText>

            </div>

          <IonCard className={'ion-padding'}>
            <IonItem onClick={e=>{
                e.preventDefault();
                props.history.push({
                    pathname:'/add-document',
                    state:{document:"EPC",
                            id:"1",
                            url:"./landlord-documents"
                    }
                })
            }} color={'none'} detail={true} lines={'none'}>
                <IonLabel> <div>
                    <h2>EPC</h2>
                    <p>Document not uploaded</p>
                </div></IonLabel>
            </IonItem>
        </IonCard>


            <IonCard className={'ion-padding'}>
                <IonItem onClick={e=>{
                    e.preventDefault();
                    props.history.push({
                        pathname:'/add-document',
                        state:{document:"Gas safety certificate",
                            id:"2",
                            url:"./landlord-documents"
                        }
                    })
                }} color={'none'} detail={true} lines={'none'}>
                    <IonLabel> <div>
                        <h2>Gas safety certificate</h2>
                        <p>Document not uploaded</p>
                    </div></IonLabel>
                </IonItem>
            </IonCard>


            <IonCard className={'ion-padding'}>
                <IonItem onClick={e=>{
                    e.preventDefault();
                    props.history.push({
                        pathname:'/add-document',
                        state:{document:"Insurance certificate",
                            id:"3",
                            url:"./landlord-documents"
                        }
                    })
                }} color={'none'} detail={true} lines={'none'}>
                    <IonLabel> <div>
                        <h2>Insurance certificate</h2>
                        <p>Document not uploaded</p>
                    </div></IonLabel>


                </IonItem>
            </IonCard>


            <IonCard className={'ion-padding'}>
                <IonItem onClick={e=>{
                    e.preventDefault();
                    props.history.push({
                        pathname:'/add-document',
                        state:{document:"How to rent checklist",
                            id:"4",
                            url:"./landlord-documents"
                        }
                    })
                }} color={'none'} detail={true} lines={'none'}>
                    <IonLabel> <div>
                        <h2>How to rent checklist</h2>
                        <p>Document not uploaded</p>
                    </div></IonLabel>
                </IonItem>
            </IonCard>
<div>

</div>
      </IonContent>
    </IonPage>
  );
};


