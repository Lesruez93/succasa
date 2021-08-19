import React, {useCallback, useEffect, useState} from 'react';
import {
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    useIonViewDidEnter
} from '@ionic/react';
import Gallery from "react-photo-gallery";
import './photos.css';
import Lightbox from "react-awesome-lightbox";
import "react-awesome-lightbox/build/style.css";
import Dataset from "../../components/dataset";
import {PropertyIdStore, PropertyImagesStore} from "../../Store/UserStore";

export default function  Photos (props:any) {
    const [currentImage, setCurrentImage] = useState(1);
    const [viewerIsOpen, setViewerIsOpen] = useState(false);
    const propertyId = PropertyIdStore.useState(s => s.propertyId);
    const propertyImages = PropertyImagesStore.useState(s => s.images);

    const [p,setP] =  useState<any>(propertyImages);
    const [photos, setPhotos]  = useState<any>( []);
    //setP(Dataset(propertyId));}

        useIonViewDidEnter(()=>{

            let pcs = [];
            for (let photos of p.data){
                let obj = {
                    src:photos.attributes.src,
                    url:photos.attributes.src,
                    width: 4,
                    height: 3
                };

                pcs.push(obj)
            }

            setPhotos(pcs)

        },[p, propertyId]);


    const openLightbox = useCallback((event, { photo, index }) => {
        setCurrentImage(index);

        setViewerIsOpen(true);
    }, []);

    const closeLightbox = () => {
        setCurrentImage(0);
        setViewerIsOpen(false);
    };

    return (
    <IonPage>

        <IonContent >
            <IonHeader>
                <IonToolbar color='medium' >
                    <IonButtons slot="start">
                        <IonBackButton defaultHref={'./welcome'} color='light'  text=''/>
                    </IonButtons>
                    <IonTitle>Property Photos</IonTitle>
                </IonToolbar>
            </IonHeader>

            <div>
                <Gallery photos={photos} onClick={openLightbox} />
                <div>
                    {viewerIsOpen ? (
                        <Lightbox startIndex={currentImage} doubleClickZoom={2} showTitle={false} onClose={()=>closeLightbox()} images={photos}/>
                        ) : null}
                </div>
            </div>

      </IonContent>
    </IonPage>
  );
};


