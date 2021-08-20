import React, {useState} from 'react';
import './ExploreContainer.css';
import {IonToast} from "@ionic/react";

interface ControllerProps {
  msg:string
}

const ToastController: React.FC<ControllerProps> = ({ msg }) => {

  const [showToast, setShowToast] = useState(true);






  return (
<div>


  <IonToast
      isOpen={showToast}
      onDidDismiss={() => setShowToast(false)}
      message={msg}
      position={'top'}
      color={'warning'}

  />

</div>
  );
};

export default ToastController;
