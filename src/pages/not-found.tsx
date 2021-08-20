import React, {useState} from 'react';
import {
    IonBackButton,
    IonButton, IonButtons,
    IonCard,
    IonCardContent,
    IonCardSubtitle,
    IonContent,
    IonHeader,
    IonImg,
    IonPage,
    IonTitle,
    IonToolbar
} from '@ionic/react';


export default function  NotFound (props:any)  {

    const  [properties,setProperties] = useState<any>([]);
    const [isProp, setIsProp] = useState<any>(false);
    const [empty, setEmpty] = useState<any>(false);
    const [loader, setLoader] = useState<any>(true);
    const [searchText, setSearchText] = useState('');




    return (
        <IonPage>
            <IonHeader >
                <IonToolbar color="medium">
                    <IonTitle>404</IonTitle>
                    <IonButtons slot="start">
                        <IonBackButton color='light' defaultHref='../' text=''/>
                    </IonButtons>
                </IonToolbar>

            </IonHeader>
            <IonContent >


                <div >
                    <IonImg src='./assets/img/404.png'/>
                    <IonCard className='card  ion-no-margin'>
                        <div className={'ion-text-center '}>

                            <IonCardSubtitle className='ion-margin-top'><h2>Page Not Found</h2></IonCardSubtitle>

                        </div>

                        <div  className={'ion-text-center ion-padding'}>



                            <IonCardContent>
                                The Page you are looking for cannot be found

                            </IonCardContent>
                            <div  className={'ion-padding'}>


                                <IonButton    onClick={e => {
                                    e.preventDefault();
                                    props.history.replace('../')
                                }} className='next smaller' expand={'block'}>
                                    Take me back to home
                                </IonButton>

                            </div>
                        </div>

                    </IonCard>
                </div>


            </IonContent>

        </IonPage>
    );
};


