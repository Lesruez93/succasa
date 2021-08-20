import React, {useState} from 'react';
import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonListHeader,
    IonPage,
    IonRadio,
    IonRadioGroup,
    IonToolbar
} from '@ionic/react';
import './renewal-type.css';


export default function  RenewalType (props:any)  {
    const [selected, setSelected] = useState<any>('Rolling monthly contract');
    let propData : any = JSON.parse(localStorage.propData);


    function next() {
propData.renewal_terms = selected;
localStorage.setItem('propData',JSON.stringify(propData));
props.history.push('/add-bills');

}



    return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar  >
            <IonButtons    slot="start">
                <IonBackButton defaultHref={'./tenancy-terms'} color='dark'  text=''/>
            </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>


          <div className={'ion-text-center '}>

        <h2>Add your property</h2>

          </div>
          <div className={'ion-margin-top ion-padding'}>



              <IonRadioGroup value={selected} onIonChange={e => setSelected(e.detail.value)}>
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

      </IonContent> <IonButton disabled={!selected} onClick={() => next()}  className='next ion-margin-bottom' expand={'block'}>

        Next
    </IonButton>
    </IonPage>
  );
};


