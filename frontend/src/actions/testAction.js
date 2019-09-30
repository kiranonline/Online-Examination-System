import apis from '../services/Apis';
import Alert from '../components/common/alert';
import { SecurePost } from '../services/axiosCall';
export const changeStep = (d)=> dispatch =>{
    dispatch({
       type : 'CHANGE_ACTIVE_STEP',
       payload : d
    })
}

export const changeBasicNewTestDetails = (d)=> dispatch =>{
    dispatch({
        type: 'CHANGE_BASIC_NEW_TEST_DETAILS',
        payload:d
    })
}

export const pushQuestionToQueue = (d)=> dispatch =>{
    dispatch({
        type: 'ADD_QUESTION_TO_QUESTION_QUEUSE',
        payload:d
    })
}

export const removeQuestionFromMainQueue = (d)=> dispatch =>{
    dispatch({
        type: 'REMOVE_QUESTION_FROM_MAIN_QUEUE',
        payload:d
    })
}

export const changeMode = (d)=> dispatch =>{
    dispatch({
        type : 'CHANGE_MODE_QUESTION_SELECT',
        payload:d
    })
}



export const fetchSubjectWiseQuestion = (d) => dispatch =>{
    SecurePost({
        url : `${apis.GET_ALL_QUESTIONS}`,
        data:{
            subject : d
        }
    }).then((response)=>{
        console.log(response);
        if(response.data.success){
            dispatch({
                type : 'FETCH_QUESTIONS_BASED_ON_SUBJECT',
                payload : response.data.data
            })
        }
        else{
            Alert('error','Error!',response.data.message);
            dispatch({
                type : 'FETCH_QUESTIONS_BASED_ON_SUBJECT',
                payload:[]
            })
        }
    }).catch((error)=>{
        Alert('error','Error!','Server Error');
        dispatch({
            type : 'FETCH_QUESTIONS_BASED_ON_SUBJECT',
            payload:[]
        })
    })
}