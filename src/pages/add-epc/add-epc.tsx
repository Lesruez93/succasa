import React, {useState} from 'react';
import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonInput,
    IonItem, IonLabel, IonLoading,
    IonPage, IonText, IonToast,
    IonToolbar
} from '@ionic/react';
import './add-epc.css';
import {uploadDocument} from "../../api";


export default function AddEpc (props:any) {
    const [text, setText] = useState<any>(null);
    const [message, setMessage] = useState<any>(null);
    const [color, setColor] = useState<any>(null);
    const [showToast, setShowToast] = useState(false);
    const [showLoading, setShowLoading] = useState(false);

   let data= props.history.location.state;
    function  submit() {
        setShowLoading(true);
        uploadDocument({
            url:text,
            name:text,
            document_type_id:data.id,
            property_id:localStorage.getItem('property_id')
        }).then((res:any)=>{
            setColor('success');
            setMessage('Document saved successful. ');
            setShowLoading(false);


            setShowToast(true);
            setTimeout(()=>{
                props.history.push(data.url)
            },1000);


        })


    }
    function next() {

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

              <h2>EPC</h2>

          </div>


    <div className={'ion-text-center ion-padding'}>
        <IonText>
            <strong>Please enter your 9-digit EPC Code</strong>
        </IonText>

        <IonItem className='ion-item ion-margin-top' lines='none'>
            <IonLabel position={'stacked'}>EPC Code</IonLabel>
            <IonInput  placeholder='L/R' value={text} onIonChange={y => setText(y.detail.value!)}  className='input'  />
        </IonItem>


    </div>




          <div className={'ion-padding'}>
          <IonButton  disabled={ !text }  onClick={e => {
              e.preventDefault();
              submit()
          } }
          className={'next'} expand={'block'}>

              Submit
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
    )}
