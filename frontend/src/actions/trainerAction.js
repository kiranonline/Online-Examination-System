import apis from '../services/Apis';
import Alert from '../components/common/alert';
import { SecurePost } from '../services/axiosCall';

export const ChangeQuestionModalState = (d1)=> dispatch =>{
        dispatch({
            type : 'CHANGE_QUESTION_MODAL_STATE',
            payload1 : d1,
        })
    }
    

export const ChangeQuestionConfirmDirty = (d)=> dispatch =>{
    dispatch({
       type : 'CHANGE_QUESTION_FORM_CONFIRMDIRTY',
       payload : d
    })
}


export const ChangeQuestionSearchText = (d)=> dispatch =>{
    dispatch({
       type : 'CHANGE_QUESTION_SEARCH_TEXT',
       payload : d
    })
}

export const ChangeQuestionTableData = (d)=> dispatch =>{
    dispatch({
       type : 'CHANGE_QUESTION_TABLE_LOADING_STATUS',
       payload1 : true,
       payload2:[]
    });
    SecurePost({
        url : `${apis.GET_ALL_QUESTIONS}`,
        data:{
            subject : d
        }
    }).then((response)=>{
        console.log(response);
        if(response.data.success){
            dispatch({
                type : 'CHANGE_QUESTION_TABLE_LOADING_STATUS',
                payload1 : false,
                payload2 : response.data.data
            })
        }
        else{
            Alert('error','Error!',response.data.message);
            dispatch({
                type : 'CHANGE_QUESTION_TABLE_LOADING_STATUS',
                payload1 : false,
                payload2 : []
            })
        }
    }).catch((error)=>{
        Alert('error','Error!','Server Error');
        dispatch({
            type : 'CHANGE_QUESTION_TABLE_LOADING_STATUS',
            payload1 : false,
            payload2 : []
        })
    })

}

export const ChangeSelectedSubjects = (d)=> dispatch =>{
    dispatch({
       type : 'CHANGE_SELECTED_SUBJECT',
       payload : d
    })
}

export const ChangeQuestionFormData = (d)=> dispatch =>{
    dispatch({
       type : 'CHANGE_QUESTION_FORM_DATA',
       payload : d
    })
}

export const AddFifthOptionInQuestion = ()=> dispatch =>{
    dispatch({
       type : 'ADD_FIFTH_OPTION'
    })
}





export const ChangeTestDetailsModalState = (d1,d2)=> dispatch =>{
    dispatch({
       type : 'CHANGE_TEST_DETAILS_MODAL_STATE',
       payload1 : d1,
       payload2 : d2
    })
}

export const ChangeTestSearchText = (d)=> dispatch =>{
    dispatch({
       type : 'CHANGE_TEST_SEARCH_TEXT',
       payload : d
    })
}

export const ChangeTestTableData = ()=> dispatch =>{
    dispatch({
        type : 'CHANGE_TEST_TABLE_LOADING_STATUS',
        payload1 : true,
        payload2:[]
    });
    SecurePost({
        url : `${apis.GET_ALL_TESTS}`,
    }).then((response)=>{
        console.log(response.data);
        if(response.data.success){
            dispatch({
                type : 'CHANGE_TEST_TABLE_LOADING_STATUS',
                payload1 : false,
                payload2 : response.data.data
            })
        }
        else{
            Alert('error','Error!',response.data.message);
            dispatch({
                type : 'CHANGE_TEST_TABLE_LOADING_STATUS',
                payload1 : false,
                payload2 : []
            })
    }
    }).catch((error)=>{
        console.log(error);
        Alert('error','Error!','Server Error');
        dispatch({
            type : 'CHANGE_TEST_TABLE_LOADING_STATUS',
            payload1 : false,
            payload2 : []
        })
    })
}

export const updateQuestiosnActiveTest = (d)=>{
    return{
        type:'CHANGE_CURRENT_ACTIVE_TEST_QUESTION',
        payload:d
    }
}