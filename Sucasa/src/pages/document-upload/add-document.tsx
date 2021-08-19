import React, {useState} from 'react';
import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon, IonImg,
    IonLoading,
    IonPage,
    IonText,
    IonToast,
    IonToolbar,
    useIonViewDidEnter,
    useIonViewWillLeave
} from '@ionic/react';
import './add-document.css';
import {camera, closeCircle} from "ionicons/icons";
import firebase from 'firebase';
import {uploadDocument} from '../../api';


export default function  AddDocument (props:any)  {
    const [file, setFile] = useState<any>(null);
    const [ifFile, isFile] = useState(false);
    const [message, setMessage] = useState<any>(null);
    const [color, setColor] = useState<any>(null);
    const [showToast, setShowToast] = useState(false);
    const [showLoading, setShowLoading] = useState(false);


    let data:any ={};
    data= props.history.location.state;

    let storageRef = firebase.storage().ref();
    useIonViewDidEnter(() => {

    });
        useIonViewWillLeave(()=>{
          console.log('Leaving');
          setShowToast(false);
          setShowLoading(false);
          setColor(null);

            setFile(null);
          setMessage(null);
        });

    function  submit() {
        setShowLoading(true);
        uploadDocument({
            url:file,
            name:data.document,
            document_type_id:data.id,
            property_id:localStorage.getItem('property_id')
        }).then((res:any)=>{
            setColor('success');
            setMessage('Document uploaded successful. Add another image');
            setShowLoading(false);
            setFile(null);

            isFile(false);
            setShowToast(true);
            setTimeout(()=>{
                props.history.push(data.url)
            },1000);


        }).catch(()=>{
            setColor('danger');
            setMessage('Image uploaded failed please try again');
            setShowLoading(false);
            setShowToast(true);
        })


    }

    const onChange = ((file:any) => {
        setShowLoading(true);


        // Create the file metadata
        var metadata = {
            contentType: 'image/jpeg'
        };

// Upload file and metadata to the object 'images/mountains.jpg'
        var uploadTask = storageRef.child('documents/' + file.target.files[0].name).put(file.target.files[0], metadata);

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
                    isFile(true);

                   setShowLoading(false)
                });
            }
        );



    });

    return (
        <IonPage>
            <IonHeader className="ion-no-border">
                <IonToolbar  >
                    <IonButtons slot="start">
                        <IonBackButton defaultHref={'./my-documents'} color='dark'  text=''/>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>

                <div className={'ion-text-center '}>

                    <h2>{data?.document}</h2>

                </div>
                <div className={'ion-text-center ion-padding'}>
                    <IonText>
                        Upload  Picture
                        Here are a few tips on how your document uploads should look
                    </IonText>




                </div>
                <ul>
                    <li>Photo must not be blurry</li>
                    <li>All 4 corners must be visible</li>
                    <li>Make sure the photo is not covered anywhere</li>

                </ul>

                <div className='ion-padding'>

                    <div className='image-upload'>
                        <div className='vertical'>

                            <div hidden={!ifFile}>
                                <IonIcon className='icon'  onClick={()=> {

                                    storageRef.storage.refFromURL(file).delete();
                                    setFile(null);
                                    isFile(false);
                                }} color='danger' size={'large'} icon={closeCircle}/>
                                <IonImg className='image2 ion-margin-bottom' src={file} alt={'imae'}/>

                            </div>
                            <div hidden={ifFile}>
                                <label htmlFor="image">
                                    <IonIcon size={'large'} icon={camera}/>

                                    Add Photo
                                </label>

                                <input type="file"  accept="image/*"   onChange={(event) => onChange(event)} className="filetype" id="image"/>

                            </div>
                        </div>

                        <IonButton hidden={!ifFile}  onClick={e => {
                            e.preventDefault();
                            submit()
                        }}   color='medium' fill='outline' expand={'block'}>
                            Submit Image
                        </IonButton>




                    </div>
                </div>
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

