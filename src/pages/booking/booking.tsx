import React, {useState} from 'react';
import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonCol,
    IonContent,
    IonDatetime,
    IonHeader,
    IonItem,
    IonLoading,
    IonPage,
    IonRow,
    IonSelect,
    IonSelectOption,
    IonText,
    IonToast,
    IonToolbar
} from '@ionic/react';
import './booking.css';
import moment from "moment";
import {getUser, postData} from "../../api";


export default function  Booking(props:any) {
    const [selectedDate, setSelectedDate] = useState<any>(null);
    const [selected, setSelected] = useState<any>();
    const [message, setMessage] = useState<any>(null);
    const [color, setColor] = useState<any>(null);
    const [showToast, setShowToast] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const [selectedStartTime, setSelectedStartTime] = useState<any>(null);
    const [selectedEndTime, setSelectedEndTime] = useState<any>(null);


    let dates = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];


    function  add90(t:any){
        var newDateObj = new Date();

        return t.setTime(newDateObj.getTime() + (30 * 60 * 1000));
    }

    function next() {
        if(selectedDate ){
            setShowLoading(true);


            let data:any = {
                   "resource_id": "9f7cd0b0-a42a-46a5-aa5c-28e53ffeb088",
                
                   "start": moment(selectedDate).format('YYYY-MM-DD'),
                   "user_id": getUser().id,
                   "property_id": "1"
               };

               postData(data,'viewbookings').then(()=>{
                   setShowLoading(false);

                   setMessage('Done ');
                   setColor('success');
                   setShowToast(true);
               }).catch(()=>{
                    setShowLoading(false);
                   setMessage('Failed please try again ');
                   setColor('danger');
                    setShowToast(true);
               })
        }
    }


    function startChanged(e: any) {
        setSelectedStartTime(e.detail.value!);
        setSelectedEndTime(null)
        console.log(selectedStartTime)
    }

    return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar  >
            <IonButtons slot="start">
                <IonBackButton defaultHref={'/select-market-place'} color='dark'  text=''/>
            </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
          <div className={'ion-text-center '}>

              <h2>Make a booking</h2>

          </div>


          <div className={'ion-text-center ion-padding'}>
             <div>
              <IonText>
                  Please select the earliest available date.
              </IonText>
                                  <IonSelect placeholder='Please select a day' value={selectedDate} onIonChange={e => setSelectedDate(e.detail.value)}  className={'ion-padding-left'}>
                                      {dates.map((date:any)=>(
                                          <IonSelectOption  key={date} value={date} >
                                              {date}
                                      </IonSelectOption> ))
                                      }
                                      </IonSelect>
             </div>

              <div className="ion-margin-top ion-margin-bottom">
              <IonRow>

                  <IonCol size='6'>

                      <IonDatetime placeholder="Start time"  minuteValues={'0,30,30,0'}   pickerFormat={'HH:mm'} displayFormat={'HH:mm'} value={selectedStartTime} onIonChange={e => startChanged(e)}/>

                  </IonCol>

                      <IonCol size='6'>
                          <IonDatetime placeholder="End  time" min={selectedStartTime }   minuteValues={'0,30,30,0'}   pickerFormat={'HH:mm'} displayFormat={'HH:mm'} value={selectedEndTime} onIonChange={e => setSelectedEndTime(e.detail.value!)}/>

                      </IonCol>
                  </IonRow>
              </div>
          </div>
            <div className={'ion-text-center ion-padding'}>
                <IonText>
                    Please select the earliest available date.
                </IonText>
                <IonItem className={'ion-item'} lines='none'>
                    <IonDatetime placeholder="Select Day"  value={selectedDate} onIonChange={e => setSelectedDate(e.detail.value!)}/>
                </IonItem>
            </div>




          <div className={'ion-padding'}>
          <IonButton  disabled={ !selectedDate}  onClick={e => {
              e.preventDefault();



              next()
          }} className={'next'} expand={'block'}>

              Save
          </IonButton>
          </div>
      </IonContent>
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
    </IonPage>
  );
};


