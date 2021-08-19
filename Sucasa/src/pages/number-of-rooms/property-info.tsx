import React, {useState} from 'react';
import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonPage,
    IonSelect,
    IonSelectOption,
    IonToolbar,
    IonText, IonRadioGroup, IonListHeader, IonRadio
} from '@ionic/react';
import './number-of-rooms.css';


export default function  PropertyInfo (props:any) {
    const [selected, setSelected] = useState<any>('');
    const [bath, setBath] = useState<any>('');
    const [selectedProperty, setSelectedProperty] = useState<any>('');

    let list:any = ['1','2','3','4','5','6','7','8','9','10' ];



    function next() {

        props.history.push('/rent-deposit')

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

        <h2>Add your property</h2>

          </div>
          <div className={'ion-margin-top ion-padding'}>

              <IonItem  className="ion-margin-bottom"  color={'none'} lines={'none'}>
                  <IonLabel position={'stacked'} >Number of  bathrooms</IonLabel>
                  <IonSelect placeholder='Please select' value={selected} className='input-select ion-padding-start' onIonChange={y => setSelected(y.detail.value)}  >
                      {list.map((ad:any)=>(<IonSelectOption key={ad} value={ad} >
                          {ad}

                      </IonSelectOption>)) }
                  </IonSelect>
              </IonItem>
              <div className='ion-text-center ion-padding ion-margin-top '>

              </div>
              <IonItem color={'none'}  lines={'none'}>
                  <IonLabel position={'stacked'} >
                      Number of  bedrooms ?
                  </IonLabel>

                  <IonSelect value={bath} placeholder='Please select' className='input-select ion-padding-start' onIonChange={y => setBath(y.detail.value)}  >
                      {list.map((ad:any)=>(<IonSelectOption key={ad} value={ad} >
                          {ad}

                      </IonSelectOption>)) }
                  </IonSelect>
              </IonItem >
              <div className='ion-margin-top '>
              <IonItem  color={'none'}  lines={'none'}>
                  <IonRadioGroup value={selectedProperty} onIonChange={e => setSelectedProperty(e.detail.value)}>
                      <IonListHeader>
                          <h5><strong>Is this property furnished?</strong></h5>
                      </IonListHeader>

                      <IonItem lines={'none'}>
                          <IonLabel>Furnished</IonLabel>
                          <IonRadio mode={'md'}  slot="start" value="Furnished" />
                      </IonItem>

                      <IonItem lines={'none'}>
                          <IonLabel>Semi-furnished</IonLabel>
                          <IonRadio className={'ion-radio'} mode={'md'} slot="start" value="Semi-furnished" />
                      </IonItem>

                      <IonItem lines={'none'}>
                          <IonLabel>Unfurnished</IonLabel>
                          <IonRadio className={'ion-radio'} mode={'md'} slot="start" value="Unfurnished" />
                      </IonItem>




                  </IonRadioGroup>

              </IonItem>
              </div>

      </div>

      </IonContent> <IonButton disabled={!bath || !selected} onClick={() => next()}  className='next ion-margin-bottom' expand={'block'}>

        save
    </IonButton>
    </IonPage>
  );
};

