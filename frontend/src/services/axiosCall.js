import auth from './AuthServices';
import apis from './Apis';
const axios = require('axios');

export const SecureGet = (p)=>{
    return axios({
        method:'get',
        baseURL : apis.BASE,
        ...p,
        params: {
            ...p.params,
            Token : auth.retriveToken()
        }
    })
}

export const Get =(p)=>{
    return axios({
        method:'get',
        baseURL : apis.BASE,
        ...p,
    })
}


export const SecurePost =(p)=>{
    return axios({
        method:'post',
        baseURL : apis.BASE,
        ...p,
        params: {
            ...p.params,
            Token : auth.retriveToken()
        }
    })
}

export const Post =(p)=>{
    return axios({
        baseURL : apis.BASE,
        method:'post',
        ...p,
    })
}



