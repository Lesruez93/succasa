import { Store } from "pullstate";


export const UserStore = new Store({
   user: {
       accountinvite_id: '',
       company_name: '',
       company_number: '',
       dob: '',
       email: '',
       first_name: '',
       id: '',
       id_document: '',
       id_type_id: '',
       is_company: '',
       last_name: '',
       middle_name: '',
       name:'',
       package_id: '',
       postcode: '',
       profile_photo_path: '',
       profile_photo_url: '',
       street_address: '',
       title: '',
       user_type: '',
       payment_method: ''
   }
});


export const PropertiesStore = new Store({
    property: [{state:null}]
});


export const PropertyIdStore = new Store({
    propertyId:''
});

export const PropertyImagesStore = new Store({
    images: [{state:null}]
});
