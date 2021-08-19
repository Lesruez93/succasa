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
    IonLabel, IonLoading,
    IonPage,
    IonText,
    IonToolbar,
    useIonViewWillEnter
} from '@ionic/react';
import './my-documents.css';
import {checkmarkCircle} from "ionicons/icons";
import {getApiRequest} from "../../api";


export default function  MyDocuments (props:any)  {
    const [showLoading, setShowLoading] = useState(true);
    const [array,setArray] = useState<any>([]);

    useIonViewWillEnter(()=>{
        try {
            setArray(JSON.parse(localStorage.documents));
            setShowLoading(false);
            getDocuments()

        }
        catch (e) {
            getDocuments()
        }

    });

    function navGas() {
        props.history.push({
            pathname:'/add-document',
            state:{document:"Gas safety certificate",
                id:"2",
                url:"./my-documents"
            }
        })
    }


    function getDocuments(){
        getApiRequest(`properties/${localStorage.getItem('property_id')}?include=documents.documenttype`)
            .then((res:any)=>{
                let ids:any = [];
                setShowLoading(false);
                try {

                    for (let d of res.data.included) {

                        if (d.type === "documenttypes") {
                            console.log(d.id);
                            ids.push(d.id)

                        }
                    }
                    setArray(ids);
                    localStorage.setItem('documents',JSON.stringify(ids));
                }catch (e) {

                }
            })

    }

    function include(value:any) {

        return array.includes(value)
    }

    function navInsuarance() {
        props.history.push({
        pathname:'/add-document',
            state:{document:"Insurance certificate",
            id:"3",
            url:"./my-documents"
        }
    })
    }

    return (
        <IonPage>
            <IonHeader className="ion-no-border">
                <IonToolbar  >
                    <IonButtons slot="start">
                        <IonBackButton defaultHref={'./manage-property'} color='dark'  text=''/>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>

                <div className={'ion-text-center '}>

                    <h2>My documents</h2>

                </div>
                <div className={'ion-text-center ion-padding'}>
                    <IonText>
                        To give full transparency to your tenants, you can add your property regulation documents here.
                    </IonText>

                </div>
                <div className={'ion-margin-top ion-padding'}>




                    <IonCard className={'ion-padding-left '}>
                        <IonItem onClick={e=>{
                            props.history.push({
                                pathname:'/add-epc',
                                state:{document:"EPC",
                                    id:"1",
                                    url:"./my-documents"
                                }
                            })
                        }} color={'none'} lines={'none'}>
                            <IonLabel> <div>
                                <h2>EPC</h2>
                                <p>Please upload document</p>
                                
                            </div></IonLabel>
                            <IonButton hidden={include('1')}  slot='end'  size='small'  color='medium'>
                                Continue
                            </IonButton>
                            <IonIcon hidden={!include('1')} icon={checkmarkCircle} color="success" size={'large'} slot="end"/>
                        </IonItem>
                    </IonCard>
                    <IonCard className={'ion-padding-left '}>
                        <IonItem
                            onClick={e=>{
                                e.preventDefault();
                              navGas()
                            }}
                            color={'none'} lines={'none'}>
                            <IonLabel> <div>
                                <h2>Gas safety certificate</h2>
                                <p>Please upload document</p>

                            </div></IonLabel>
                            <IonButton hidden={include('2')}  slot='end'  size='small'  color='medium'>
                                Continue
                            </IonButton>
                            <IonIcon hidden={!include('2')} icon={checkmarkCircle} color="success" size={'large'} slot="end"/>

                        </IonItem>
                    </IonCard>
             
                    <IonCard className={'ion-padding-left '}>
                        <IonItem onClick={e=>{
                            e.preventDefault();
                            navInsuarance()
                        }} color={'none'} lines={'none'}>
                            <IonLabel> <div>
                                <h2>Insurance certificate</h2>
                                <p>Please upload document</p>

                            </div></IonLabel>
                            <IonButton hidden={include('3')} slot='end'  size='small'  color='medium'>
                                Continue
                            </IonButton>
                            <IonIcon hidden={!include('3')} icon={checkmarkCircle} color="success" size={'large'} slot="end"/>

                        </IonItem>
                    </IonCard>

                    <IonButton hidden  className={'next'} expand={'block'}>

                        Next
                    </IonButton>


                </div>
                <IonLoading
                    cssClass='my-custom-class'
                    isOpen={showLoading}
                    onDidDismiss={() => setShowLoading(false)}
                    message={'Loading...'}

                />
            </IonContent>
        </IonPage>
    );
};

