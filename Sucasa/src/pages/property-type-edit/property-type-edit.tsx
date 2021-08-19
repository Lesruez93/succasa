import React, {useEffect, useState} from 'react';
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
    IonSelect,
    IonSelectOption,
    IonToolbar
} from '@ionic/react';
import {getApiRequest, updateData} from "../../api";


export default function  PropertyTypeEdit (props:any) {
    const [hasGarden, setHasGarden] = useState<any>('0');
    const [hasEnsuite, setHasEnsuite] = useState<any>('0');
    const [selected, setSelected] = useState<any>();
    const [property, setProperty] = useState<any>();


    const [type, setType] = useState<any>();

    let list_type:any = ['Detached','Semi detached','Terraced', 'Townhouse','Bungalow','Mobile Home','Flat','Maisonette','Studio','Bedsit'];



    useEffect(()=>{
        getApiRequest('properties/'+localStorage.getItem('property_id')).then(
            r=>{
                setSelected(r.data.data.attributes.is_private)
            }
        )
    },[]);
    function next() {
        updateData('properties/'+localStorage.getItem('property_id'),{}).then(
          r  =>{
              props.history.push({
                  pathname:'/manage-property',

              });
        }
        )


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

          </div>
          <div className={'ion-margin-top ion-padding'}>

              <IonItem color={'none'} lines={'none'}>
                  <IonLabel position={'stacked'} className='ion-text-wrap' >
                      <h3><strong>What type of residential property do you have?</strong></h3></IonLabel>
                  <IonSelect value={type} className='input-select ion-padding-start' onIonChange={y => setType(y.detail.value)}  >
                      {list_type.map((ad:any)=>(<IonSelectOption key={ad} value={ad} >
                          {ad}

                      </IonSelectOption>)) }
                  </IonSelect>
              </IonItem>


                  <IonRadioGroup value={selected} onIonChange={e => setSelected(e.detail.value)}>
                      <IonListHeader>
                          <IonLabel>Is this a private property or a shared property?</IonLabel>
                      </IonListHeader>

                      <IonItem lines={'none'}>
                          <IonLabel>Private</IonLabel>
                          <IonRadio mode={'md'}  slot="start" value={0} />
                      </IonItem>

                      <IonItem lines={'none'}>
                          <IonLabel>Shared</IonLabel>
                          <IonRadio className={'ion-radio'} mode={'md'} slot="start" value={1} />
                      </IonItem>

                      <div>
                          <h2><strong>
                              Please Note:
                          </strong></h2>
                          <p>
                              <strong>Private Property </strong> -One person or a couple will be living in this property.
                          </p>

                          <p> <strong>Shared Property</strong> - The property is shared with more than one tenant.</p>
                      </div>


                  </IonRadioGroup>









      </div>

      </IonContent> <IonButton disabled={!type || !selected} onClick={() => next()}  className='next ion-margin-bottom' expand={'block'}>

        Next
    </IonButton>
    </IonPage>
  );
};


