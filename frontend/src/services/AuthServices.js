import apis from "./Apis";
import { Get, Post} from './axiosCall';


class AuthService{
    constructor(){
        this.token=null;
        console.log(apis.BASE);
        console.log(apis.BASE_LOCAL_URL);
    }
    
    retriveToken = ()=>{
        return localStorage.getItem('Token')
    }

    storeToken = (t)=>{
        localStorage.setItem('Token', t);
    }

    deleteToken = ()=>{
        localStorage.removeItem('Token');
    }

    LoginAuth = (u,p)=>{
        return Post({
            url:apis.LOGIN,
            data:{
                emailid : u,
                password : p
            }
        })    
    }

    FetchAuth = (t)=>{
        return Get({
            url : apis.GETDETAILSUSER,
            params : {
                Token : t
            }
        })
    }


}

export default new AuthService();
