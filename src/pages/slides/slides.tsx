import React from 'react';
import {IonContent, IonPage, IonSlide, IonSlides, IonImg, IonButton, IonIcon} from '@ionic/react';
import './slides.css'
import {arrowForwardSharp} from "ionicons/icons";





export default function Slides  (props:any) {

    const slideOpts = {
        initialSlide: 1,
        speed: 400
    };
    let slideImages:any;
if (localStorage.getItem('user_type')=== '1'){

    slideImages = ['/assets/img/slides/landlordslide1.png',
        '/assets/img/slides/landlordslide2.png',
        '/assets/img/slides/landlordslide3.png'
    ];
} else {

    slideImages = ['/assets/img/slides/tenantslide1.png',
        '/assets/img/slides/tenantslide2.png',
        '/assets/img/slides/tenantslide3.png'
    ];
}

    return (
            <IonPage>

                <IonContent fullscreen>


                    {!slideImages && <IonSlides className='slides' pager={true}>

                        <IonSlide>
                            <div className='slide1'>
                            </div>
                        </IonSlide>

                        <IonSlide>
                            <div className='slide2'>
                            </div>
                        </IonSlide>

                        <IonSlide>
                            <div className='slide3'>
                            </div>
                        </IonSlide>
                    </IonSlides>
                    }
                    {slideImages &&
                    < IonSlides className='slides'  pager={true} >

                        <IonSlide >
                        <div  className='slidet1'>
                        </div>
                        </IonSlide>

                        <IonSlide >
                        <div  className='slidet2'>
                        </div>
                        </IonSlide>

                        <IonSlide >

                        <div className='slidet3'>

                        </div>
                            <IonButton className='bt' color='medium' size='small' fill='solid'>
                                Continue    <IonIcon icon={arrowForwardSharp}/>
                                </IonButton>
                        </IonSlide>
                        </IonSlides>
                    }
                </IonContent>
            </IonPage>

        );
    };

