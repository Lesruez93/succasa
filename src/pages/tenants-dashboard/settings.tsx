import React, {useState} from 'react';
import {
    IonAvatar,
    IonBackButton,
    IonButton,
    IonButtons,
    IonCard, IonCardContent,
    IonCardSubtitle,
    IonContent,
    IonFooter,
    IonIcon,
    IonImg,
    IonItem,
    IonLabel,
    IonLoading,
    IonModal,
    IonPage, IonTitle,
    IonToast,
    IonToolbar
} from '@ionic/react';
import './tenants-dashboard.css';


import {
    cameraOutline, cardOutline,
    cashOutline,
    eyeOutline, home,
    imageOutline,
    mailOutline, notificationsCircle, pencil,
    personOutline,
    powerOutline, trendingUpOutline
} from "ionicons/icons";

import Crop from 'xcrop'
import firebase from "firebase";
import useSWR from "swr";
import {fetcher, fetcherOption, getUser, updateData} from "../../api";
import { Plugins, CameraResultType } from '@capacitor/core';
import Avatar from "../../components/Avatar";
const { Camera } = Plugins;


export default function Settings (props:any)  {
    const  [profile,setProfile] = useState<any>(null);
    const [popoverState, setShowPopover] = useState({ showPopover: false, event: undefined });
    const [showModalOptions, setShowModalOptions] = useState(false);
    const [fileName,setFileName] = useState<any>();
    const [image, setImage] = useState<any>('');
    const [showToast, setShowToast] = useState(false);
    const [progress, setProgress] = useState<any>(0);
    const [message, setMessage] = useState<any>(null);
    const [color, setColor] = useState<any>(null);
    const { data, error } = useSWR('auth/user', fetcher,fetcherOption);

    const [showLoading, setShowLoading] = useState(false);
let prog: any = 0;

    function imageUpload(file:any){
        let storageRef = firebase.storage().ref();

        setShowLoading(true);
// Upload file and metadata to the object 'images/mountains.jpg'
        const uploadTask = storageRef.child('images/' +fileName).putString(file,'data_url');

// Listen for state changes, errors, and completion of the upload.
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
            (snapshot:any) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + prog + '% done');
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                        console.log('Upload is paused');
                        break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                        console.log('Upload is running');
                        break;
                }
            },
            (error:any) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;
                    case 'storage/canceled':
                        // User canceled the upload
                        break;

                    // ...

                    case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        break;
                    default:    setColor('danger');
                        setMessage('Update failed please try again');
                        setShowToast(true);
                        setShowLoading(false)
                }
            },
            () => {
                // Upload completed successfully, now we can get the download URL
                uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL:any) {
                    // setColor('success');
                    // setMessage('Profile Photo Updated Successfully');
                    // setShowToast(true);
                    // setShowLoading(false);
                    // data.profile_photo_path = downloadURL;
                    //setProfile({profile_photo_path:downloadURL})
                    updateData({profile_photo_path:downloadURL},'users',data.id.toString()).then(r=>{
                        setColor('success');
                        setMessage('Profile Photo Updated Successfully');
                        setShowToast(true);
                        setShowLoading(false);
                        //profile.profile_photo_path = downloadURL;
                        data.profile_photo_path = downloadURL;

                    }).catch(()=>{
                        setColor('danger');
                        setMessage('Update failed please try again');
                        setShowToast(true);
                        setShowLoading(false)

                    });



                });
            }
        );

    }
    const options = {
        confirmText:"Crop",
        cancelText:"Cancel",
        circle:true
    };
    const crop = new Crop(options);


    const onChange = (e: any) => {
        e.preventDefault();
        let files:any;
        setFileName(e.target.files[0].name)
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {


            crop.load(files[0]);
           // setShowModal(true);
            setShowModalOptions(false)
        };
        reader.readAsDataURL(files[0]);
    };

    crop.on('cancel', (crop:any) => {
        crop.hide()
    });
    crop.on('confirm', (crop:any) => {
        const canvas = crop.get({ format: 'base64' });
        setImage(canvas);

        imageUpload(canvas);
        crop.hide()
    });



 async function takePicture() {
        const image = await Camera.getPhoto({
            quality: 90,
            allowEditing: false,
            resultType: CameraResultType.Uri
        });
        // image.webPath will contain a path that can be set as an image src.
        // You can access the original file using image.path, which can be
        // passed to the Filesystem API to read the raw data of the image,
        // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
        setFileName(Date.now());
     crop.load(image.webPath);
     // setShowModal(true);
     setShowModalOptions(false)

        // Can be set to the src of an image now

    }

    return (
        <IonPage>

            <IonToolbar color='medium' >

                <IonButtons slot="start">
                    <IonBackButton defaultHref={'./tabs/dashboard'} color='light'  text=''/>
                </IonButtons>
                <IonTitle>
                    My Profile
                </IonTitle>
            </IonToolbar>

            <IonContent >
                <div className='vertical-center ion-margin-top'>

                    <IonAvatar onClick={()=>takePicture()} className='avatar'>
                        <Avatar id={data?.profile_photo_path}/>
                    </IonAvatar>

                </div>
                <div className={'ion-text-center'}>


                    <h2>{data?.name}</h2>
                    {data?.user_type &&
                    <IonButton  onClick={()=>{

                    }} size={'small'} color={'medium'} fill={'solid'}>
                        {data?.user_type}
                    </IonButton>}
                    {/*<IonButton onClick={() => setShowModal(true)}>Show Modal</IonButton>*/}
                </div>

                <IonCard className={'ion-padding'}>
                    <IonItem routerLink={
                        './address-edit'
                    } color={'none'} detail={true} lines={'none'}>
                        <IonIcon slot={'start'}  color={'medium'} icon={home}/>

                        <IonLabel> <div>
                            <IonCardSubtitle>   <h2><strong>My home</strong></h2></IonCardSubtitle>
                            <p>{data?.street_address}</p>
                        </div></IonLabel>
                    </IonItem>
                </IonCard>

                <div>
                    <IonCard >
                        <IonItem color={'none'} detail={true} lines={'none'}>
                            <IonIcon slot={'start'}  color={'medium'} icon={mailOutline}/>
                            <IonLabel > <div>
                                <h2>Invite your landlord</h2>
                                <p>Send a magic link for them to join</p>
                            </div></IonLabel>
                        </IonItem>
                    </IonCard>


                    {getUser().user_type === 'Landlord'&&       <IonCard >
                        <IonItem onClick={(e)=>{
                            e.preventDefault();
                            props.history.push({
                                pathname:'./payment-methods',
                                state:'update'
                            })}
                        } color={'none'} detail={true} lines={'none'}>
                            <IonIcon slot={'start'}  color={'medium'} icon={cashOutline}/>
                            <IonLabel > <div>
                                <h2>Payment Methods</h2>
                                <p>Paypal</p>
                            </div></IonLabel>
                        </IonItem>
                    </IonCard>}

                    {getUser().user_type === 'Landlord'&&       <IonCard >
                        <IonItem routerLink={'./my-subscriptions'} color={'none'} detail={true} lines={'none'}>
                            <IonIcon slot={'start'}  color={'medium'} icon={cardOutline}/>
                            <IonLabel > <div>
                                <h2>My Subscriptions</h2>
                                <p>Free subscription package</p>
                            </div></IonLabel>
                        </IonItem>
                    </IonCard>}


                    <IonCard >
                        <IonItem
                            routerLink={'/booking-calendar'}
                            color={'none'} detail={true} lines={'none'}>
                            <IonIcon slot={'start'}  color={'medium'} icon={eyeOutline}/>
                            <IonLabel > <div>
                                <h2>My viewings</h2>
                                <p>Check and amend appointments</p>
                            </div></IonLabel>
                        </IonItem>
                    </IonCard>

                    <IonCard >
                        <IonItem
                            routerLink={'./notifications'}
                            color={'none'} detail={true} lines={'none'}>
                            <IonIcon slot={'start'}  color={'medium'} icon={notificationsCircle}/>
                            <IonLabel > <div>
                                <h2>My Notifications</h2>
                                <p>You have 5 unopened notifications</p>
                            </div></IonLabel>
                        </IonItem>
                    </IonCard>

                    <IonCard >
                        <IonItem  onClick={e => {
                            e.preventDefault();
                            props.history.push('/my-details');
                        }}  color={'none'} detail={true} lines={'none'}>
                            <IonIcon slot={'start'}  color={'medium'} icon={personOutline}/>
                            <IonLabel > <div>
                                <h2>My details</h2>
                                <p>Name, date of birth, email…</p>
                            </div></IonLabel>
                        </IonItem>


                    </IonCard>

                    <IonCard >
                        <IonItem  onClick={e => {
                            e.preventDefault();
                            props.history.push('/stats');
                        }}  color={'none'} detail={true} lines={'none'}>
                            <IonIcon slot={'start'}  color={'medium'} icon={trendingUpOutline}/>
                            <IonLabel > <div>
                                <h2>My Stats</h2>

                            </div></IonLabel>
                        </IonItem>


                    </IonCard>

                    <IonCard >
                        <IonItem  onClick={e => {
                            e.preventDefault();
                            props.history.push('/feedback');
                        }}  color={'none'} detail={true} lines={'none'}>
                            <IonIcon slot={'start'}  color={'medium'} icon={pencil}/>
                            <IonLabel > <div>
                                <h2>Feedback</h2>

                            </div></IonLabel>
                        </IonItem>


                    </IonCard>


                    <IonCard >  <IonItem onClick={e=>{
                    e.preventDefault();
                    localStorage.clear();
                        firebase.auth().signOut();
                    props.history.replace('/');
                    setProfile(null)
                }} lines="full">
                    <IonLabel color="danger">
                        Logout
                    </IonLabel>
                    <IonIcon slot="start"  icon={powerOutline} color="danger"/>
                </IonItem>
                    </IonCard>
                </div>





                <IonModal  isOpen={showModalOptions} cssClass='custom-class1' >
                    <IonContent className='trans-bg' fullscreen onClick={()=>{
                        setShowModalOptions(false)
                    }}>
                    </IonContent>
                    <IonFooter class="ion-no-border ion-padding foot">
                        <IonItem lines="full">
                            <div slot="start" >
                                <label htmlFor="image1">
                                    <IonIcon size="large" color="primary" icon={imageOutline}/>
                                </label>

                                <input className="filetype" type="file" id="image1" accept="image/x-png,image/jpeg,image/"   onChange={onChange}  />
                            </div>
                            <label htmlFor="image1">Select Image</label>

                        </IonItem>

                        <IonItem onClick={(e)=>takePicture()} lines="full">
                            <div slot="start" >
                                <label htmlFor="cameraInput">
                                    <IonIcon size="large" color="primary" icon={cameraOutline}/>
                                </label>

                            </div>
                            <label htmlFor="cameraInput">Take Picture</label>

                        </IonItem>



                    </IonFooter>
                </IonModal>
                <div>
                    <IonLoading

                        isOpen={showLoading}
                        onDidDismiss={() => setShowLoading(false)}



                    />

                    <IonToast
                        isOpen={showToast}
                        onDidDismiss={() => setShowToast(false)}
                        message={message}
                        position={'top'}
                        color={color}
                        duration={2000}
                    />

                </div>
            </IonContent>
        </IonPage>
    );
};


