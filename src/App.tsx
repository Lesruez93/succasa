import React, {useEffect} from 'react';
import {Route, Switch} from 'react-router-dom';
import {IonApp, IonRouterOutlet, setupConfig} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import firebase from "firebase";
/* Theme variables */
import './theme/variables.css';
import Login from "./pages/login/login";
import PersonalDetails from "./pages/personal-details/personal-details";
import PersonalDetails2 from "./pages/personal-details2/personal-details2";
import MagicLink from "./pages/magic-link/magic-link";
import PersonalDetailsID from "./pages/personal-details-id/personal-details-id";
import Dob from "./pages/dob/dob";
import Address from "./pages/address/address";
import Company from "./pages/company-details/company-details";
import PersonalDetailsIdUpload from "./pages/personal-details-id-upload/personal-details-upload";
import LandLordDocuments from "./pages/landlord-documents/landlord-documents";
import Profile from "./pages/profile/profile";
import AddProperty from "./pages/add-property/add-property";
import ConfirmProperty from "./pages/confirm-property/confirm-property";
import MyDocuments from "./pages/my-documents/my-documents";
import AddPropertyUpload from "./pages/add-property-upload/add-property-upload";
import Tabs from "./pages/Tabs";
import NoProperty from "./pages/no-property/no-property";
import MyDetails from "./pages/my-details/my-details";
import PropertyType from "./pages/property-type/property-type";
import MoveInDate from "./pages/move-in-date/move-in-date";
import NumberOfRooms from "./pages/number-of-rooms/number-of-rooms";
import PropertyTitle from "./pages/propeerty-title/property-title";
import RenewalType from "./pages/renewal-type/renewal-type";
import PropertyAddress from "./pages/property-address/property-address";
import TenancyTerms from "./pages/tenancy-terms/tenancy-terms";
import RentDeposit from "./pages/rent-deposit/rent-deposit";
import AddBills from "./pages/add-bills/add-bills";
import PropertyImages from "./pages/property-images/property-images";
import AddDocument from "./pages/document-upload/add-document";
import ManageProperty from "./pages/manage-property/manage-property";
import PropertyOverview from "./pages/property-overview/property-overview";
import AddEpc from "./pages/add-epc/add-epc";
import TenancyRequirements from "./pages/tenancy-requirements/tenancy-requirements";
import TenantReferencing from "./pages/tenant-referencing/tenant-referencing";
import TenancyHistory from "./pages/tenancy-history/tenancy-history";
import TenantAddress from "./pages/tenant-address/tenant-address";
import EmploymentHistory from "./pages/employment-history/employment-history";
import StartWorkingDate from "./pages/start-working-date/start-working-date";
import TenantAddressDetails from "./pages/tenant-address-details/tenant-address-details";
import EmploymentHistoryHousing from "./pages/employment-history-housing/employment-history-housing";
import Chat from "./pages/chat/chat";
import BookingCalendar from "./pages/booking-calendar/booking-calendar";
import Booking from "./pages/booking/booking";
import WelcomeScreen from "./pages/welcome-screen/welcome-screen";
import UploadId from "./pages/upload-id/upload-id";
import TenancyDetails from "./pages/tenancy-details/tenancy-details";
import Pictures from "./pages/pictures/pictures";
import Compliance from "./pages/compliance/compliance";
import PropertyProfile from "./pages/property-profile/property-profile";
import AddTenant from "./pages/add-tenant/add-tenant";
import InviteTenant from "./pages/invite-tenant/invite-tenant";
import TenantSuccess from "./pages/add-tenant/tenant-success";

