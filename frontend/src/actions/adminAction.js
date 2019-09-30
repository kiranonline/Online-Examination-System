import apis from '../services/Apis';
import Alert from '../components/common/alert';
import { SecureGet } from '../services/axiosCall';

export const ChangeTrainerModalState = (d1,d2,d3)=> dispatch =>{
    if(d3==='Save Changes'){
        SecureGet({
            url : `${apis.GET_SINGLE_TRAINER_DETAILS}/${d2}`
        }).then((response)=>{
            console.log(response);
            if(response.data.success){
                dispatch({
                    type : 'CHANGE_TRAINER_MODAL_STATE',
                    payload1 : true,
                    payload2 : d2,
                    payload3 : 'Save Changes',
                    payload4: {
                        ...response.data.data[0],
                        contact :response.data.data[0].contact.slice(3),
                        prefix:response.data.data[0].contact.slice(0,3),
                    }
                })
            }
            else{
                return Alert('warning','Warning!',response.data.message);
            }
        }).catch((error)=>{
            return Alert('error','Error!','Server Error');
        })
    }
    else{
        dispatch({
            type : 'CHANGE_TRAINER_MODAL_STATE',
            payload1 : d1,
            payload2 : d2,
            payload3 : d3,
            payload4: {
                name : null,
                emailid:null,
                contact :null,
                prefix:null,
                password:null,
                confirmpassword : null
            }
        })
    }
}


export const ChangeTrainerConfirmDirty = (d)=> dispatch =>{
    dispatch({
       type : 'CHANGE_TRAINER_FORM_CONFIRMDIRTY',
       payload : d
    })
}


export const ChangeTrainerSearchText = (d)=> dispatch =>{
    dispatch({
       type : 'CHANGE_TRAINER_SEARCH_TEXT',
       payload : d
    })
}

export const ChangeTrainerTableData = ()=> dispatch =>{
    dispatch({
        type : 'CHANGE_TRAINER_TABLE_LOADING_STATUS',
        payload1 : true,
        payload2 : []
    })
    SecureGet({
        url:  `${apis.GET_ALL_TRAINER}`
    }).then((response)=>{
        console.log(response);
        if(response.data.success){
            dispatch({
                type : 'CHANGE_TRAINER_TABLE_LOADING_STATUS',
                payload1 : false,
                payload2 : response.data.data
            })
        }
        else{
            Alert('error','Error!',response.data.message);
            dispatch({
                type : 'CHANGE_TRAINER_TABLE_LOADING_STATUS',
                payload1 : false,
                payload2 : []
            })
        }
      }).catch((error)=>{
        Alert('error','Error!','Server Error');
        dispatch({
            type : 'CHANGE_TRAINER_TABLE_LOADING_STATUS',
            payload1 : false,
            payload2 : []
        })
    })
}

export const ChangeSubjectModalState = (d1,d2,d3)=> dispatch =>{
    if(d3==='Save Changes'){
        SecureGet({
            url : `${apis.GET_SINGLE_SUBJECT_DETAILS}/${d2}`
        }).then((response)=>{
            if(response.data.success){
                dispatch({
                    type : 'CHANGE_SUBJECT_MODAL_STATE',
                    payload1 : true,
                    payload2 : d2,
                    payload3 : 'Save Changes',
                    payload4: response.data.data[0]
                })
            }
            else{
                return Alert('warning','Warning!',response.data.message);
            }
        }).catch((error)=>{
            return Alert('error','Error!','Server Error');
        })
    }
    else{
        dispatch({
            type : 'CHANGE_SUBJECT_MODAL_STATE',
            payload1 : d1,
            payload2 : d2,
            payload3 : d3,
            payload4: {
                topic : null
            }
        })
    }
}


export const ChangeSubjectConfirmDirty = (d)=> dispatch =>{
    dispatch({
       type : 'CHANGE_SUBJECT_FORM_CONFIRMDIRTY',
       payload : d
    })
}


export const ChangeSubjectSearchText = (d)=> dispatch =>{
    dispatch({
       type : 'CHANGE_SUBJECT_SEARCH_TEXT',
       payload : d
    })
}

export const ChangeSubjectTableData = (d)=> dispatch =>{
    console.log('fetchng subjects');
    dispatch({
       type : 'CHANGE_SUBJECT_TABLE_LOADING_STATUS',
       payload1 : true,
       payload2 :[]
    })
    SecureGet({
        url:  `${apis.GET_ALL_SUBJECTS}`
    }).then((response)=>{
        console.log(response);
        if(response.data.success){
            dispatch({
                type : 'CHANGE_SUBJECT_TABLE_LOADING_STATUS',
                payload1 : false,
                payload2 : response.data.data
            })
        }
        else{
            Alert('error','Error!',response.data.message);
            dispatch({
                type : 'CHANGE_SUBJECT_TABLE_LOADING_STATUS',
                payload1 : false,
                payload2 : []
            })
        }
      }).catch((error)=>{
        Alert('error','Error!','Server Error');
        dispatch({
            type : 'CHANGE_SUBJECT_TABLE_LOADING_STATUS',
            payload1 : false,
            payload2 : []
        })
    })

}
