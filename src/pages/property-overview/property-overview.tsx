import React, {useState} from 'react';
import {
    IonAlert,
    IonBackButton,
    IonButton,
    IonButtons,
    IonCard,
    IonContent,
    IonHeader,
    IonItem,
    IonLabel, IonLoading,
    IonPage, IonTitle,
    IonToolbar,
    useIonViewWillEnter
} from '@ionic/react';
import './property-overview.css';
import {getApiRequest, postData} from "../../api";
import {PropertyIdStore} from "../../Store/UserStore";


export default function  PropertyOverview (props:any) {
    let data = props.location.state;

    const [property,setProperty] = useState<any>({});
    const [showLoading, setShowLoading] = useState(false);
    const [showAlert, setShowAlert] = useState<any>(false);
    const propertyId = PropertyIdStore.useState(s => s.propertyId);

    useIonViewWillEnter(()=>{
        getApiRequest('properties/'+property).then((res:any)=>{
            setProperty(res.data.data.attributes)
        },err=>{

        })
    });
    function nav() {
        props.history.push('/profile');

    }

    function advertise() {
        setShowLoading(true);
        postData({},'properties/'+propertyId+'/advertise').then(()=>{
            setShowAlert(true);
            setShowLoading(false)
        }).catch(()=>{
            setShowLoading(false)
        })
    }

    return (
        <IonPage>
            <IonHeader >
                <IonToolbar  color="secondary">
                    <IonButtons slot="start">
                        <IonBackButton defaultHref={'/property-profile'} color='light'  text=''/>
                    </IonButtons>
                    <IonTitle>Property Overview</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>

                <div className={'ion-text-center '}>




                </div>

                <IonCard>
                    <IonItem  color={'none'} detail={false} lines={'none'}>
                        <IonLabel>
                            <h2>Property Address</h2>
                            <p>{property?.street_address}</p>

                        </IonLabel>

                        <IonButton onClick={e=>{
                            e.preventDefault();
                            props.history.push({
                                pathname:'/property-address-edit',

                            })
                        }} color={'secondary'} className="ion-margin-top" fill={'clear'} slot={'end'} size={'large' }>
                            Edit
                        </IonButton>
                    </IonItem>
                </IonCard>
                <IonCard>
                    <IonItem  color={'none'} detail={false} lines={'none'}>
                        <IonLabel>
                            <h2>Type of Property</h2>
                            <p>{property?.property_type}</p>
                            <p hidden={property?.is_private === 1}>Shared</p>
                            <p hidden={property?.is_private !== 1}>Private</p>



                        </IonLabel>

                        <IonButton onClick={e=>{
                            e.preventDefault();
                            props.history.push({
                                pathname:'/property-type-edit',

                            })
                        }} color={'secondary'} fill={'clear'} slot={'end'} size={'large' }>
                            Edit
                        </IonButton>
                    </IonItem>
                </IonCard>
                <IonCard>
                    <IonItem  color={'none'} detail={false} lines={'none'}>
                        <IonLabel>
                            <h2>Property Information</h2>
                            <p>{property?.number_of_bedrooms} Bedrooms</p>
                            <p>{property?.number_of_bathrooms} Bathrooms</p>
                            <p>{property?.furnished}</p>

                        </IonLabel>

                        <IonButton onClick={e=>{
                            e.preventDefault();
                            props.history.push({
                                pathname:'/property-info',

                            })
                        }} color={'secondary'} fill={'clear'} slot={'end'} size={'large' }>
                            Edit
                        </IonButton>
                    </IonItem>
                </IonCard>

                <IonCard>
                    <IonItem onClick={e=>{
                        e.preventDefault();
                        props.history.push({
                            pathname:'/tenancy-info-edit',

                        })
                    }} color={'none'} detail={false} lines={'none'}>
                        <IonLabel>
                            <h2>Tenancy Information</h2>
                            <p>Available from {property?.ealiest_available_date} </p>

                        </IonLabel>

                        <IonButton color={'secondary'} fill={'clear'} slot={'end'} size={'large' }>
                            Edit
                        </IonButton>
                    </IonItem>
                </IonCard>


                <IonCard>
                    <IonItem onClick={e=>{
                        e.preventDefault();
                        props.history.push({
                            pathname:'/pricing-info',

                        })
                    }} color={'none'} detail={false} lines={'none'}>
                        <IonLabel>
                            <h2>Pricing Information</h2>
                            <p>Rent is £{property?.rent} </p>
                            <p>£{property?.deposit} deposit </p>
                            <p>Bill included</p>

                        </IonLabel>

                        <IonButton color={'secondary'} fill={'clear'} slot={'end'} size={'large' }>
                            Edit
                        </IonButton>
                    </IonItem>
                </IonCard>

                <IonCard>
                    <IonItem onClick={e=>{
                        e.preventDefault();
                        props.history.push({
                            pathname:'/pricing-info',

                        })
                    }} color={'none'} detail={false} lines={'none'}>
                        <IonLabel>
                            <h2>Compliance Information</h2>

                            <p>Documents included</p>

                        </IonLabel>

             a           <IonButton color={'secondary'} fill={'clear'} slot={'end'} size={'large' }>
                            Edit
                        </IonButton>
                    </IonItem>
                </IonCard>

                <IonCard>
                    <IonButton routerLink={'./confirm-property'} color='medium' size='small'  fill='outline' expand={'block'}>

                        Preview listing
                    </IonButton>
                </IonCard>
                <div className="ion-padding">
                    <IonButton onClick={()=>{advertise()}}  size='small' className={'next'} expand={'block'}>

                        Advertise
                    </IonButton>
                </div>

                <IonLoading
                    cssClass='my-custom-class'
                    isOpen={showLoading}
                    onDidDismiss={() => setShowLoading(false)}
                    message={'Please wait...'}

                />

                <IonAlert
                    isOpen={showAlert}
                    onDidDismiss={() => setShowAlert(false)}
                    message={ "Property advertised"}
                    header={'Success'}
                    buttons={[
                        {
                            text: 'Ok',
                            handler: () => {
                                props.history.goBack()
                            }
                        }]}
                />
            </IonContent>
        </IonPage>
    );
};


