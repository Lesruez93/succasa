import React, {useState} from 'react';
import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonDatetime,
    IonHeader,
    IonItem,
    IonLabel,
    IonListHeader,
    IonLoading,
    IonPage,
    IonRadio,
    IonRadioGroup,
    IonSelect,
    IonSelectOption,
    IonText,
    IonToast,
    IonToolbar
} from '@ionic/react';
import './tenancy-terms.css';


export default function TenancyInfoEdit (props:any)  {

    const [tenancy, setTenancy] = useState<any>('');
    const [duration, setDuration] = useState<any>('');
    const [message, setMessage] = useState<any>(null);
    const [color, setColor] = useState<any>(null);
    const [showToast, setShowToast] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState<any>();
     const[ selectedTerm,setSelectedTerm] = useState();

    let list:any = ['1','2','3','4','5','6' ];
    let durationPeriod = ['1', '6', '12'];



    function next()
    {
             props.history.push('/renewal-type')
    }

    return (
        <IonPage>
            <IonHeader className="ion-no-border">
                <IonToolbar  >
                    <IonButtons    slot="start">
                        <IonBackButton defaultHref={'/property-overview'} color='dark'  text=''/>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>


                <div className={'ion-text-center '}>

                    <h2>Edit your property</h2>
                    <div className={'ion-text-center ion-padding'}>
                        <IonText>
                            <strong>Please provide information regarding rent and deposit.</strong>

                        </IonText>

                    </div>
                </div>
                <div className={'ion-margin-top'}>
                    <IonItem color={'none'} className="ion-margin-top" lines={'none'}>
                        <IonLabel position={'stacked'}>How long is the tenancy term?</IonLabel>
                        <IonSelect value={duration} placeholder='Please select' className='input-select ion-padding-start' onIonChange={y => setDuration(y.detail.value)}  >
                            {durationPeriod.map((ad:any)=>(<IonSelectOption key={ad} value={ad} >
                                {ad} month(s)

                            </IonSelectOption>)) }
                        </IonSelect>
                    </IonItem>

                </div>


                <div className={'ion-margin-top ion-padding'}>



                    <IonRadioGroup value={selectedTerm} onIonChange={e => setSelectedTerm(e.detail.value)}>
                        <IonListHeader>
                            <IonLabel>What are the tenancy renewal terms?</IonLabel>
                        </IonListHeader>



                        <IonItem lines={'none'}>
                            <IonLabel className="ion-margin-bottom">Rolling monthly contract</IonLabel>
                            <IonRadio className={'ion-radio'} mode={'md'} slot="start" value="Rolling monthly contract" />
                        </IonItem>

                        <IonItem lines={'none'}>
                            <IonLabel>Fixed term</IonLabel>
                            <IonRadio className={'ion-radio'} mode={'md'} slot="start" value="Fixed term" />
                        </IonItem>




                    </IonRadioGroup>
                </div>


                <div className={'ion-text-center ion-padding'}>
                    <IonText>
                        Please select the earliest available date.
                    </IonText>
                    <IonItem className={'ion-item'} lines='none'>
                        <IonDatetime placeholder="Select Day"  value={selectedDate} onIonChange={e => setSelectedDate(e.detail.value!)}/>
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

            </IonContent> <IonButton disabled={!tenancy || !duration} onClick={() => next()}  className='next ion-margin-bottom' expand={'block'}>

            Next
        </IonButton>
        </IonPage>
    );
};