import AdvertiseDashboard from "./pages/advertise-dashboard/advertise-dashboard";
import Advertise from "./pages/advertise";
import MarketPlace from "./pages/market-place/market-place";
import Availability from "./pages/availability/availability";
import PropertyAddressEdit from "./pages/property-address-edit/property-address-edit";
import PropertyTypeEdit from "./pages/property-type-edit/property-type-edit";
import PropertyInfo from "./pages/number-of-rooms/property-info";
import TenancyInfoEdit from "./pages/tenancy-terms/tenancy-info-edit";
import PricingInfo from "./pages/rent-deposit/pricing-info";
import AppointmentAvailability from "./pages/appointment-availability/appointment-availability";
import Photos from "./pages/photos/photos";
import Tenants from "./pages/tenancy/tenants";
import TenantsCard from "./pages/tenancy/tenants-card";
import PropertyComplianceDocument from "./pages/property-compliance-document/property-compliance-document ";
import ExemptionToggle from "./pages/exemption-toggle/exemption-toggle";
import NotFound from "./pages/not-found";
import './app.css';
import Subscription from "./pages/subscription/subscription";
import Checkout from "./pages/subscription/checkout";
import EnterprisePackage from "./pages/enterprise-package/enterprise-package";
import Slides from "./pages/slides/slides";
import PropertyInfoEdit from "./pages/number-of-rooms/property-info-edit";
import {Capacitor, Plugins} from "@capacitor/core";
import AddressEdit from "./pages/address-edit/address-edit";
import InvitePartner from "./pages/invite-tenant/invite-partner";
import AddPartner from "./pages/add-tenant/add-partner";
import InviteLandlord from "./pages/invite-tenant/invite-landlord";
import AddLandlord from "./pages/add-tenant/add-landlord";
import MySubscriptions from "./pages/my-sub";
import UpgradePackage from "./pages/subscription/upgrade-package";
import Notification from "./pages/notifications";
import SendFeedback from "./pages/feedback/feedback";
import AddressHistory from "./pages/employment-history/address-history";
import AddGuarantor from "./pages/tenant-referencing/add-guarator";
import InviteGuarantor from "./pages/invite-tenant/invite-guarantor";
import GasExemptionToggle from "./pages/exemption-toggle/gas-exemption-toggle";
import PropertySummary from "./pages/property-overview/property-full-description";
import PendingTenancy from "./pages/pending-tenancy/pending-tenancy";
import ConfirmedAppointment from "./pages/pending-tenancy/confirmed-appointment";
import AppointmentReschedule from "./pages/appointment-availability/appointment-reschedule";
import Duplicate from "./pages/property-profile/duplicate";
import Advertised from "./pages/confirm-property/advertised";
import PaymentMethods from "./pages/payment-methods/payment-methods";
import AddPaymentMethod from "./pages/payment-methods/add-payment-method";
import {getApiRequest} from "./api";
import {UserStore} from "./Store/UserStore";
import Stats from "./pages/stats";
import PropertyAdvert from "./pages/property-advert/property-advert";
import Settings from "./pages/tenants-dashboard/settings";
import LandlordCard from "./pages/property-advert/landlord-card";
import PropertyViewingFeedback from "./pages/rental-offer/property-viewing-feedback";
import RentalOffer from "./pages/rental-offer/rental-offer";
import KeyCollection from "./pages/key-collection/key-collection";

const { StatusBar } = Plugins;

