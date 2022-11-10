import axios from 'axios';
import * as auth_helper from './session_helper';

const baseURL = "http://138.201.23.126:3335/api/";


let instance = axios.create({
  baseURL: baseURL,
})

// request header
instance.interceptors.request.use((config) => {
  const token = auth_helper.getToken();
  if(token){
    config.headers = { 'Authorization': 'Bearer ' +  token}
  }
  return config;
}, error => {
  return Promise.reject(error);
})

// response parse
instance.interceptors.response.use(
    (response) => {
        return response
    }, 
    (error) => {
    console.warn('Error status ::', error.response?.status)
    console.log(error.response?.status);
    if(!error.response){
        return new Promise((resolve,reject)=>{
            reject(error)
        });
    }
    else if(error.response.status===401){
        auth_helper.removeSession();
        window.location='/login';
    }
    else{
        return new Promise((resolve,reject)=>{
            reject(error)
        });
    }
})

export default instance;