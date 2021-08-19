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
import './number-of-rooms.css';
import {getApiRequest, updateData} from "../../api";


export default function  PropertyInfoEdit (props:any) {
  const [selected, setSelected] = useState<any>();
  const [bath, setBath] = useState<any>('2');
  const [selectedProperty, setSelectedProperty] = useState<any>('1');

  let list:any = [1,2,3,4,5,6,7,8,9,10 ];


  useEffect(()=>{
    getApiRequest('properties/'+localStorage.getItem('property_id')).then(
        r=>{

          setSelected(r.data.data.attributes.number_of_bedrooms);
          setBath(r.data.data.attributes.number_of_bathrooms);
          setSelectedProperty(r.data.data.attributes.furnished)

        }
    )
  },[]);
  function next() {

   updateData({number_of_bedrooms:selected,
                    number_of_bathroom:bath,
                    furnished:selectedProperty
   },'properties',localStorage.getItem('property_id')).then(r=>{
       props.history.push('/property-overview')
   })
       .catch()

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
              {selectedProperty}
            <h2>Edit your property</h2>

          </div>
          <div className={'ion-margin-top ion-padding'}>

            <IonItem  className="ion-margin-bottom"  color={'none'} lines={'none'}>
              <IonLabel position={'stacked'} >Number of  bedrooms</IonLabel>
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
                Number of  bathrooms ?
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

        Save
      </IonButton>
      </IonPage>
  );
};

