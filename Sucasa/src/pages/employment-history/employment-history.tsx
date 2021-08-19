import React, {useState} from 'react';
import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonPage,
    IonSelect,
    IonSelectOption,
    IonText,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import './employment-history.css';
import ReactPhoneInput from "react-phone-input-2";


export default function EmploymentHistory (props:any) {
    const [name, setName] = useState<any>('');
    const [email, setEmail] = useState<any>('');
    const [number, setNumber] = useState<any>('');
    const [company, setCompany] = useState<any>('');
    const [incomeSource, setIcomeSource] = useState<any>('');
    const [income, setIncome] = useState<any>('');
    const [period, setPeriod] = useState<any>('');
    const [status, setStatus] = useState<any>('employed');
    const periods = ['1 month', '2 months','3 months', "4 months",'5 months','6months','7 months','8 months','9 months','10 months','11 months','1 year',
        '2 years', '3 years', '4 years', '5 years', '6 years', '7 years', '8 years', '9 years', '10+ years',
    ];
const sources = ["Salary", "Savings", "Universal credit", "LHA", "DSS", "Other"];


    function next(e:any) {
        e.preventDefault();
        const data =
            {
                "tenant_refferencing_id":"1",
                "employment_status": status,
                "name_of_employer": name,
                "email": email,
                "mobile": number,
                "employment_start_date": '' ,
                "salary": income,
                "company":'c',
                "type_of_housing_benefit": "Cumque aperiam nostr",
                "status": status
            }
    }

    const  handleOnChange = (value:any) => {
        setNumber('+'+value)
    };


    function changeIncome(y: any) {

        setIcomeSource(y.detail.value);
    }


    const changeSelect = (y: any) => {
        setStatus(y.detail.value);
        if (y.detail.value === 'self-employed' || y.detail.value === 'unemployed') {
            setEmail(' ');
            setName(' ');
            setNumber(' ')
        }
        else {
            setEmail('');
            setName('');
            setNumber('')
        }
    };

    const changePeriod = (y: any) => {

        setPeriod(y.detail.value);
    };

    return (
        <IonPage>
            <IonHeader className="ion-no-border">
                <IonToolbar color='medium' >
                    <IonButtons slot="start">
                        <IonBackButton defaultHref={'./tenant-referencing'} color='light'  text=''/>
                    </IonButtons>
                    <IonTitle>Tenancy history</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className={'ion-padding'}>



                <div className={'ion-text-center'}>
                    <IonText>
                        What is your type of employment?
                    </IonText>
                </div>

                <form onSubmit={(event1 => next(event1))}>
                    <IonItem color={'none'} lines={'none'}>
                        <IonLabel position={'stacked'} >Please Select </IonLabel>
                        <IonSelect  value={status} className={'input-select'} onIonChange={(y)=>

                            changeSelect(y)

                        }>
                            <IonSelectOption value={'full-time'}>Full Time</IonSelectOption>
                            <IonSelectOption value={'part_time'}>Part Time</IonSelectOption>
                            <IonSelectOption value={'self-employed'}>Self Employed</IonSelectOption>
                            <IonSelectOption value={'retired'}>Retired</IonSelectOption>
                            <IonSelectOption value={'unemployed'}>Un employed</IonSelectOption>

                        </IonSelect>


                    </IonItem>

                    <IonItem  hidden={status === 'self-employed' ||status ===  'unemployed'} className=' ion-margin-top' lines='none'>

                        <IonText  className='ion-text-center ion-margin-top'>
                            Please enter the contact details for your main source of income
                        </IonText>
                        <IonLabel position='stacked' > Company</IonLabel>

                        <IonInput type='text'  value={company} onIonChange={y => setCompany(y.detail.value!)}  className='input'  />
                    </IonItem>
                    <IonItem hidden={status === 'self-employed' ||status ===  'unemployed'} className=' ion-margin-top' lines='none'>



                        <IonLabel position='stacked' >  Full name</IonLabel>

                        <IonInput   value={name} onIonChange={y => setName(y.detail.value!)}  className='input'  />
                    </IonItem>

                    <IonItem  hidden={status === 'self-employed' ||status ===  'unemployed'} className=' ion-margin-top' lines='none'>
                        <IonLabel position='stacked' > Email Address</IonLabel>
                        <IonInput  type='email' value={email} onIonChange={y => setEmail(y.detail.value!)}  className='input'  >
                        </IonInput>

                    </IonItem>
                    <div hidden={status === 'self-employed' ||status ===  'unemployed'} className='ion-margin'>
                        <IonLabel  className='ion-margin-bottom'   position="stacked">Phone Number</IonLabel>
                    </div>
                    <div hidden={status === 'self-employed' ||status ===  'unemployed'} className='ion-margin'>

                        <ReactPhoneInput

                            value={number}
                            placeholder={'Phone number'}
                            enableSearch={true}
                            country={'gb'}
                            onChange={handleOnChange}
                        />
                    </div>

                    <IonItem color={'none'} lines={'none'}>
                        <IonLabel position='stacked' className='ion-text-wrap' >
                            How long have you been receiving income from this source?
                        </IonLabel>

                        <IonSelect  placeholder={'Please select'} value={status}  className={'input-select'} onIonChange={(y)=>

                            changePeriod(y)

                        }>
                            {periods.map((i:any)=>(<IonSelectOption value={i}>{i}</IonSelectOption>))}


                        </IonSelect>


                    </IonItem>
                    <IonItem  className=' ion-margin-top' lines='none'>
                        <IonLabel  position='stacked' className='ion-text-wrap' >Please enter your annual income</IonLabel>
                        <IonInput  placeholder='Annual income' type='number' value={income} onIonChange={y => setIncome(y.detail.value!)}  className='input'  >
                        </IonInput>

                    </IonItem>

                    <IonItem color={'none'} lines={'none'}>
                        <IonLabel position='stacked' className='ion-text-wrap' >
                            Please select the source of the your main income
                        </IonLabel>

                        <IonSelect  placeholder={'Please select'} value={incomeSource}  className={'input-select'} onIonChange={(y)=>

                            changeIncome(y)

                        }>
                            {sources.map((i:any)=>(<IonSelectOption value={i}>{i}</IonSelectOption>))}


                        </IonSelect>


                    </IonItem>


                    <IonButton type='submit'  disabled={ !name ||!email || !number || !status }
                               className={'next'} expand={'block'}>

                        Continue
                    </IonButton>
                </form>
            </IonContent>
        </IonPage>
    );
};

