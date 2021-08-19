import React, {useState} from 'react';
import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonLoading,
    IonPage,
    IonText,
    IonTextarea,
    IonToast,
    IonToolbar
} from '@ionic/react';
import './property-title.css';
import {postData} from "../../api";
import firebase from "firebase";


export default function PropertyTitle (props:any) {
    const [text, setText] = useState<any>(null);
    const [desc, setDesc] = useState<any>(null);
    const [message, setMessage] = useState<any>(null);
    const [color, setColor] = useState<any>(null);
    const [showToast, setShowToast] = useState(false);
    const [showLoading, setShowLoading] = useState(false);


    let propData : any = JSON.parse(localStorage.propData);
    const db = firebase.firestore();
    function next() {
        propData.title = text;
        propData.description = desc;
        setShowLoading(true);
        postData(propData,'properties').then((res)=>{
            db.collection('properties').doc(res.data.data.id).set({title:text}).then();
            localStorage.setItem('property_id',res.data.data.id);
            localStorage.setItem('propData',JSON.stringify(propData));
            props.history.push('/property-type')
        }).catch(()=>{
            setColor('danger');
            setMessage('Something went wrong! try again');
            setShowToast(true);
            setShowLoading(false);
        })

    }

    return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar  >
            <IonButtons slot="start">
                <IonBackButton defaultHref={'./add-property'} color='dark'  text=''/>
            </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
          <div className={'ion-text-center '}>

              <h2>Add your property</h2>

          </div>


    <div className={'ion-text-center ion-padding'}>
        <IonText>
            Please give your room/property a listing a title for tenants to see
        </IonText>

        <IonItem className='ion-item ion-margin-top' lines='none'>
            <IonInput  placeholder='Room/property title' value={text} onIonChange={y => setText(y.detail.value!)}  className='input'  />
        </IonItem>

        <IonItem className='ion-item ion-margin-top' lines='none'>
            <IonTextarea  placeholder='How would you best describe your property? ' value={desc} onIonChange={y => setDesc(y.detail.value!)}  className='input'  />
        </IonItem>
    </div>




          <div className={'ion-padding'}>
          <IonButton  disabled={ !text || !desc}  onClick={e => {
              e.preventDefault();
              next()
          } }
          className={'next'} expand={'block'}>

              Next
          </IonButton>
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
    </IonPage>
  );
};

