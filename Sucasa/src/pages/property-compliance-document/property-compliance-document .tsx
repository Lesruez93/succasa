import React from 'react';
import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonCard,
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonPage,
    IonText, IonTitle,
    IonToolbar
} from '@ionic/react';
import firebase from "firebase";


export default function  PropertyComplianceDocument (props:any) {

    const db =firebase.firestore();

    function nav() {
        const id:any = localStorage.getItem('property_id');
        db.collection('properties').doc(id).update({compliance:true}).then();
        props.history.replace('./manage-property')


    }

    return (
    <IonPage>
        <IonHeader >
            <IonToolbar color='medium'  >
                <IonButtons slot="start">
                    <IonBackButton color='light' defaultHref={'./compliance'}  text=''/>
                </IonButtons>
                <IonTitle>
                    Property Compliance
                </IonTitle>

            </IonToolbar>
        </IonHeader>
        <IonContent >


            <div className={'ion-text-center ion-padding'}>
                <IonText>
                    Add Property Compliance Document
                </IonText>

            </div>

          <IonCard className={'ion-padding'}>
            <IonItem onClick={e=>{
                e.preventDefault();
                props.history.push({
                    pathname:'/exemption-toggle',
                    state:{document:"EPC",
                            id:"1",
                            url:"./property-compliance-document"
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
                        pathname:'/gas-exemption',
                        state:{document:"Gas safety certificate",
                            id:"2",
                            url:"./property-compliance-document"
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
                        state:{document:"Electrical Installation Condition Report",
                            id:"3",
                            url:"./property-compliance-document"
                        }
                    })
                }} color={'none'} detail={true} lines={'none'}>
                    <IonLabel> <div>
                        <h3>Electrical Installation Condition Report</h3>
                        <p>Document not uploaded</p>
                    </div></IonLabel>


                </IonItem>
            </IonCard>


            <IonCard className={'ion-padding'}>
                <IonItem onClick={e=>{
                    e.preventDefault();
                    props.history.push({
                        pathname:'/add-document',
                        state:{document:"Portable Appliance Testing",
                            id:"4",
                            url:"./property-compliance-document"
                        }
                    })
                }} color={'none'} detail={true} lines={'none'}>
                    <IonLabel> <div>
                        <h2>Portable Appliance Testing</h2>
                        <p>Document not uploaded</p>
                    </div></IonLabel>
                </IonItem>
            </IonCard>


            <IonCard className={'ion-padding'}>
                <IonItem onClick={e=>{
                    e.preventDefault();
                    props.history.push({
                        pathname:'/add-document',
                        state:{document:"House of Multiple Occupancy License",
                            id:"5",
                            url:"./property-compliance-document"
                        }
                    })
                }} color={'none'} detail={true} lines={'none'}>
                    <IonLabel> <div>
                        <h3>House of Multiple Occupancy License</h3>
                        <p>Document not uploaded</p>
                    </div></IonLabel>
                </IonItem>
            </IonCard>


            <IonCard className={'ion-padding'}>
                <IonItem onClick={e=>{
                    e.preventDefault();
                    props.history.push({
                        pathname:'/add-document',
                        state:{document:"Selective License",
                            id:"6",
                            url:"./property-compliance-document"
                        }
                    })
                }} color={'none'} detail={true} lines={'none'}>
                    <IonLabel> <div>
                        <h2>Selective License</h2>
                        <p>Document not uploaded</p>
                    </div></IonLabel>
                </IonItem>
            </IonCard>

          <div className='ion-padding' >
              <IonButton    onClick={e => {
                e.preventDefault();
               nav()
            }} className='next smaller' expand={'block'}>
                Im, Finished
            </IonButton>
          </div>
      </IonContent>
    </IonPage>
  );
};


