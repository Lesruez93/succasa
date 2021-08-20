import React, {useState} from 'react';
import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonLoading,
    IonPage,
    IonSelect,
    IonSelectOption,
    IonText,
    IonToast,
    IonToolbar
} from '@ionic/react';
import './tenancy-terms.css';


export default function TenancyTerms (props:any)  {

    const [tenancy, setTenancy] = useState<any>('');
    const [duration, setDuration] = useState<any>('');
    const [message, setMessage] = useState<any>(null);
    const [color, setColor] = useState<any>(null);
    const [showToast, setShowToast] = useState(false);
    const [showLoading, setShowLoading] = useState(false);

    let list:any = ['1','2','3','4','5','6' ];
    let durationPeriod = ['1', '6', '12'];

    let propData : any = JSON.parse(localStorage.propData);


    // function next() {
    //     setShowLoading(true);
    //     propData.max_number_of_tenants = tenancy;
    //     propData.tenancy_term = duration;
    //     localStorage.setItem('propData',JSON.stringify(propData));
    //
    //
    //     postData(JSON.parse(localStorage.propData),'properties').then((res)=>{
    //         console.log(res);
    //         localStorage.setItem('property_id',res.data.data.id);
    //         setColor('success');
    //         setMessage('Property added , add property images now');
    //         setShowToast(true);
    //         setShowLoading(false);
    //         props.history.push('/add-property-upload')
    //     }).catch(()=>{
    //         setColor('danger');
    //         setMessage('Something went wrong! try again');
    //         setShowToast(true);
    //         setShowLoading(false);
    //     })
    //
    //
    // }

    function next()
    {
            propData.max_number_of_tenants = tenancy;
            propData.tenancy_term = duration;
            localStorage.setItem('propData',JSON.stringify(propData));
             props.history.push('/renewal-type')


    }

    return (
        <IonPage>
            <IonHeader className="ion-no-border">
                <IonToolbar  >
                    <IonButtons    slot="start">
                        <IonBackButton defaultHref={'./rent-deposit'} color='dark'  text=''/>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>


                <div className={'ion-text-center '}>

                    <h2>Add your property</h2>
                    <div className={'ion-text-center ion-padding'}>
                        <IonText>
                            <strong>Please provide information regarding rent and deposit.</strong>

                        </IonText>

                    </div>
                </div>
                <div className={'ion-margin-top'}>

                    <IonItem  className="ion-margin-bottom"  color={'none'} lines={'none'}>
                        <IonLabel position={'stacked'} >Maximum number of tenants?</IonLabel>
                        <IonSelect placeholder='Please select' value={tenancy} className='input-select ion-padding-start' onIonChange={y => setTenancy(y.detail.value)}  >
                            {list.map((ad:any)=>(<IonSelectOption key={ad} value={ad} >
                                {ad}

                            </IonSelectOption>)) }
                        </IonSelect>
                    </IonItem>
                    <div className='ion-text-center  ion-margin-top '>
                    </div>
                    <IonItem color={'none'} className="ion-margin-top" lines={'none'}>
                        <IonLabel position={'stacked'}>How long is the tenancy term?</IonLabel>
                        <IonSelect value={duration} placeholder='Please select' className='input-select ion-padding-start' onIonChange={y => setDuration(y.detail.value)}  >
                            {durationPeriod.map((ad:any)=>(<IonSelectOption key={ad} value={ad} >
                                {ad} month(s)

                            </IonSelectOption>)) }
                        </IonSelect>
                    </IonItem>

                </div>
                <IonToast
                    isOpen={showToast}
                    onDidDismiss={() => setShowToast(false)}
                    message={message}
                    position={'top'}
                    color={color}
                    duration={2000}
                />
                <IonLoading
                    cssClass='my-custom-class'
                    isOpen={showLoading}
                    onDidDismiss={() => setShowLoading(false)}
                    message={'Please wait...'}

                />

            </IonContent>
            <IonButton disabled={!tenancy || !duration} onClick={() => next()}  className='next ion-margin-bottom' expand={'block'}>

            Next
        </IonButton>
        </IonPage>
    );
};

