import React, {useEffect, useState} from 'react';
import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonInput,
    IonItem,
    IonLabel,
    IonPage,
    IonSelect,
    IonSelectOption,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import './my-details.css';
import {getApiRequest, getUser, toast, updateData} from "../../api";
import LoaderController from "../../components/Controllers";


export default function  MyDetails (props:any) {


    const [edit,setEdit ] = useState<boolean>(false);
    const [data,setData ] = useState<any>({
        first_name:'',
        last_name:'',
        phone_number:''
    } );

    const [loader,setLoader ] = useState<any>(false);
    //  localStorage.getItem('user');
    const { first_name, last_name, phone_number,email } = data;



useEffect(()=>{
    getApiRequest('users/'+getUser().id).then(r=>{
        setData(r.data.data.attributes)
    }).catch()
},[]);

    const onInputChange = (e:any) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e:any) => {
        e.preventDefault();
        setLoader(true);
        updateData(data, 'users', getUser().id.toString()).then(e => {
            toast('Updated').then();
            setLoader(false)
        }).catch(e => {
            setLoader(false);
            toast('Failed please try again').then().catch();
        });
    };

    return (
        <IonPage>

            <IonToolbar color='medium'   >
                <IonButtons slot="start">
                    <IonBackButton defaultHref={'../'} color='light'  text=''/>
                </IonButtons>
             <IonTitle>My Details</IonTitle>
            </IonToolbar>

            <IonContent fullscreen>


                {  !edit &&  <div className={'ion-padding'}>
                    <IonItem  color={'none'}  >
                        <IonLabel>Title
                        </IonLabel>
                        <div  slot={'end'}><p className="title">{data?.title}</p></div>
                    </IonItem>

                    <IonItem   color={'none'}  >
                        <IonLabel>First Name
                        </IonLabel>
                        <div  slot={'end'}><p className="title">{data?.first_name}</p></div>
                    </IonItem>

                    <IonItem   color={'none'}  >
                        <IonLabel>Last Name
                        </IonLabel>
                        <div  slot={'end'}><p className="title">{data?.last_name}</p></div>
                    </IonItem>

                    <IonItem   color={'none'}  >
                        <IonLabel>Email
                        </IonLabel>
                        <div  slot={'end'}><p className="title">{data?.email}</p></div>
                    </IonItem>



                    <IonItem   color={'none'}  >
                        <IonLabel>Contact Number
                        </IonLabel>
                        <div  slot={'end'}><p className="title">{data?.phone_number}</p></div>
                    </IonItem>


                    <IonItem   color={'none'}  >
                        <IonLabel>Password
                        </IonLabel>
                        <div  slot={'end'}><IonButton color='medium' size='small' fill='clear'>Change Password</IonButton></div>
                    </IonItem>

                <IonButton onClick={(e)=>{
                e.preventDefault();
                setEdit(true)
                }
                } className='ion-margin-top' expand='block' color='medium'>
                   Edit
                </IonButton>

                </div> }


                {  edit &&     <div className={'ion-padding'}>
                    <form  onSubmit={e => onSubmit(e)}>
                    <IonItem  color={'none'}  >
                        <IonLabel position='stacked'>Title
                        </IonLabel>
                        <IonSelect     onIonChange={y => onInputChange(y)}   value={data?.title}>
                            <IonSelectOption value='Mr'>
                                Mr
                            </IonSelectOption>
                            <IonSelectOption value='Mrs'>
                                Mrs
                            </IonSelectOption>
                        </IonSelect>
                    </IonItem>

                    <IonItem   color={'none'}  >
                        <IonLabel position='stacked'>First Name
                        </IonLabel>
                        <IonInput type='text'   name='first_name'   onIonChange={y => onInputChange(y)} value={first_name}/>
                    </IonItem>

                    <IonItem   color={'none'}  >
                        <IonLabel position='stacked'>Last Name
                        </IonLabel>
                        <IonInput type='text'     name='last_name'   onIonChange={y => onInputChange(y)}  value={last_name}/>
                    </IonItem>


                    <IonItem   color={'none'}  >
                        <IonLabel position='stacked'>Email
                        </IonLabel>
                        <IonInput  disabled  value={email}/>
                    </IonItem>



                    <IonItem   color={'none'}  >
                        <IonLabel position='stacked'>Contact Number
                        </IonLabel>
                        <IonInput  type='number'   name='phone_number'  onIonChange={y => onInputChange(y)}  value={phone_number}/>
                    </IonItem>

                    <IonButton type='submit'
                     className='ion-margin-top' expand='block' color='medium'>
                        Save
                    </IonButton>
                    </form>

                </div>}

                {loader &&
                <LoaderController/>
                }
            </IonContent>


        </IonPage>
    );
};
