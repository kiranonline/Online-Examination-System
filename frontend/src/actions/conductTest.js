import { SecurePost } from '../services/axiosCall';
import apis from '../services/Apis';
import Alert from '../components/common/alert';
export const changeConducttestId = (d)=> dispatch =>{
    dispatch({
       type : 'SET_CONDUCT_TEST_ID',
       payload : d
    })
}

export const changeTestRegisterLink = (d)=> dispatch =>{
    dispatch({
       type : 'SET_TEST_REGISTER_LINK',
       payload : d
    })
}

export const changeTestRegisterStatus = (d)=> dispatch =>{
    dispatch({
       type : 'CHANGE_TEST_ISREGISTRATION_AVAILABLE',
       payload : d
    })
}

export const changeTestStatus = (d)=> dispatch =>{
    dispatch({
       type : 'CHANGE_BEGIN_TEST_STATUS',
       payload : d
    })
}


export const updateCurrentTestBasicDetails = (d)=> dispatch=>{
    SecurePost({
        url:`${apis.GET_SINGLE_TEST_DETAILS_BASIC}`,
        data:{
            id:d
        }
    }).then((response)=>{
        if(response.data.success){
            console.log(response.data.data);
            dispatch({
                type : 'UPDATE_TEST_BASIC_DETAILS',
                payload : response.data.data
            })
        }
        else{
            return Alert('error','Error!',response.data.message);
        }
    }).catch((error)=>{
        console.log(error);
        return Alert('error','Error!','Unable to refresh test status');
    })
}



export const updateCandidatesTest = (d)=> dispatch=>{
    dispatch({
        type:'CHANGE_CANDIDATES_OF_TEST',
        payload:d
    })
}


export const updateQuestiosnTest =(d)=>{
    return {
        type:'CHANGE_QUESTIONS_OF_TEST',
        payload:d
    }
}