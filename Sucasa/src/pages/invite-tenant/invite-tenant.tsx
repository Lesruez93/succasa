import React, {useState} from 'react';
import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel, IonLoading,
    IonPage, IonTitle, IonToast,
    IonToolbar
} from '@ionic/react';
import validateEmail from "../../utils/email-validation";
import {getUser, postData} from "../../api";
import ReactPhoneInput from "react-phone-input-2";


export default function  InviteTenant (props:any) {
    let newData :any = {};


    const [selected, setSelected] = useState<string>("Mr");
    const [name, setText] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState<any>();
    const [message, setMessage] = useState<any>(null);
    const [color, setColor] = useState<any>(null);
    const [showToast, setShowToast] = useState(false);

    const [showLoading, setShowLoading] = useState(false);

    function isSelected() {
        if (name || number || last_name) {
            newData.title = selected;
            newData.name = name;

           if (validateEmail(email)){
               const data =  {

                    "from": getUser().name,
                    "to": number,
                    "user_type":"tenant",
                    'property_id':localStorage.getItem('property_id'),
                    "content": "Hi "+name+" \n" + "\n" + getUser().name + " has just invited you to join them on Sucasa as a tenant. \n" + "\n" + "Please click on the link (include link to the app store to download) \n",
                    "invite_link": "sucasa-826f9.web.app/invite/"+email
                   };
               setShowLoading(true);
                postData(data,'accountinvites').then(()=>{
                    setShowLoading(false);
                    setMessage('Your tenant invitation email has been sent!');
                    setColor('success');
                    props.history.push('./tenant-added')
                }).catch(()=>{
                    setShowLoading(false);
                    setMessage('Failed');
                    setColor('danger');


                });

           } else {
               alert('Invalid email')
           }
        }else {
            alert('All fields are  required')
        }

    }


    const  handleOnChange = (value:any) => {
        setNumber('+'+value)
    };


    return (
        <IonPage>
            <IonHeader className="ion-no-border">
                <IonToolbar  >
                    <IonButtons slot="start">
                        <IonBackButton defaultHref={'/add-tenant'} color='dark'  text=''/>
                    </IonButtons>
                    <IonTitle>Invite Tenant</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>



                <div className={'ion-margin-top ion-padding'}>



                    <IonItem lines={'none'}>
                    <IonLabel   position="stacked">Full Name</IonLabel>
                    <IonInput   value={name} onIonChange={y => setText(y.detail.value!)}  className='ion-margin-top input'  />
                </IonItem>


                    <IonItem lines={'none'}>
                        <IonLabel   position="stacked">Last Name</IonLabel>
                        <IonInput   value={last_name} onIonChange={y => setLastName(y.detail.value!)}  className='ion-margin-top input'  />
                    </IonItem>

                    <IonItem lines={'none'}>
                        <IonLabel   position="stacked">Email</IonLabel>
                        <IonInput   value={email} type='email' onIonChange={y => setEmail(y.detail.value!)}  className='ion-margin-top input'  />
                    </IonItem>

                    <div  className='ion-margin'>
                        <IonLabel  className='ion-margin-bottom'   position="stacked">Phone Number</IonLabel>
                    </div>
                    <div  className='ion-margin'>

                        <ReactPhoneInput

                            value={number}
                            placeholder={'Phone number'}
                            enableSearch={true}
                            country={'gb'}
                            onChange={handleOnChange}
                        />
                    </div>

                    <IonButton  disabled={!name || !last_name || !email}  onClick={e => {
                    e.preventDefault();
                    isSelected()
                }} className={'next'} expand={'block'}>

                    Next
                </IonButton>
                </div>
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
};

