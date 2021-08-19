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
    IonText
} from '@ionic/react';
import './number-of-rooms.css';


export default function  NumberOfRooms (props:any) {
    const [selected, setSelected] = useState<any>('');
    const [bath, setBath] = useState<any>('');

    let list:any = ['1','2','3','4','5','6','7','8','9','10' ];
    let propData : any = JSON.parse(localStorage.propData);



    function next() {
        propData.number_of_bedrooms = selected;
        propData.number_of_bathrooms = bath;
        localStorage.setItem('propData',JSON.stringify(propData));
        props.history.push('/rent-deposit')

}



    return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar  >
            <IonButtons    slot="start">
                <IonBackButton defaultHref={'./property-address'} color='dark'  text=''/>
            </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>


          <div className={'ion-text-center '}>

        <h2>Add your property</h2>

          </div>
          <div className={'ion-margin-top ion-padding'}>

              <IonItem  className="ion-margin-bottom"  color={'none'} lines={'none'}>
                  <IonLabel position={'stacked'} >How many single rooms are in the property?</IonLabel>
                  <IonSelect placeholder='Please select' value={selected} className='input-select ion-padding-start' onIonChange={y => setSelected(y.detail.value)}  >
                      {list.map((ad:any)=>(<IonSelectOption key={ad} value={ad} >
                          {ad}

                      </IonSelectOption>)) }
                  </IonSelect>
              </IonItem>
              <div className='ion-text-center ion-padding ion-margin-top '>
              <IonText >Out of all the rooms in the property, how many of the bedrooms are single rooms (also known as box rooms)?</IonText>
              </div>
              <IonItem color={'none'}  lines={'none'}>
                  <IonLabel position={'stacked'} />

                  <IonSelect value={bath} placeholder='Please select' className='input-select ion-padding-start' onIonChange={y => setBath(y.detail.value)}  >
                      {list.map((ad:any)=>(<IonSelectOption key={ad} value={ad} >
                          {ad}

                      </IonSelectOption>)) }
                  </IonSelect>
              </IonItem>

      </div>

      </IonContent> <IonButton disabled={!bath || !selected} onClick={() => next()}  className='next ion-margin-bottom' expand={'block'}>

        Next
    </IonButton>
    </IonPage>
  );
};

