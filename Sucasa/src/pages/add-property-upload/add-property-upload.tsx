import React, {useState} from 'react';
import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonLoading,
    IonPage,
    IonText,
    IonToast,
    IonToolbar, useIonViewDidEnter, useIonViewWillLeave
} from '@ionic/react';
import './add-property-upload.css';
import {camera, closeCircle} from "ionicons/icons";
import {uploadImage} from "../../api";
import firebase from 'firebase';
import Crop from "xcrop";
import FilerobotImageEditor from "filerobot-image-editor";
import {Camera, CameraResultType} from "@capacitor/core";


export default function  AddPropertyUpload (props:any)  {
    const [file, setFile] = useState<any>();
    const [ifFile, isFile] = useState(false);
    const [message, setMessage] = useState<any>(null);
    const [color, setColor] = useState<any>(null);
    const [showToast, setShowToast] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const [fileName,setFileName] = useState<any>();
    const [show, toggle] = useState(false);


    let propData : any = {};

      try {
          propData = JSON.parse(localStorage.propData);
      }

      catch (e) {

      }



    let storageRef = firebase.storage().ref();
    const options = {
        confirmText:"Crop",
        cancelText:"Cancel",



    };
    const crop = new Crop(options);

    const onBeforeComplete = function(props:any) {

       // upload(props.canvas.toDataURL());
      //  setShowLoading(true);
        isFile(true);
        setFile(props.canvas.toDataURL());
        return false;
    };

    crop.on('cancel', (crop:any) => {
        isFile(false);
        setFile(null);
        crop.hide()
    });
    crop.on('confirm', (crop:any) => {
        const canvas = crop.get({ format: 'base64' });
        setFile(canvas);
        isFile(true);
        setShowLoading(true);
        crop.hide()
    });

    useIonViewDidEnter(() => {

    });
        useIonViewWillLeave(()=>{

          setShowToast(false);
          setShowLoading(false);
          setColor(null);
          setMessage(null);
        });

    function  submit() {
        setShowLoading(true);
        uploadImage({
            src:file,
            title:propData.title,
            description:file,
            property_id:localStorage.getItem('property_id')
        }).then((res:any)=>{
            setColor('success');
            setMessage('Image uploaded successful. Add another image');
            setShowLoading(false);
            setFile(null);
            isFile(false);
            setShowToast(true);

        }).catch(()=>{
            setColor('danger');
            setMessage('Image uploaded failed please try again');
            setShowLoading(false);
            setShowToast(true);
        })


    }


  function  upload(image:any){
        // Upload file and metadata to the object 'images/mountains.jpg'
      const uploadTask = storageRef.child('images/' + fileName).putString(image, 'data_url');

// Listen for state changes, errors, and completion of the upload.
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
            (snapshot:any) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                        console.log('Upload is paused');
                        break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                        console.log('Upload is running');
                        break;

                    default:
                        setColor('danger');
                        setMessage('Image uploaded failed please try again');
                        setShowLoading(false);
                        setShowToast(true);
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
                }
            },
            () => {
                // Upload completed successfully, now we can get the download URL
                uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL:any) {
                    console.log('File available at', downloadURL);

                    setFile(downloadURL);

                    setShowLoading(false)
                });
            }
        );
    }
    const onChange = ((file:any) => {

        let imagePreview =
            URL.createObjectURL(file.target.files[0]);
        setFile(imagePreview);
        file.preventDefault();

        setFileName(file.target.files[0].name);
        toggle(true);
          //  crop.load(file.target.files[0]);
            // setShowModal(true);

        // Create the file metadata





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
        setFile(image.webPath);


        setFileName(Date.now);
        toggle(true);

    }

    function onComplete(res:any) {
        console.log(res)
    }

    return (
        <IonPage>
            {!show &&  <IonHeader className="ion-no-border">
                <IonToolbar  >
                    <IonButtons slot="start">
                        <IonBackButton defaultHref={'./property-type'} color='dark'  text=''/>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>}
            <IonContent fullscreen>
                {!show &&  <div>
                <div className={'ion-text-center '}>

                    <h2>Add your property</h2>

                </div>
                <div className={'ion-text-center ion-padding'}>
                    <IonText>
                        Adding photos of your property will attract more tenants. We suggest you include all rooms and any outside space your property has.

                    </IonText>

                </div>



                <div className='ion-padding'>

                    <div className='image-upload'>
                        <div className='vertical'>

                            <div hidden={!ifFile}>
                                <IonIcon className='icon'  onClick={()=> {
                                    setFile(null);
                                    isFile(false);
                                    storageRef.storage.refFromURL(file).delete().catch();


                                }} color='danger' size={'large'} icon={closeCircle}/>
                                <img  className='image2 ion-margin-bottom' src={file} alt={'imae'}/>

                            </div>
                            <div hidden={ifFile}>
                                <label htmlFor="image">
                                    <IonIcon onClick={(e)=>takePicture()} size={'large'} icon={camera}/>

                                    Add Photo
                                </label>


                            </div>
                        </div>

                        <IonButton hidden={!ifFile}  onClick={e => {
                            e.preventDefault();
                            submit()
                        }}   color='medium' fill='outline' expand={'block'}>
                            Submit Image
                        </IonButton>
                        <IonButton  onClick={e => {
                            e.preventDefault();
                            props.history.push('/property-images');
                        }}   color='medium' fill='outline' expand={'block'}>
                            Skip
                        </IonButton>


                        <IonButton    onClick={e => {
                            e.preventDefault();
                            props.history.push('/property-images')
                        }} className={'next'} expand={'block'}>
                            Next
                        </IonButton>
                    </div>
                </div>
                </div>}

                {show && <div>
                    <FilerobotImageEditor
                        show={show}
                        src={file}
                        config={
                            {
                                tools: ['rotate', 'crop']
                                , finishButtonLabel: 'Save'
                                , reduceBeforeEdit: {
                                    mode: 'auto'
                                },


                                cropPresets: [],
                                minCropAreaWidth:0,
                                minCropAreaHeight:0
                            }
                        }
                        onBeforeComplete={(p: any) => onBeforeComplete(p)}
                        onClose={() => {
                            toggle(false);
                        }}
                    />
                </div>
                }
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

            </IonContent>
        </IonPage>
    );
};


