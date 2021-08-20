import './ExploreContainer.css';
import {IonAvatar, IonItem, IonLabel, IonList, IonListHeader, IonSkeletonText, IonThumbnail} from "@ionic/react";
import * as React from "react";



const Skeleton = () => {

  return(
      <div className='ion-margin'>


        <IonList>

          <IonItem>
            <IonThumbnail slot="start">
              <IonSkeletonText animated />
            </IonThumbnail>
            <IonLabel>
              <h3>
                <IonSkeletonText animated style={{ width: '50%' }} />
              </h3>
              <p>
                <IonSkeletonText animated style={{ width: '80%' }} />
              </p>
              <p>
                <IonSkeletonText animated style={{ width: '60%' }} />
              </p>
            </IonLabel>
          </IonItem>

        </IonList>
      </div>
  )
};

export default Skeleton
