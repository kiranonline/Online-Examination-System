import { ADMIN_PERMISSIONS, TRAINER_PERMISSIONS} from '../services/userOption';

const initialState = {
    isLoggedIn : false,
    userDetails : {

    },
    activeRoute:'0',
    userOptions:[]
}

export default (state = initialState, action )=>{
    switch(action.type){
        case 'CHANGE_ACTIVE_URL':
            return {
                ...state,
                activeurl : action.payload
            }
        case 'CHANGE_ACTIVE_ROUTE':
            return {
                ...state,
                activeRoute : action.payload
            }
        case 'LOGIN':
            if(action.payload.type==='ADMIN'){
                return {
                    ...state,
                    isLoggedIn : true,
                    userDetails:{
                        ...action.payload
                    },
                    userOptions : ADMIN_PERMISSIONS                    
                }
            }
            else{
                return {
                    ...state,
                    isLoggedIn : true,
                    userDetails:{
                        ...action.payload
                    },
                    userOptions : TRAINER_PERMISSIONS
                }
            }
            
        case 'LOGOUT':
            return {
                ...state,
                isLoggedIn : false,
                userDetails :{

                }
            }
        default:
            return state;
    }
}