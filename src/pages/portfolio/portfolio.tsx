import React, {useState} from 'react';
import {
    IonAlert,
    IonAvatar,
    IonButton,
    IonCard,
    IonCardContent,
    IonCardSubtitle, IonCheckbox, IonCol,
    IonContent, IonDatetime,
    IonFab,
    IonFabButton,
    IonHeader,
    IonIcon,
    IonImg, IonInput,
    IonItem,
    IonLabel, IonLoading,
    IonPage,
    IonRefresher,
    IonRefresherContent, IonRow,
    IonSearchbar, IonSelect, IonSelectOption,
    IonTitle,
    IonToolbar,
    useIonViewDidEnter
} from '@ionic/react';
import './portfolio.css';
import API, {fetcher, fetcherOption, getApiRequest, getUser, toast} from "../../api";
import useSWR from 'swr'

import {add,  chevronDownCircleOutline, filterOutline, locationOutline, searchOutline} from "ionicons/icons";
import {RefresherEventDetail} from '@ionic/core';
import firebase from "firebase";
import Skeleton from "../../components/skeleton";
import {PropertiesStore, PropertyIdStore, UserStore} from "../../Store/UserStore";
import {Plugins} from "@capacitor/core";
import axios from "axios";
import moment from "moment";


export default function  Portfolio (props:any)  {
    const db = firebase.firestore();
    let list:any = ['1','2','3','4','5','6','7','8','9','10' ];
    let list_type:any = ['Detached','Semi detached','Terraced', 'Townhouse','Bungalow','Mobile Home','Flat','Maisonette','Studio','Bedsit'];
    let rents:any  = ["100", "200", "2000"];

        const  [properties,setProperties] = useState<any>([]);
        const [isProp, setIsProp] = useState<any>(false);
        const [filter,setShowFilter] = useState<boolean>(false);
       const [searching,setSearching] = useState<boolean>(false);
        const [max_rent, setMaxRent] = useState<any>('');
        const [property_type, setPropType] = useState<any>('');
        const [min_rent, setMinRent] = useState<any>('');
        const [radius, setRadius] = useState<any>(5);
        const [smoker, setSmoker] = useState<boolean>(false);
        const [bedrooms, setBedrooms] = useState<any>('');
        const [student, setStudent] = useState<boolean>(false);
        const [move_in_date, setDate] = useState<any>('');
        const [location, setLocation] = useState<any>('');
        const [unemployed, setUnemployed] = useState<boolean>(false);
        const [lat, setLat] = useState<any>('');
        const [long, setLng] = useState<any>('');

        const [showLoading, setShowLoading] = useState(false);
        const [loader, setLoader] = useState<any>(true);
        const { data, error } = useSWR('properties', fetcher,fetcherOption);
    const property = PropertiesStore.useState(s => s.property);
    const user = UserStore.useState(s => s.user);


    if (data){
            PropertiesStore.update((property:any)=>{
                if (data.data.length === 0){
                    property.property  =  [{state:'empty'}]
                } else {
                    property.property  =  data.data
                }


            })
        }

    function doRefresh(event: CustomEvent<RefresherEventDetail>) {
        loadData();

        setTimeout(() => {
            event.detail.complete();
        }, 2000);
    }

    function loadData() {



        // getApiRequest('properties').then((res:any)=>{
        //   //  setPropertiesImage(res.data.data[0]);
        //
        // })
    }

    useIonViewDidEnter(()=>{


    });

    function nav(p:any) {

        PropertyIdStore.update((id)=>{
            id.propertyId = p.id
        });
        db.collection('properties').doc(p.id).onSnapshot((snapshot:any) => {
            try {

                props.history.push('/property-profile');
            // if(snapshot.data().requirements){
            //
            // }else {
            //     props.history.push('/manage-property');
            //
            // }
                }
            catch (e) {

            }

        });
        setIsProp(false);
        setProperties(false);
        localStorage.setItem('property_id',p.id);




    }

    function getAddressByCoord(lat:number,lng:number) {
        axios({
            method: 'get', //you can set what request you want to be
            url: API.GeocodingUrl+lat+','+lng +'&key='+API.API_KEY,
        }).then((res:any)=>{

            try {
                setLocation(res.data.results[0].formatted_address);
                setShowLoading(false);

            }
            catch (e) {
                setShowLoading(false);
                alert("Address not found, enter address manually")
            }

        })
    }

    async function getLocation() {
        setShowLoading(true);
        const { Geolocation } = Plugins;

        const coordinates = await Geolocation.getCurrentPosition();
        getAddressByCoord(coordinates.coords.latitude,coordinates.coords.longitude);
        setLat(coordinates.coords.latitude);
        setLng(coordinates.coords.longitude)

    }

    function search(){
        setShowLoading(true);
        setSearching(true);
        let m:any;
        if (move_in_date){
            m =moment(move_in_date).format('YYYY-MM-DD')
        } else {
            m =''
        }
        let filters =
            `?filter[user_id]=${user.id}&filter[radius]=${radius}&filter[lat]=${lat}&filter[long]=${long}&filter[min_monthly_rent]=${min_rent}&filter[max_monthly_rent]=${max_rent}&filter[preferred_move_in_date]=${m}&filter[smoker]=${smoker}&filter[student]=${student}&filter[unemployed]=${unemployed}&filter[number_of_bedrooms]=${bedrooms}&filter[property_type]=${property_type}&filter[location]=${location}`;
console.log('properties'+filters)
        getApiRequest('properties'+filters).then((res)=>{
            setShowLoading(false);
            setSearching(false);
            setShowFilter(false)
            if (res.data.length === 0){
                toast('No results found')
            }
        }).catch((e)=>{
            setShowLoading(false);
            setSearching(false);
            setShowFilter(false)

        })


    }

    return (
        <IonPage>
            <IonHeader >
                <IonToolbar color="medium">
                    <IonTitle>Portfolio</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
                    <IonRefresherContent
                        pullingIcon={chevronDownCircleOutline}
                        pullingText="Pull to refresh"
                        refreshingSpinner="lines"
                        refreshingText="Refreshing...">
                    </IonRefresherContent>
                </IonRefresher>

                <div>
                    <IonRow>
                        <IonCol size="10">
                            <IonSearchbar searchIcon={locationOutline} value={location} onClick={(e)=>getLocation()} placeholder='Search by your current location'>

                            </IonSearchbar>
                        </IonCol>
                          <IonCol  size="2">
                            <IonIcon onClick={(r)=>{
                            if (!filter){
                                setShowFilter(true)}
                            else {
                                setShowFilter(false)}}
                            } className="ion-margin-top" color='medium' size="large" icon={filterOutline}/>
                        </IonCol>

                    </IonRow>

                    {filter &&
                    <div>
                        <IonRow>

                            <IonCol size="4">
                                <IonItem>
                                    <IonLabel position='floating' className="ion-text-wrap">
                                        Radius
                                    </IonLabel>
                                    <IonSelect value={radius} onIonChange={(value)=>setRadius(value.detail.value)}>
                                        <IonSelectOption value={5}>5 miles</IonSelectOption>
                                        <IonSelectOption value={10}>10 miles</IonSelectOption>

                                    </IonSelect>
                                </IonItem>
                            </IonCol>

                            <IonCol size='4'>
                                <IonItem>
                                    <IonLabel position='floating' className="ion-text-wrap">
                                        Min Monthly rent
                                    </IonLabel>
                                    <IonSelect value={min_rent} onIonChange={(e:any)=>setMinRent(e.detail.value!)}>
                                        {rents.map((b:number) => (
                                            <IonSelectOption key={b} value={b}>{b}</IonSelectOption>
                                        ))
                                        }

                                    </IonSelect>
                                </IonItem>
                            </IonCol>

                            <IonCol size="4">
                                <IonItem>
                                    <IonLabel position='floating' className="ion-text-wrap">
                                        Max Monthly rent
                                    </IonLabel>
                                    <IonSelect value={max_rent} onIonChange={(e:any)=>setMaxRent(e.detail.value!)}>
                                        {rents.map((b:number) => (
                                            <IonSelectOption key={b} value={b}>{b}</IonSelectOption>
                                        ))
                                        }

                                    </IonSelect>

                                </IonItem>

                        </IonCol>
                        </IonRow>

                        <IonRow>

                            <IonCol size="4">
                                <IonItem>
                                    <IonLabel position='stacked' className="ion-text-wrap">
                                        Smoker
                                    </IonLabel>
                                    <IonCheckbox checked={smoker} onIonChange={(e:any)=>setSmoker(e.detail.checked)} mode='md'/>
                                </IonItem>
                            </IonCol>

                            <IonCol size='4'>
                                <IonItem>
                                    <IonLabel position='stacked' className="ion-text-wrap">
                                        Student
                                    </IonLabel>
                                    <IonCheckbox checked={student} onIonChange={(e:any)=>setStudent(e.detail.checked)} mode='md'/>
                                </IonItem>
                            </IonCol>

                            <IonCol size="4">
                                <IonItem>
                                    <IonLabel position='stacked' >
                                       Unemployed
                                    </IonLabel>
                                    <IonCheckbox checked={unemployed} onIonChange={(e:any)=>setUnemployed(e.detail.checked)} mode='md'/>
                                </IonItem>

                            </IonCol>
                        </IonRow>


                        <IonRow>
                            <IonCol size="4">
                                <IonItem>
                                    <IonLabel position='floating' className="ion-text-wrap">
                                        Preferred move in date
                                    </IonLabel>
                                    <IonDatetime value={move_in_date} onIonChange={(e:any)=>setDate(e.detail.value)}/>
                                </IonItem>

                            </IonCol>
                            <IonCol size="4">
                                <IonItem>
                                    <IonLabel position='floating' className="ion-text-wrap">
                                        Number of bedrooms
                                    </IonLabel>
                                    <IonSelect value={bedrooms} onIonChange={(value)=>setBedrooms(value.detail.value)}>
                                        {list.map((b:any) => (
                                            <IonSelectOption key={b} value={b}>{b}</IonSelectOption>
                                        ))
                                        }

                                    </IonSelect>
                                </IonItem>
                            </IonCol>

                            <IonCol size='4'>
                                <IonItem>
                                    <IonLabel position='floating' className="ion-text-wrap">
                                        Property Type
                                    </IonLabel>
                                    <IonSelect value={property_type} onIonChange={(value)=>setPropType(value.detail.value)}>
                                        {list_type.map((b:any) => (
                                            <IonSelectOption key={b} value={b}>{b}</IonSelectOption>
                                        ))
                                        }

                                    </IonSelect>
                                </IonItem>
                            </IonCol>


                        </IonRow>

                    </div>}
                    <IonButton onClick={e=>search()} size='small' expand='block' > Search
                        <IonIcon icon={searchOutline}/>
                    </IonButton>
                </div>

                {!searching && <div >
                {property[0].state === null &&
                    <Skeleton/>
                }
                {property[0]?.state === 'empty'  &&
                <div >
                    <IonImg src='./assets/img/dcbg.png'/>
                    <IonCard className='card  ion-no-margin'>
                        <div className={'ion-text-center '}>

                            <IonCardSubtitle className='ion-margin-top'><h1>My portfolio</h1></IonCardSubtitle>

                        </div>

                        <div  className={'ion-text-center ion-padding'}>



                            <IonCardContent>

                                It looks like you have no properties in your portfolio.
                                <div  >
                                    {getUser().user_type === 'Landlord' &&
                                    <IonButton size='small' onClick={e => {
                                        e.preventDefault();
                                        setIsProp(false);
                                        setProperties(false);
                                        props.history.push({
                                            pathname: '/manage-property',
                                            state: 'add-prop'
                                        })
                                    }}
                                               className='next' expand={'block'}>

                                        Next
                                    </IonButton>
                                    }
                                </div>


                            </IonCardContent>

                        </div>

                    </IonCard>
                </div> }
                {property[0]?.state !== null  && property[0].state !== 'empty' &&
                <div>
                    {property.map((proprty: any) => (
                            <IonCard className='ion-padding'
                                     key={proprty.id}
                                     onClick={e => {
                                         e.preventDefault();
                                         nav(proprty)
                                     }}>
                                <IonItem
                                    lines="none" detailIcon='none'   detail={true}>
                                    <IonAvatar  className='ion-avatar1' slot='start'>
                                        <IonImg src='./assets/img/no-image.png'/>
                                    </IonAvatar>
                                    <IonLabel className="ion-text-wrap ion-margin-start" >
                                        <h2 className='capitalize'>{proprty?.attributes?.title}</h2>
                                        <p>{proprty?.attributes?.street_address}</p>
                                        <p>Status: {proprty?.attributes?.status}</p>

                                    </IonLabel>
                                </IonItem>
                            </IonCard>
                        )
                    )}

                </div>
                }

                </div>}
            </IonContent>
            {user?.user_type === 'Landlord' && property[0].state === 'empty' &&
                    <IonFab   onClick={e => {
                e.preventDefault();
                setIsProp(false);
                setProperties(false);
                localStorage.removeItem('property_id');
                props.history.push({
                    pathname:'/manage-property',
                    state:'add-prop'
                })
            }} vertical="bottom" horizontal="end" slot="fixed">
                <IonFabButton  color="secondary">
                    <IonIcon icon={add} />
                </IonFabButton>
            </IonFab>

            }
            <IonLoading
                isOpen={showLoading}
                onDidDismiss={() => setShowLoading(false)}

            />
            <IonAlert
                isOpen={error}
                header={'Error'}
                message={"Something went wrong check "}
                buttons={[
                    {
                        text: 'okay',
                        handler: () => {

                        }
                    }]}
            />
        </IonPage>
    );
};


