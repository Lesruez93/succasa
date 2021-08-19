import axios from "axios";
import moment from "./pages/booking/booking";
import {Plugins} from '@capacitor/core';

const { Toast } = Plugins;
const API = {
    BASE_URL:"https://sucasa.pnrhost.com/api/v1/",
    AUTH_GOOGLE:'auth/firebase',
    AUTH_FACEBOOK: 'auth/firebase',
    GeocodingUrl: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=',
    PostalUrl: 'https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:',
    API_KEY: 'AIzaSyDuME8_ECnAFvl9fQA9P0Z-NZ73pfdBqwg'

};

export const fetcherOption = {
    onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        // Never retry on 404.
        if (error.status === 404 || error.status === 500 ||error.status === 401 ) return'';

        // Never retry for a specific key.
      //  if (key === '/api/user') return

        // Only retry up to 10 times.
        if (retryCount >= 3)

            return'';

        // Retry after 5 seconds.
        setTimeout(() => revalidate({ retryCount: retryCount + 1 }), 5000)
},
    onError: (err, key, config)=>{
       if (err.message === 'Network Error'){
           return toast("No internet connection")
       }else {
           return toast("Oops an error occurred")
       }



    },
    shouldRetryOnError:true,
    errorRetryCount:3,
   // suspense: true,
    errorRetryInterval:3000,
    loadingTimeout : 10000,
    onLoadingSlow:(key, err, config)=>{
        console.log(err);
        return toast('Slow network detected')
    },


};
 export async function toast(msg)
{

  await  Toast.show({
        text: msg,
        duration: 'long',
      position:'bottom'

    })
}
 export const fetcher = url => axios.get(API.BASE_URL+url, {
    headers: {
        Authorization: 'Bearer '+ localStorage.getItem('token'),
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/vnd.api+json',
    }
}).then(res => res.data);


export  function  register(data,id) {
    return   axios.patch(API.BASE_URL+'users/'+id,{


            "data":{
                "type": "users",
                "id":id.toString(),
                "attributes": data
            },
        },

        {
            headers: {
                Authorization: 'Bearer '+ sessionStorage.getItem('token'),
                'Content-Type': 'application/vnd.api+json',
                'Accept': 'application/vnd.api+json',
            }

        })}

        export  function get() {
    getRequest('auth/user').then((res)=> {

                return res.data
            });
        }

export function  getApiRequest  (endpoint){


    return  axios.get(API.BASE_URL+endpoint,
        {
            headers: {
                Authorization: 'Bearer '+ localStorage.getItem('token'),
                'Content-Type': 'application/vnd.api+json',
                'Accept': 'application/vnd.api+json',
            }
        }
        )
}

export function  getRequest (endpoint){

    return axios.get(API.BASE_URL+endpoint,
        {
            headers: {
                Authorization: 'Bearer '+ sessionStorage.getItem('token'),
                'Content-Type': 'application/vnd.api+json',
                'Accept': 'application/vnd.api+json',
            }})
}

export  function  postData(data,url) {
    return   axios.post(API.BASE_URL+url,

        {

            "data": {
                "type": url,
                "attributes": data
            }
        },

        {
            headers: {
                Authorization: 'Bearer '+ localStorage.getItem('token'),
                'Content-Type': 'application/vnd.api+json',
                'Accept': 'application/vnd.api+json',
            }

        })
}
export  function  postUserType(data,url) {
    return   axios.post(API.BASE_URL+url,

        {

            "data": {
                "type": url,
                "attributes": data
            }
        },

        {
            headers: {
                Authorization: 'Bearer '+ sessionStorage.getItem('token'),
                'Content-Type': 'application/vnd.api+json',
                'Accept': 'application/vnd.api+json',
            }

        })
}

export  function  postDataID(data,url) {
    return   axios.post(API.BASE_URL+url,

        data,

        {
            headers: {
                Authorization: 'Bearer '+ localStorage.getItem('token'),
                'Content-Type': 'application/vnd.api+json',
                'Accept': 'application/vnd.api+json',
            }

        })
}

export  function  updateData(data,url,id) {
    return   axios.patch(API.BASE_URL+url+'/'+id,{

            "data": {
                "type": url,
                "id":id.toString(),
                "attributes": data
            }
        },

        {
            headers: {
                Authorization: 'Bearer '+ localStorage.getItem('token'),
                'Content-Type': 'application/vnd.api+json',
                'Accept': 'application/vnd.api+json',
            }

        })
}

export  function  uploadImage(data) {
    return   axios.post(API.BASE_URL+'propertyimages',{

            "data": {
                "type": "propertyimages",
                "attributes": data
            }
        },

        {
            headers: {
                Authorization: 'Bearer '+ localStorage.getItem('token'),
                'Content-Type': 'application/vnd.api+json',
                'Accept': 'application/vnd.api+json',
            }

        })
}

export  function  uploadDocument(data) {
    return   axios.post(API.BASE_URL+'propertydocuments',{

            "data": {
                "type": "propertydocuments",
                "attributes": data
            }
        },

        {
            headers: {
                Authorization: 'Bearer '+ localStorage.getItem('token'),
                'Content-Type': 'application/vnd.api+json',
                'Accept': 'application/vnd.api+json',
            }

        })
}

export  function  deleteRequest(endpoint,id) {
    return   axios.delete(API.BASE_URL+endpoint+'/'+id,

        {
            headers: {
                Authorization: 'Bearer '+ localStorage.getItem('token'),
                'Content-Type': 'application/vnd.api+json',
                'Accept': 'application/vnd.api+json',
            }

        })
}

export function getUser() {
    return JSON.parse(localStorage.user)
}


export function  addWatermark() {
    const options = {
        method: 'POST',
        url: 'https://neutrinoapi-image-watermark.p.rapidapi.com/image-watermark',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'x-rapidapi-key': '6a2fe92c83msheaeafb143f0ba43p1c625ajsnd96acfebb7fb',
            'x-rapidapi-host': 'neutrinoapi-image-watermark.p.rapidapi.com'
        },
        data: {
            "opacity": '90',
            //    width: '640',
            'image-url': 'http://www.neutrinoapi.com/img/Green_Futuristic_Background.jpg',
            "format": 'png',
            'watermark-url': 'https://firebasestorage.googleapis.com/v0/b/sucasa-826f9.appspot.com/o/New%2520Project%2520(25)%5B1%5D.png?alt=media&token=fd527e42-57ba-460d-ad44-1abb50ab8b44',
            "position": 'bottom-right',
            //  height: '480'
        }
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });
}

export function formatTime(date) {
    return moment(date).format('YYYY-MM-DD');
}


export function getEpc() {

    return axios.get('https://epc.opendatacommunities.org/api/v1/domestic/search?address=liverpool',
        {
            headers: {
                'Accept': 'text/csv',
                'Authorization': 'Basic c32a4a94f2f40b8bc8dd7a19bb533236f8a16a96'
            }})
}

export function pay(url,token) {
    return   axios.post(API.BASE_URL+url,

        {
            token:token


        },

        {
            headers: {
                Authorization: 'Bearer '+ localStorage.getItem('token'),
                'Content-Type': 'application/vnd.api+json',
                'Accept': 'application/vnd.api+json',
            }

        })
}

export default API;


