import React, {useState} from 'react';
import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonCol,
    IonContent,
    IonDatetime,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonPage,
    IonRow,
    IonText,
    IonTitle,
    IonToolbar
} from '@ionic/react';


export default function AddressHistory (props:any) {
    const [address, setAddress1] = useState<any>('');
    const [address2, setAddress2] = useState<any>('');
    const [address3, setAddress3] = useState<any>('');
    const [address4, setAddress4] = useState<any>('');
    const [company, setCompany] = useState<any>('');
    const [moveInDate, setMoveInDate] = useState<any>();
    const [moveOutDate, setMoveOutDate] = useState<any>();



    function next(e:any) {
        e.preventDefault();

    }



    return (
        <IonPage>
            <IonHeader className="ion-no-border">
                <IonToolbar color='medium' >
                    <IonButtons slot="start">
                        <IonBackButton defaultHref={'./tenant-referencing'} color='light'  text=''/>
                    </IonButtons>
                    <IonTitle>Address history</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className={'ion-padding'}>





                <form onSubmit={(event1 => next(event1))}>


                    <IonItem   className=' ion-margin-top' lines='none'>

                    <IonText  className='ion-text-center ion-margin-top'>
                        Please enter your registered address for the previous 5 years
                    </IonText>
                    <IonLabel position='stacked' > Address 1</IonLabel>
                    <IonInput required type='text'  value={address} onIonChange={y => setAddress1(y.detail.value!)}  className='input'  />
                </IonItem>
                 
                    <IonItem   className=' ion-margin-top' lines='none'>
                    <IonLabel position='stacked' > Address 2</IonLabel>
                    <IonInput  type='text'  value={address2} onIonChange={y => setAddress2(y.detail.value!)}  className='input'  />
                </IonItem>
                    <IonItem   className=' ion-margin-top' lines='none'>


                    <IonLabel position='stacked' > Address 3</IonLabel>
                    <IonInput required type='text'  value={address3} onIonChange={y => setAddress3(y.detail.value!)}  className='input'  />
                </IonItem>
                    <IonItem   className=' ion-margin-top' lines='none'>


                        <IonLabel position='stacked' > Address 4</IonLabel>
                        <IonInput  type='text'  value={address4} onIonChange={y => setAddress4(y.detail.value!)}  className='input'  />
                    </IonItem>
                    <IonRow>
                        <IonCol size='6'>
                        <IonItem  lines='none'>
                            <IonLabel   position="stacked">Move in date</IonLabel>
                            <IonDatetime  className='ion-margin-top input' placeholder="Please Select"   value={moveInDate} onIonChange={e => setMoveInDate(e.detail.value!)}/>
                        </IonItem>
                    </IonCol>

                        <IonCol size='6'>
                            <IonItem  lines='none'>
                                <IonLabel   position="stacked">Move out date</IonLabel>
                                <IonDatetime  className='ion-margin-top input' placeholder="Please Select" min={moveInDate}  value={moveOutDate} onIonChange={e => setMoveOutDate(e.detail.value!)}/>
                            </IonItem>
                        </IonCol>
                    </IonRow>

                    <IonButton type='submit'
                               className={'next'} expand={'block'}>

                        Continue
                    </IonButton>
                </form>
            </IonContent>
        </IonPage>
    );
};

