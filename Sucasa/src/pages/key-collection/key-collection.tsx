import React, {useState} from 'react';
import {
    IonAlert,
    IonBackButton,
    IonButton,
    IonButtons, IonCol,
    IonContent, IonGrid,
    IonHeader,
    IonIcon, IonItem, IonLabel, IonListHeader,
    IonLoading,
    IonPage, IonRadio, IonRadioGroup, IonRow, IonSelect, IonSelectOption,
    IonText, IonTitle,
    IonToolbar,
    useIonViewWillEnter
} from '@ionic/react';
import {camera, closeCircle} from "ionicons/icons";
import firebase from 'firebase';
import {toast} from "../../api";


export default function  KeyCollection(props:any) {
    const [file, setFile] = useState<any>(null);
    const [numOfKeys, setNumOfKeys] = useState<any>(null);
    const [message, setMessage] = useState<any>({});
    const [showAlert, setShowAlert] = useState<any>(false);
    const [showAlert1, setShowAlert1] = useState<any>(false);
    const [ifFile, isFile] = useState(false);
    const [key, setKeys] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    let list:any = ['1','2','3','4'];

    useIonViewWillEnter(()=>{

    });
    let storageRef = firebase.storage().ref();


    function  submit() {

        localStorage.setItem('idverified','true');
        props.history.push(
            './welcome'
        );
    }




    const onChange = ((file:any) => {
        setMessage({
            message: ' Uploading image ..',
            status:''

        });
        setShowLoading(true);

        let imagePreview =
            URL.createObjectURL(file.target.files[0]);
        setFile(imagePreview);


        isFile(true);
        // Create the file metadata
        var metadata = {
            contentType: 'image/jpeg'
        };

// Upload file and metadata to the object 'images/mountains.jpg'
        var uploadTask = storageRef.child('images/' + file.target.files[0].name).put(file.target.files[0], metadata);

// Listen for state changes, errors, and completion of the upload.
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
            (snapshot:any) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                toast('Upload is ' + progress + '% done');
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

                switch (error.code) {
                    case 'storage/unauthorized':
                        toast("User doesn't have permission to access the object")
                        setShowLoading(false);
                        break;
                    case 'storage/canceled':
                        toast("User canceled the upload")
                        setShowLoading(false);
                        break;



                    case 'storage/unknown':
                        toast("Unknown error occurred, inspect error.serverResponse")
                        setShowLoading(false);
                        break;
                }
            },
            () => {
                // Upload completed successfully, now we can get the download URL
                uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL:any) {
                    setShowLoading(false);
                    setFile(downloadURL);



                });
            }
        );



    });





    return (
        <IonPage>
            <IonHeader className="ion-no-border">
                <IonToolbar color='medium'  >
                    <IonButtons slot="start">
                        <IonBackButton defaultHref={'./personal-details-id'} color='dark'  text=''/>
                    </IonButtons>
                    <IonTitle>Keys collection</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>


                <div className='image-upload ion-margin-top'>
                    <IonItem  className="ion-margin-bottom"  color={'none'} lines={'none'}>
                        <IonLabel position={'stacked'} >How many keys in total have you collected?</IonLabel>
                        <IonSelect placeholder='Please select' value={numOfKeys} className='input-select ion-padding-start' onIonChange={y => setNumOfKeys(y.detail.value)}  >
                            {list.map((ad:any)=>(<IonSelectOption key={ad} value={ad} >
                                {ad}

                            </IonSelectOption>)) }
                        </IonSelect>
                    </IonItem>
                    <IonRadioGroup value={key} onIonChange={e => setKeys(e.detail.value)}>
                        <IonListHeader>
                            <IonLabel>Have you tested all the keys?</IonLabel>
                        </IonListHeader>
                        <IonGrid>
                            <IonRow>
                                <IonCol>
                                    <IonItem lines={'none'}>
                                        <IonLabel>Yes</IonLabel>
                                        <IonRadio mode={'md'}  slot="start" value={1} />
                                    </IonItem>
                                </IonCol>
                                <IonCol>
                                    <IonItem lines={'none'}>
                                        <IonLabel>No</IonLabel>
                                        <IonRadio className={'ion-radio'} mode={'md'} slot="start" value={2} />
                                    </IonItem>
                                </IonCol>
                            </IonRow>
                        </IonGrid>


                    </IonRadioGroup>
                    <div className='vertical'>

                        <div hidden={!ifFile}>
                            <IonIcon className='icon'  onClick={()=> {
                                setFile(null);
                                isFile(false);
                                storageRef.storage.refFromURL(file).delete();
                            }} color='danger' size={'large'} icon={closeCircle}/>
                            <img  className='image2 ion-margin-bottom' src={file} alt={'ID'}/>

                        </div>
                        <div  hidden={ifFile}>
                            <div className='ion-text-center ion-margin'>
                                <IonText>
                                    Please take a photo of the keys you have collected’. Show camera icon
                                </IonText>

                            </div>
                            <div className='ion-text-center ion-margin'>
                            <label htmlFor="image">
                                <IonIcon size={'large'} icon={camera}/>

                                Add Photo
                            </label>

                            <input type="file"  accept="image/*"   onChange={(event) => onChange(event)} className="filetype" id="image"/>
                            </div>
                        </div>
                    </div>


                    <IonButton color='medium'   className='ion-padding' onClick={() => {
                    }} size='small' expand={'block'}>

                        Continue
                    </IonButton>
                </div>
                <IonLoading
                    cssClass='my-custom-class'
                    isOpen={showLoading}
                    onDidDismiss={() => setShowLoading(false)}
                    message={'Please wait ... '+message.message}

                />
            </IonContent>
            <IonAlert
                isOpen={showAlert}
                onDidDismiss={() => setShowAlert(false)}
                header={message.status}
                message={message.message}
                buttons={[
                    {
                        text: 'Continue',
                        handler: () => {
                            submit()
                        }
                    }]}
            />
            <IonAlert
                isOpen={showAlert1}
                onDidDismiss={() => setShowAlert1(false)}
                header={message.status}
                message={message.message}
                buttons={[
                    {
                        text: 'Try Again',
                        handler: () => {
                            setFile(null);
                            isFile(false)
                        }
                    }]}
            />

        </IonPage>
    );
};

