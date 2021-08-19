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
    IonSelect,
    IonSelectOption,
    IonToolbar
} from '@ionic/react';
import './property-type.css';
import firebase from "firebase";


export default function  PropertyType (props:any) {
    const [selected, setSelected] = useState<any>('Furnished');
    const [hasGarden, setHasGarden] = useState<any>('0');
    const [hasEnsuite, setHasEnsuite] = useState<any>('0');
    const db =firebase.firestore();
    const [type, setType] = useState<any>('Detached');
    let list_type:any = ['Detached','Semi detached','Terraced', 'Townhouse','Bungalow','Mobile Home','Flat','Maisonette','Studio','Bedsit'];

    let propData : any = JSON.parse(localStorage.propData);

    function next() {
        propData.furnished = selected;
        propData.property_type = type;
        propData.has_garden = hasGarden;
        propData.has_ensuite = hasEnsuite;
       const id:any = localStorage.getItem('property_id');
        db.collection('properties').doc(id).update({type:true}).then();
        localStorage.setItem('propData',JSON.stringify(propData));
        props.history.push({
            pathname:'/manage-property',
            state:'propAdded'
        });

}



    return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar  >
            <IonButtons    slot="start">
                <IonBackButton defaultHref={'./property-title'} color='dark'  text=''/>
            </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>


          <div className={'ion-text-center '}>

        <h2>Add your property</h2>

          </div>
          <div className={'ion-margin-top ion-padding'}>

              <IonItem color={'none'} lines={'none'}>
                  <IonLabel position={'stacked'} >      <h4><strong>What type of residential property do you have?</strong></h4></IonLabel>
                  <IonSelect value={type} className='input-select ion-padding-start' onIonChange={y => setType(y.detail.value)}  >
                      {list_type.map((ad:any)=>(<IonSelectOption key={ad} value={ad} >
                          {ad}

                      </IonSelectOption>)) }
                  </IonSelect>
              </IonItem>

              <IonRadioGroup value={selected} onIonChange={e => setSelected(e.detail.value)}>
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



              <IonRadioGroup value={hasGarden} onIonChange={e => setHasGarden(e.detail.value)}>
                  <IonListHeader>
                      <h5><strong>Does the property have a garden? </strong></h5>
                  </IonListHeader>

                  <IonItem lines={'none'}>
                      <IonLabel>Yes</IonLabel>
                      <IonRadio mode={'md'}  slot="start" value="1" />
                  </IonItem>

                  <IonItem lines={'none'}>
                      <IonLabel>No</IonLabel>
                      <IonRadio className={'ion-radio'} mode={'md'} slot="start" value="0" />
                  </IonItem>






              </IonRadioGroup>


              { propData.is_private === "1" &&  <IonRadioGroup value={hasEnsuite} onIonChange={e => setHasEnsuite(e.detail.value)}>
                  <IonListHeader>
                  <h5><strong>Does the property have an en-suite</strong></h5>
                  </IonListHeader>

                  <IonItem lines={'none'}>
                  <IonLabel>Yes</IonLabel>
                  <IonRadio mode={'md'}  slot="start" value="1" />
                  </IonItem>

                  <IonItem lines={'none'}>
                  <IonLabel>No</IonLabel>
                  <IonRadio className={'ion-radio'} mode={'md'} slot="start" value="0" />
                  </IonItem>






                  </IonRadioGroup>
              }
      </div>

      </IonContent> <IonButton disabled={!type || !selected} onClick={() => next()}  className='next ion-margin-bottom' expand={'block'}>

        Next
    </IonButton>
    </IonPage>
  );
};


