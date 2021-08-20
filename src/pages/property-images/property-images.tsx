import React, {useState} from 'react';

import {
    IonActionSheet,
    IonBackButton,
    IonButton,
    IonButtons,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonIcon,
    IonImg,
    IonLoading,
    IonPage,
    IonRow,
    IonText,
    IonToast,
    IonToolbar,
    useIonViewDidEnter
} from '@ionic/react';
import './property-images.css';
import {close, removeCircleOutline, trash} from "ionicons/icons";
import {deleteRequest, getApiRequest} from "../../api";
import firebase from "firebase";

export default function PropertyImages(props:any) {


    const [showActionSheet, setShowActionSheet] = useState(false);
    const [imageId, setImageId] = useState<any>('2');
    const [message, setMessage] = useState<any>(null);
    const [color, setColor] = useState<any>(null);
    const [showToast, setShowToast] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const [images, setImages] = useState<any>(null);
    const db =firebase.firestore();

    useIonViewDidEnter(async () => {
      await loadData()
    });

    function next() {
        const id:any = localStorage.getItem('property_id');
        db.collection('properties').doc(id).update({requirement:true,images:true}).then();
        props.history.push({
            pathname:'/manage-property',
            state:'t'
        });

    }

    function loadData() {
        getApiRequest('propertyimages?filter[property_id]=' + localStorage.getItem('property_id'))
            .then((res: any) => {
                console.log(res);
                setImages(res.data.data);
                setShowLoading(false);
            }, error => {
                setColor('warning');
                setMessage('No images found. please upload images');
                setShowLoading(false);
                setShowToast(true);
            })
    }

    function deleteImage(imageId: any) {
        setShowLoading(true);
        deleteRequest('propertyimages', imageId).then(() => {
            setColor('success');
            setMessage('Image deleted');
            setShowLoading(false);
            setShowToast(true);
            loadData();

        }, onerror => {
            setColor('danger');
            setMessage('Failed please try again');
            setShowLoading(false);
            setShowToast(true);
        })
    }

    //  let newData = JSON.parse(localStorage.userData);
    return (
        <IonPage>
            <IonHeader className="ion-no-border">
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref={'./add-property-upload'} color='dark' text=''/>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <div className={'ion-text-center '}>

                    <h2>Add your property</h2>

                </div>

                <IonGrid>
                    <div className={'ion-text-center ion-padding'}>
                        <IonText>
                            Adding photos of your property will attract more tenants. We suggest you include all rooms
                            and any outside space your property has.
                        </IonText>

                    </div>
                    <IonRow  hidden={!images}>
                        {images?.map((image: any) => (
                            <IonCol key={image.id} size="4">
                                <IonIcon onClick={(e) => {
                                    e.preventDefault();
                                    setImageId(image.id);
                                    setShowActionSheet(true);

                                }} color='danger' size='large' icon={removeCircleOutline}/>

                                <IonImg src={image?.attributes?.src}/>
                            </IonCol>))}

                    </IonRow>
                    <div hidden={images}  className="ion-margin-top ion-text-center">
                        <IonImg  className="pic" src={'./assets/img/loader.gif'}>

                        </IonImg>
                    </div>
                </IonGrid>
                <div className={'ion-padding'}>
                    <IonButton onClick={e => {
                        e.preventDefault();



                        next()
                    }} className={'next'} expand={'block'}>

                        Next
                    </IonButton>
                </div>

                <IonActionSheet
                    isOpen={showActionSheet}
                    onDidDismiss={() => setShowActionSheet(false)}
                    cssClass='my-custom-class'
                    buttons={[{
                        text: 'Delete',
                        role: 'destructive',
                        icon: trash,
                        handler: () => {
                            deleteImage(imageId)
                        }
                    },
                        {
                            text: 'Cancel',
                            icon: close,
                            role: 'cancel',
                            handler: () => {
                                console.log('Cancel clicked');
                            }
                        }]}>

                </IonActionSheet>
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
}