const App: React.FC = () => {
    if (Capacitor.isNative){
        StatusBar.show().then().catch();

    }

    setupConfig({

        mode: 'ios'
    });
    const firebaseConfig = {
        apiKey: "AIzaSyBGyN4UcXt_5CvJNCB_wVSutnw5_oHtlUI",
        authDomain: "sucasa-826f9.firebaseapp.com",
        projectId: "sucasa-826f9",
        storageBucket: "sucasa-826f9.appspot.com",
        messagingSenderId: "1047081379364",
        appId: "1:1047081379364:web:7e7a90082d1329f6e01ab1"
    };
    // Initialize Firebase
    useEffect(()=>{
        getApiRequest('auth/user').then((resp:any)=> {
            if (resp.data){
                UserStore.update(user=>{
                    user.user = resp.data
                })
            }

        });
    },[]);
    firebase.initializeApp(firebaseConfig);
    firebase.firestore().enablePersistence()

        .catch((err) => {
            if (err.code === 'failed-precondition') {
                // Multiple tabs open, persistence can only be enabled
                // in one tab at a a time.
                // ...
            } else if (err.code === 'unimplemented') {
                // The current browser does not support all of the
                // features required to enable persistence
                // ...
            }
        });


    return   (
        <IonApp>
            <IonReactRouter>

                <IonRouterOutlet>
                    <Switch>
                        <Route path="/tabs" component={Tabs}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/personal-details" component={PersonalDetails}/>
                        <Route path="/personal-details2" component={PersonalDetails2}/>
                        <Route path="/personal-details-id" component={PersonalDetailsID}/>
                        <Route path="/personal-details-id-upload" component={PersonalDetailsIdUpload}/>
                        <Route path="/landlord-documents" component={LandLordDocuments}/>
                        <Route path="/dob" component={Dob}/>
                        <Route path="/property-profile" component={PropertyProfile}/>
                        <Route path="/tenancy-details" component={TenancyDetails}/>
                        <Route path="/move-in-date" component={MoveInDate}/>
                        <Route path="/property-title" component={PropertyTitle}/>
                        <Route path="/settings" component={Settings}/>
                        <Route path="/payment-methods" component={PaymentMethods}/>
                        <Route path="/add-epc" component={AddEpc}/>
                        <Route path="/address-history" component={AddressHistory}/>
                        <Route path="/upgrade-package" component={UpgradePackage}/>
                        <Route path="/my-subscriptions" component={MySubscriptions}/>
                        <Route path="/property-images" component={PropertyImages}/>
                        <Route path="/property-overview" component={PropertyOverview}/>
                        <Route path="/room-info" component={NumberOfRooms}/>
                        <Route path="/profile" component={Profile}/>
                        <Route path="/address" component={Address}/>
                        <Route path="/checkout" component={Checkout}/>
                        <Route path="/address-edit" component={AddressEdit}/>
                        <Route path="/enterprise-package" component={EnterprisePackage}/>
                        <Route path="/subscription" component={Subscription}/>
                        <Route path="/exemption-toggle" component={ExemptionToggle}/>
                        <Route path="/property-compliance-document" component={PropertyComplianceDocument} />
                        <Route path="/tenancies" component={TenantsCard}/>
                        <Route path="/upload-id" component={UploadId}/>
                        <Route path="/tenants" component={Tenants}/>
                        <Route path="/walkthrough" component={Slides}/>
                        <Route path="/notifications" component={Notification}/>
                        <Route path="/tenant-address" component={TenantAddress}/>
                        <Route path="/tenant-address-details" component={TenantAddressDetails}/>
                        <Route path="/employment-history" component={EmploymentHistory}/>
                        <Route path="/employment-history-housing" component={EmploymentHistoryHousing}/>
                        <Route path="/start-working-date" component={StartWorkingDate}/>
                        <Route path="/tenancy-requirements" component={TenancyRequirements}/>
                        <Route path="/company-details" component={Company}/>
                        <Route path="/property-type" component={PropertyType}/>
                        <Route path="/property-type-edit" component={PropertyTypeEdit}/>
                        <Route path="/manage-property" component={ManageProperty}/>
                        <Route path="/tenants-dashboard" component={Settings}/>
                        <Route path="/tenant-referencing" component={TenantReferencing}/>
                        <Route path="/tenancy-info-edit" component={TenancyInfoEdit}/>
                        <Route path="/pricing-info" component={PricingInfo}/>
                        <Route path="/property-info" component={PropertyInfo}/>
                        <Route path="/my-details" component={MyDetails}/>
                        <Route path="/tenant-history" component={TenancyHistory}/>
                        <Route path="/add-property" component={AddProperty}/>
                        <Route path="/renewal-type" component={RenewalType}/>
                        <Route path="/landlord-card/:id" component={LandlordCard}/>
                        <Route path="/property-address" component={PropertyAddress}/>
                        <Route path="/property-address-edit" component={PropertyAddressEdit}/>
                        <Route path="/tenancy-terms" component={TenancyTerms}/>
                        <Route path="/rent-deposit" component={RentDeposit}/>
                        <Route path="/magic-link" component={MagicLink}/>
                        <Route path="/add-bills" component={AddBills}/>
                        <Route path="/my-documents" component={MyDocuments}/>
                        <Route path="/add-document" component={AddDocument}/>
                        <Route path="/confirm-property" component={ConfirmProperty}/>
                        <Route path="/booking-calendar" component={BookingCalendar}/>
                        <Route path="/make-booking" component={Booking}/>
                        <Route path="/no-property" component={NoProperty}/>
                        <Route path="/add-property-upload" component={AddPropertyUpload}/>
                        <Route path="/welcome" component={WelcomeScreen}/>
                        <Route path="/property-info-edit" component={PropertyInfoEdit}/>
                        <Route path="/property-viewing-feedback" component={PropertyViewingFeedback}/>
                        <Route path="/chat" component={Chat}/>
                        <Route path="/rental-offer" component={RentalOffer}/>
                        <Route path="/confirm-appointment" component={ConfirmedAppointment}/>
                        <Route path="/appointment-reschedule" component={AppointmentReschedule}/>
                        <Route path="/pending-tenancy" component={PendingTenancy}/>
                        <Route path="/property-summary" component={PropertySummary}/>
                        <Route path="/gas-exemption" component={GasExemptionToggle}/>
                        <Route path="/property-photos" component={Photos}/>
                        <Route path="/appointment-request" component={AppointmentAvailability}/>
                        <Route path="/tenant-added" component={TenantSuccess}/>
                        <Route path="/upload-pictures" component={Pictures}/>
                        <Route path="/compliance" component={Compliance}/>
                        <Route path="/open-banking" component={Compliance}/>
                        <Route path="/property-advert" component={PropertyAdvert}/>
                        <Route path="/add-payment-method" component={AddPaymentMethod}/>
                        <Route path="/add-tenant" component={AddTenant}/>
                        <Route path="/add-partner" component={AddPartner}/>
                        <Route path="/add-landlord" component={AddLandlord}/>
                        <Route path="/add-guarantor" component={AddGuarantor}/>
                        <Route path="/invite-landlord" component={InviteLandlord}/>
                        <Route path="/invite-tenant" component={InviteTenant}/>
                        <Route path="/feedback" component={SendFeedback}/>
                        <Route path="/invite-partner" component={InvitePartner}/>
                        <Route path="/invite-guarantor" component={InviteGuarantor}/>
                        <Route path="/advertise-dashboard" component={AdvertiseDashboard}/>
                        <Route path="/advertise" component={Advertise}/>
                        <Route path="/stats" component={Stats}/>
                        <Route path="/key-collection" component={KeyCollection}/>
                        <Route path="/duplicate" component={Duplicate}/>
                        <Route path="/advertised" component={Advertised}/>
                        <Route path="/select-market-place" component={MarketPlace}/>
                        <Route path="/appointment-availability" component={Availability}/>
                        <Route path="/" render={() => <Tabs/>} exact={true}/>

                        <Route  component={NotFound}/>

                    </Switch>
                </IonRouterOutlet>

            </IonReactRouter>
        </IonApp>
    );
};
export default App;

