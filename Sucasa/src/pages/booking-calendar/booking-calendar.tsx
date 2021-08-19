import React, {useEffect, useState} from 'react';
import {
    IonAvatar,
    IonContent,
    IonFab,
    IonFabButton,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonNote,
    IonPage,
    IonSpinner,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import './booking-calendar.css';
import {formatTime, getApiRequest} from "../../api";
import {add, calendar} from "ionicons/icons";
import ReactTimeAgo from 'react-time-ago'


export default function  BookingCalendar (props:any)  {
let data:any =  [
        {
            "type": "viewbookings",
            "id": "15",
            "attributes": {
                "start": "2021-08-12T21:30:00-07:00",
                "end": "2021-08-12T22:00:00-0700",
                "what": "View Booking for Title Test",
                "where": "Somewhere",
                "completed": false,
                "description": "View Booking for Title Test",
                "createdAt": "2021-02-18T19:59:29.000000Z",
                "updatedAt": "2021-02-12T19:59:29.000000Z"
            },
            "links": {
                "self": "http://127.0.0.1:8000/api/v1/viewbookings/15"
            }
        },
        {
            "type": "viewbookings",
            "id": "17",
            "attributes": {
                "start": "2021-07-12T21:30:00-07:00",
                "end": "2021-07-12T22:00:00-0700",
                "what": "View Booking for Title Test",
                "where": "Somewhere",
                "completed": false,
                "description": "View Booking for Title Test",
                "createdAt": "2021-02-12T20:09:19.000000Z",
                "updatedAt": "2021-02-12T20:09:19.000000Z"
            },
            "links": {
                "self": "http://127.0.0.1:8000/api/v1/viewbookings/17"
            }
        },
        {
            "type": "viewbookings",
            "id": "18",
            "attributes": {
                "start": "2021-09-12T21:30:00-07:00",
                "end": "2021-09-12T22:00:00-0700",
                "what": "View Booking for Title Test",
                "where": "Somewhere",
                "completed": false,
                "description": "View Booking for Title Test",
                "createdAt": "2021-02-12T20:18:28.000000Z",
                "updatedAt": "2021-02-12T20:18:28.000000Z"
            },
            "links": {
                "self": "http://127.0.0.1:8000/api/v1/viewbookings/18"
            }
        },
        {
            "type": "viewbookings",
            "id": "19",
            "attributes": {
                "start": "2021-10-12T21:30:00-07:00",
                "end": "2021-10-12T22:00:00-0700",
                "what": "View Booking for Title Test",
                "where": "Somewhere",
                "completed": false,
                "description": "View Booking for Title Test",
                "createdAt": "2021-02-12T20:23:28.000000Z",
                "updatedAt": "2021-02-12T20:23:28.000000Z"
            },
            "links": {
                "self": "http://127.0.0.1:8000/api/v1/viewbookings/19"
            }
        },
        {
            "type": "viewbookings",
            "id": "20",
            "attributes": {
                "start": "2021-11-12T21:30:00-07:00",
                "end": "2021-11-12T22:00:00-0700",
                "what": "View Booking for Title Test",
                "where": "Somewhere",
                "completed": false,
                "description": "View Booking for Title Test",
                "createdAt": "2021-02-12T20:24:27.000000Z",
                "updatedAt": "2021-02-12T20:24:27.000000Z"
            },
            "links": {
                "self": "http://127.0.0.1:8000/api/v1/viewbookings/20"
            }
        },
        {
            "type": "viewbookings",
            "id": "21",
            "attributes": {
                "start": "2022-11-12T21:30:00-07:00",
                "end": "2022-11-12T22:00:00-0700",
                "what": "View Booking for Title Test",
                "where": "Somewhere",
                "completed": false,
                "description": "View Booking for Title Test",
                "createdAt": "2021-02-12T20:27:45.000000Z",
                "updatedAt": "2021-02-12T20:27:45.000000Z"
            },
            "links": {
                "self": "http://127.0.0.1:8000/api/v1/viewbookings/21"
            }
        }
    ]

    const  [properties,setProperties] = useState<any>(data);
    const [isProp, setIsProp] = useState<any>(true);
    const [empty, setEmpty] = useState<any>(false);
    const [loader, setLoader] = useState<any>(false);
    const [searchText, setSearchText] = useState('');


    useEffect(()=>{
     //   loadData()
    },[]);
    function  loadData() {

        getApiRequest('viewbookings').then(async (res: any) => {

            await setProperties(res.data.data);


            setLoader(false);
            if (res.data.data === []) {
                setEmpty(true)
            } else {
                setIsProp(true)
            }
        })
    }



    return (
        <IonPage>
            <IonHeader >
                <IonToolbar color="primary">
                    <IonTitle>Bookings</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>

                {loader &&   <div   className="ion-margin-top ion-text-center">
                    <IonLabel color="success"><h1>Loading.....</h1></IonLabel>
                    <IonSpinner name='lines'  color='medium'>

                    </IonSpinner>


                </div>
                }



                        {properties.map((proprty: any) => (
                            <IonItem lines="full" className="ion-padding-top" key={proprty.id} >
                                <IonAvatar slot="start">
                                    <IonIcon   color='primary' icon={calendar}/>
                                </IonAvatar>

                                <IonLabel>
                                    <p className='capitalize'>{proprty?.attributes?.where}</p></IonLabel>

                                <IonLabel slot='end'>
                                    <p>
                                    <ReactTimeAgo date={new Date(proprty?.attributes?.createdAt)} locale="en-US"/>
                                </p>
                                </IonLabel>
                            </IonItem>
                        )
                    )


                }


            </IonContent>
            {isProp &&      <IonFab   onClick={e => {
                e.preventDefault();
                setIsProp(false);
                setProperties(false);
                props.history.push('/make-booking');
            }} vertical="bottom" horizontal="end" slot="fixed">
                <IonFabButton  color="secondary">
                    <IonIcon icon={add} />
                </IonFabButton>
            </IonFab>}
        </IonPage>
    );
};


