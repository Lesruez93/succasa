import React, {useState} from 'react';
import './ExploreContainer.css';
import {IonAvatar, IonImg, IonSlide, IonSlides, IonSpinner} from "@ionic/react";
import Dataset from "./dataset";
import {PropertyImagesStore} from "../Store/UserStore";

interface ContainerProps {
  id: any;
}

const Avatar: React.FC<ContainerProps> = ({id}) => {

const [image,setImage]= useState<any>(id);
  return (
     <IonImg src={image || 'x'} onIonError={()=>setImage('./assets/img/pic.png')} >

     </IonImg>

  );


};

export default Avatar;
