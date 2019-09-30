const axios = require('axios');
import LocalAuth from './AuthServices';
const base = require("./conf").base;


let get = (uri,params=null)=>{
    return axios({
        method : 'get',
        url : uri,
        baseURL : base,
        params : {
            Token : 't',
            ...params
        }
    });
}

let post = (uri,params=null,data=null,others={})=>{
    return axios({
        method : 'get',
        url : uri,
        baseURL : base,
        params : {
            Token : 't',
            ...params
        },
        data : data,
        ...others
    });
}


module.exports = { get, post }