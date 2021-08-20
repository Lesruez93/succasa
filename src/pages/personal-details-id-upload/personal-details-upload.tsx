import React, {useState} from 'react';
import {
    IonAlert,
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonLoading,
    IonPage,
    IonText,
    IonToolbar,
    useIonViewWillEnter
} from '@ionic/react';
import './personal-details-id-upload.css';
import {camera, closeCircle} from "ionicons/icons";
import firebase from 'firebase';
import {getUser, postData, postDataID} from "../../api";


export default function  PersonalDetailsIdUpload(props:any) {
    const [file, setFile] = useState<any>(null);
    const [message, setMessage] = useState<any>({});
    const [showAlert, setShowAlert] = useState<any>(false);
    const [showAlert1, setShowAlert1] = useState<any>(false);
    const [ifFile, isFile] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    let newData :any = {} ;
    useIonViewWillEnter(()=>{
        try {
            newData = JSON.parse(localStorage.user);
        }catch (e) {
            console.log(e)
        }
    });
    let storageRef = firebase.storage().ref();


    function  submit() {
        newData.id_document = file;
        newData.id_type_id = props.location.state.data;
        localStorage.setItem('user', JSON.stringify(newData));
        localStorage.setItem('idverified','true');
        props.history.push(
            './welcome'
        );
    }

    function verifyDoc(downloadURL: any) {

        const data = {

            "user_id": getUser().id,
            "document": downloadURL
        };
        postData(data, 'kycs').then((resp: any) => {

            setTimeout(()=>{
                setShowLoading(false);

            },1000)
            setTimeout(() => {
                setMessage({
                    message: ' Verifying ID ..',
                    status:''

                });

                setShowLoading(true);

                postDataID({}, 'kycs/'+resp.data.data.id+'/verify').then((res: any) => {

                    setShowLoading(true);
                    if (res.data.data.attributes.status === 'verified') {
                        setMessage({
                            message: 'ID verified successfully',
                            status: "Success"
                        });
                        // clearInterval(i);
                        setShowLoading(false);
                        setShowAlert(true)
                    } else if (res.data.attributes.status === 'unverified') {
                        setMessage({
                                message: 'ID verification failed pleas try Again',
                                status: "Failed"
                            }
                        );

                        setShowAlert1(true);

                        // clearInterval(i);
                        setShowLoading(false);
                    }
                }).catch(e => {
                    console.log(e);
                    setMessage({
                            message: 'ID verification failed pleas try Again',
                            status: "Failed"
                        }
                    );

                    setShowAlert1(true);

                    // clearInterval(i);
                    setShowLoading(false);
                    storageRef.storage.refFromURL(file).delete();
                })
            }, 2000)

        }).catch(() => {
            setShowLoading(false)
        })
    }



    const onChange = ((file:any) => {
        setMessage({
            message: ' Uploading ID ..',
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
                    verifyDoc(downloadURL);


                });
            }
        );



    });

    function skip() {
        props.history.push('./welcome')
    }



    return (
        <IonPage>
            <IonHeader className="ion-no-border">
                <IonToolbar  >
                    <IonButtons slot="start">
                        <IonBackButton defaultHref={'./personal-details-id'} color='dark'  text=''/>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>

                <div className={'ion-text-center '}>

                    <h2>Personal Details</h2>

                </div>
                <div  hidden={ifFile}>
                <div className={'ion-text-center ion-padding'}>
                    <IonText>
                        Here are a few tips on how your photo ID should look
                    </IonText>

                </div>
                <div className={'ion-margin-top ion-padding'}>
                    <img  className={'image'} src={'./assets/img/id.png'} alt={'ID'}/>
                </div>

                <ul>
                    <li>Photo must not be blurry</li>
                    <li>All four corners must be visible</li>
                    <li>Make sure the photo is not covered anywhere</li>
                </ul>
                </div>
                <div className='image-upload'>
                    <div className='vertical'>

                        <div hidden={!ifFile}>
                            <IonIcon className='icon'  onClick={()=> {
                                setFile(null);
                                isFile(false);
                                storageRef.storage.refFromURL(file).delete();
                            }} color='danger' size={'large'} icon={closeCircle}/>
                            <img  className='image2 ion-margin-bottom' src={file} alt={'ID'}/>

                        </div>
                        <div hidden={ifFile}>
                            <label htmlFor="image">
                                <IonIcon size={'large'} icon={camera}/>

                                Add Photo
                            </label>

                            <input type="file"  accept="image/*"   onChange={(event) => onChange(event)} className="filetype" id="image"/>

                        </div>
                    </div>



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
            <IonButton   onClick={e => {
                e.preventDefault();
                skip()

            }}  color='medium' fill='outline' expand={'block'}>
                Skip for now
            </IonButton>
        </IonPage>
    );
};

