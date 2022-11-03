const CryptoJS = require("crypto-js");

const sessionName='eAccounting-Pro';

export const isLogedIn = () => {
    const user = localStorage.getItem(sessionName);
    if(user && user!='null'){
        const data=decrypt(localStorage.getItem(sessionName));
        const session=JSON.parse(data);
        const SessionTime=new Date(session['sessionTime']).toLocaleTimeString();
        const LocalTime=new Date().toLocaleTimeString()
        // if(SessionTime>LocalTime){
            return true;
        // }
        // else{
        //     removeSession();
        //     return false;
        // }
    }
    else{
        removeSession();
        return false;
    }
}

export const getUser = () => {
    const user = localStorage.getItem(sessionName);
    if(user){
        const data=decrypt(localStorage.getItem(sessionName));
        return JSON.parse(data);
    }
    else{
        removeSession();
        return null;
    }
}

export const getToken= () => {
    const user = localStorage.getItem(sessionName);
    if(user){
        const data=decrypt(localStorage.getItem(sessionName));
        const session=JSON.parse(data);
        const SessionTime=new Date(session['sessionTime']).toLocaleTimeString();
        const LocalTime=new Date().toLocaleTimeString()
         //const rrr=SessionTime>LocalTime;
         //alert(SessionTime + ' - '+ LocalTime + ' - '+ rrr);
         //return session.token;
        // if(SessionTime>LocalTime){
            return session.token;
        // }
        // else{
        //     removeSession();
        //     return null;
        // }
    }
    else{
        removeSession();
        return null;
    }
}

export const setSession= async (sessionData) => {
    var sessionValidate = new Date();
    sessionValidate.setTime(new Date().getTime() + (sessionData.sessionTime*1000));
    sessionData.sessionTime = sessionValidate;
    const string = JSON.stringify(sessionData);
    const encrypted = encrypt(string);
    localStorage.setItem(sessionName,encrypted);
}

export const removeSession= async () => {
    localStorage.removeItem(sessionName);
}

export const encrypt= (data) => {
    if(data){
        return  CryptoJS.DES.encrypt(data, CryptoJS.enc.Utf8.parse('@Shik-SE'),{ iv: { words: [ 0, 0, 0, 0 ], sigBytes: 16 } }).toString();
    }
    else{
        return null;
    }
}

export const decrypt= (data) => {
    if(data){
        const bytes= CryptoJS.DES.decrypt(data, CryptoJS.enc.Utf8.parse('@Shik-SE'),{ iv: { words: [ 0, 0, 0, 0 ], sigBytes: 16 } });
        return bytes.toString(CryptoJS.enc.Utf8);
    }
    else{
        return null;
    }
    
}

export const current= (name) => {
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth()+1;
    var year = date.getFullYear();

    switch(name){
        case 'day':return day;
        case 'month':return month;
        case 'year':return year;
        default:return date;
    }
}
export const setCharAt=(str,index,chr) =>{
    if(index > str.length-1) return str;
    return str.substring(0,index) + chr + str.substring(index+1);
}