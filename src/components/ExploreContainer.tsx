import React from 'react';
import './ExploreContainer.css';
import {IonImg, IonSlide, IonSlides, IonSpinner} from "@ionic/react";
import Dataset from "./dataset";
import {PropertyImagesStore} from "../Store/UserStore";

interface ContainerProps {
  id: any;
}

const Slides: React.FC<ContainerProps> = ({id}) => {
 const  data = Dataset(id);
 PropertyImagesStore.update((i)=>{
    i.images = data
 });
  return (
      <div>
      <div hidden={!data?.data}>
        <IonSlides className='ion-slides' key={data?.data?.length+Date.now()}  pager={true}    >
          {data?.data?.map((img:any, i:any) => {
                return (
                    <IonSlide key={i}>
                      <IonImg  src={img?.attributes?.description}/>
                    </IonSlide>
                )
              }

          )}

        </IonSlides>
      </div>
      <div hidden={data?.data}  className="ion-margin-top ion-text-center">
      <IonSpinner name='lines'>

      </IonSpinner>
      </div>
      </div>

  );


};

export default Slides;
