import React, {useState} from 'react';

import {
    IonButton,
    IonCheckbox,
    IonContent,
    IonIcon,
    IonImg,
    IonLabel,
    IonLoading,
    IonPage,
    IonSegment,
    IonSegmentButton,
    IonText,
    useIonViewWillEnter
} from '@ionic/react';
import './login.css';
import {logoApple, logoFacebook, logoGoogle, mail} from "ionicons/icons";
import axios from "axios";
import API, {getRequest, toast} from "../../api";
import "@codetrix-studio/capacitor-google-auth";
import {Capacitor, Plugins} from "@capacitor/core";
import firebase from "firebase";

const { FacebookLogin,SignInWithApple} = Plugins;

export default function Login(props:any)  {
    let newData : any = {};

    const [showLoading, setShowLoading] = useState(false);
    const [userType, setUserType] = useState<any>('Landlord');
    const [isNative,setIsNative] = useState<boolean>(false);

    function  doLogin(token:any,url:any){
        setShowLoading(true);
        // clean up controller


        axios({
            method: 'post', //you can set what request you want to be
            url: API.BASE_URL + url,
            data: {firebase_token: token},
            // headers: {
            //     Authorization: 'Bearer ' + varToken
            // }
        }).then((res: any) => {
            sessionStorage.setItem('token', res.data.token);
         getRequest('auth/user').then((resp: any) => {

                if (resp.data.is_company) {

                    localStorage.setItem('token', res.data.token);
                    localStorage.setItem("user", JSON.stringify(resp.data));
                    props.history.replace('/tabs/dashboard');


                        // props.history.replace('/personal-details2');
                        setShowLoading(false);


                }
                else {
                    newData.user_type = userType;
                    newData.id = resp.data.id;
                    localStorage.setItem("user", JSON.stringify(newData));

                    setShowLoading(false);
                    props.history.replace(
                        {pathname:'/personal-details2',
                            state:userType});
                   // setShowLoading(false);
                }
            }).catch((er => {
                setShowLoading(false);

            }));


        }).catch((error => {
            console.log(error);
            setShowLoading(false)
        }))



    }

    useIonViewWillEnter(()=>{
        if (Capacitor.isNative){
            setIsNative(true)
        }



    });

    async function facebookeNativeLogin() {

        setShowLoading(true);
        if (isNative) {


            const FACEBOOK_PERMISSIONS = ['public_profile', 'email'];
            const result = await FacebookLogin.login({permissions: FACEBOOK_PERMISSIONS});

            if (result.accessToken) {

                //const provider = new firebase.auth.FacebookAuthProvider();

                fireAuth(firebase.auth.FacebookAuthProvider.credential(result.accessToken.token));
            } else {
                // Cancelled by user.
                setShowLoading(false);
                toast('Please try again').then()
            }
        }else {
            const provider = new firebase.auth.FacebookAuthProvider();
            firebase.auth().signInWithPopup(provider).then((res:any)=>{
                firebase.auth().onAuthStateChanged(function(user) {
                    if (user) {

                        user.getIdToken().then(function(idToken) {  // <------ Check this line

                            doLogin(idToken,API.AUTH_GOOGLE)
                        });
                    }
                });

            })
                .catch((er:any)=> {
                    setShowLoading(true);

                    toast(er.message + ' Please try again').then()
                })
        }

    }

    const responseGoogle = () => {
        setShowLoading(true);
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then((res:any)=>{
            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {


                    user.getIdToken().then(function(idToken) {  // <------ Check this line

                        doLogin(idToken,API.AUTH_GOOGLE)
                    });
                }
            });

        })

            .catch((er:any)=> {
                setShowLoading(true);

                toast(er.message + ' Please try again').then()
            })


    };

    const fireAuth = (provider:any) => {

        firebase.auth().signInWithCredential(provider)
            .then(() => {

                firebase.auth().onAuthStateChanged(function(user) {
                    if (user) {
                        user.getIdToken().then(function(idToken) {  // <------ Check this line

                            doLogin(idToken,API.AUTH_GOOGLE)
                        });
                    }
                });

            }).catch((er:any)=>{
            toast(er.message+ ' Please try again').then()


        }).catch((er:any)=> {

            toast(er.message + ' Please try again').then()
        })
    };



    async function googleLogin(): Promise<void> {
        //  Plugins.GoogleAuth.signOut();
        setShowLoading(true);
        let googleUser =  await Plugins.GoogleAuth.signIn();
        // const provider = new firebase.auth.GoogleAuthProvider();
        fireAuth(firebase.auth.GoogleAuthProvider.credential(googleUser.idToken))

    }

    function appleLogin() {
        setShowLoading(false);
        if (isNative) {

          SignInWithApple.Authorize().then(( response:any) => {

                    // Handle user information
                    // Validate token with server and create new session
                    const provider = new firebase.auth.OAuthProvider('apple.com');
                    fireAuth(provider.credential({idToken:response.identityToken}));
                    setShowLoading(false)
                })
                .catch((error:any) => {
                    // Handle error
                    setShowLoading(false);
                    toast('Something went wrong, try again').then()
                });
        }
        else {

            // const provider = new firebase.auth.OAuthProvider('apple.com');
            //
            // firebase.auth().signInWithPopup(provider).then((res:any)=>{
            //     firebase.auth().onAuthStateChanged(function(user) {
            //         if (user) {
            //             console.log(user); // It shows the Firebase user
            //
            //             user.getIdToken().then(function(idToken) {  // <------ Check this line
            //                 console.log(idToken); // It shows the Firebase token now
            //                 doLogin(idToken,API.AUTH_GOOGLE)
            //             });
            //         }
            //     });
            //
            // })


        }
    }



    return (
        <IonPage>

            <IonContent fullscreen>

                <IonSegment value={userType}  mode="md" onIonChange={e => setUserType( e.detail.value)}>
                    <IonSegmentButton value='Landlord'>
                        <IonLabel>Join as a Landlord</IonLabel>
                    </IonSegmentButton>
                    <IonSegmentButton value="Tenant">
                        <IonLabel>Join as a Tenant</IonLabel>
                    </IonSegmentButton>
                </IonSegment>
                <div className={'ion-text-center  logodiv'}>
                    <IonImg className={'logo'} src={"assets/img/logo.png"}/>
                    <h2>Create your  Account</h2>

                </div>
                <div className={'ion-margin-top ion-padding'}>

                    <IonButton  onClick={e=> {
                        facebookeNativeLogin()
                            .then((res:any)=>{
                                //  setShowLoading();

                            },e=>{
                                // setShowLoading(false);
                                console.log(e)
                            })
                    }  } className='facebook' expand={'block'}>
                        <IonIcon  slot="start"  icon={logoFacebook}/>

                        Continue with Facebook</IonButton>

                    <IonButton  onClick={e => {
                        e.preventDefault();
                        appleLogin()
                    }}  className={'apple'} expand={'block'}>
                        <IonIcon  slot="start"  icon={logoApple}/>

                        Continue with Apple</IonButton>





                    <div hidden={isNative}>
                        <IonButton id={'google'}  onClick={e=>

                            responseGoogle()


                        }

                                   className={'google'} expand={'block'}>
                            <IonIcon  slot="start"  icon={logoGoogle}/>

                            Continue with Google</IonButton>



                    </div>

                    <IonButton hidden={!isNative} onClick={e=> {
                        googleLogin()
                    }  } className={'google'} expand={'block'}>
                        <IonIcon  slot="start"  icon={logoGoogle}/>

                        Continue with Google</IonButton>



                </div>
                <div className={'ion-text-center'}>
                    <h2>Or</h2>
                </div>
                <div className={'ion-padding'}>
                    <IonButton  onClick={e => {
                        e.preventDefault();
                        props.history.push('/magic-link');
                    }}  fill='outline' color='dark'  expand={'block'}>
                        <IonIcon  slot="start"   icon={mail}/>

                        Continue with magic link</IonButton>

                </div>

                <div className={'ion-text-center'}>
                    <h2>Login</h2>
                </div>
                <div className='ion-text-center ion-padding ion-margin-bottom'>
                    <IonText>
                        By signing up, you agree to our Terms of Service and
                        acknowledge that our Privacy Policy applies to you.
                    </IonText ><br/>
                    <IonCheckbox   value={'readOnly'} checked={true} className='ion-margin-top'>

                    </IonCheckbox>

                </div>


            </IonContent>
            <IonLoading
                cssClass='my-custom-class'
                isOpen={showLoading}
                onDidDismiss={() => setShowLoading(false)}
                message={'Please wait...'}

            />
        </IonPage>
    );
};


