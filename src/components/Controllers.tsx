import React, {useState} from 'react';
import './ExploreContainer.css';
import {IonContent, IonLoading, IonPage, IonToast} from "@ionic/react";

interface ControllerProps {
  state:boolean
}

const LoaderController: React.FC= () => {

  const [showLoading, setShowLoading] = useState(true);






  return (
<div>


  <IonLoading

      isOpen={showLoading}
      onDidDismiss={() => setShowLoading(false)}
      message={'Please wait...'}

  />

</div>
  );
};

export default LoaderController;
