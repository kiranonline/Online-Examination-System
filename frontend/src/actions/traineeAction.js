import apis from '../services/Apis';
import Alert from '../components/common/alert';
import { Post } from '../services/axiosCall';

let parse_time = (d)=>{
    console.log(`${d}I am called`)
    var m_left =Math.floor(d/60)
    var s_left=Number(String(d%60).slice(0,2))
    return{
        m_left:m_left,
        s_left:s_left
    }
}


export const setTestDetsils=(d1,d2)=>{
    return({
        type:'SET_TRAINEE_TEST_DETAILS',
        payload1:d1,
        payload2:d2
    })
}
export const LocaltestDone = (d)=> dispatch =>{
    dispatch({
        type : 'TEST_DONE_LOCAL'
    })
}





export const fetchTraineedata =(d)=>dispatch=>{
    Post({
        url:apis.FETCH_TRAINEE_DETAILS,
        data:{
            _id:d
        }
    }).then((response)=>{
        console.log(response)
        if(response.data.success){
            dispatch({
                type:'FETCH_LOGGED_IN_TRAINEE',
                payload:response.data.data
            })
        }
        else{
            Alert('error','Error!',response.data.message);
        }
    })
}


export const fetchTestdata =(d1,d2)=>dispatch=>{
    Post({
        url:apis.FETCH_TRAINEE_TEST_DETAILS,
        data:{
            testid:d1,
            traineeid:d2
        }
    }).then((response)=>{
        console.log(response.data);
        if(response.data.success){
            if(response.data.data.completed || !response.data.data.startedWriting){
                dispatch({
                    type:'FETCH_TEST_FLAG',
                    payload1:response.data.data.testbegins,
                    payload2:response.data.data.startedWriting,
                    payload3:response.data.data.testconducted,
                    payload4:response.data.data.completed,
                    payload5:0,
                    payload6:0
                })
            }
            else{
                let t=parse_time(response.data.data.pending);
                dispatch({
                    type:'FETCH_TEST_FLAG',
                    payload1:response.data.data.testbegins,
                    payload2:response.data.data.startedWriting,
                    payload3:response.data.data.testconducted,
                    payload4:response.data.data.completed,
                    payload5:t.m_left,
                    payload6:t.s_left
                })
            }
            
        }
        else{
            dispatch({
                type:'invalidUrl',
            })
        }
    }).catch((err)=>{
        dispatch({
            type:'invalidUrl',
        })  
    })
}


export const ProceedtoTest=(d1,d2,d3)=>dispatch=>{
    console.log(`Hello from ins${d1},${d2}`)
    dispatch({
        type:'PROCEEDING_TO_TEST',
        payload:true
    })
    Post({
        url:`${apis.PROCEED_TO_TEST}`,
        data:{
            testid:d1,
            userid:d2
        }
    }).then((response)=>{
        console.log(response);
        if(!response.data.success){
            Alert('error','Error!',response.data.message);
        }
        d3();
        dispatch({
            type:'PROCEEDING_TO_TEST',
            payload:false
        })
    }).catch((error)=>{
        console.log(error)
        dispatch({
            type:'PROCEEDING_TO_TEST',
            payload:false
        })
        Alert('error','Error!',"Server error");
    })
}


export const fetchTraineeTestQuestions=(tid)=>dispatch=>{
    Post({
        url:`${apis.FETCH_TRAINEE_TEST_QUESTION}`,
        data:{
            id:tid
        }
    }).then((response)=>{
        console.log(response.data);
        if(response.data.success){
            dispatch({
                type:'UPDATE_TRAINEE_TEST_QUESTIONS',
                payload:response.data.data
            })
        } 
        else{
            Alert('error','Error!',response.data.message);
        }
    }).catch((error)=>{
        console.log(error);
        Alert('error','Error!',"Server error");
    })
}


export const fetchTraineeTestAnswerSheet=(tid,uid)=>dispatch=>{
    Post({
        url:`${apis.FETCH_TRAINEE_TEST_ANSWERSHEET}`,
        data:{
            testid:tid,
            userid:uid
        }
    }).then((response)=>{
        if(response.data.success){
            console.log(response.data.data);
            var d=response.data.data.answers.map((d,i)=>{
                if(d.chosenOption.length===0){
                    return({
                        ...d,
                        isMarked:false,
                        isAnswered:false
                    })
                }
                else{
                    return({
                        ...d,
                        isMarked:false,
                        isAnswered:true
                    })
                }
                
            })
            dispatch({
                type:'UPDATE_TRAINEE_TEST_ANSWERSHEET',
                payload:d
            })
        } 
        else{
            Alert('error','Error!',response.data.message);
        }
    }).catch((error)=>{
        console.log(error);
        Alert('error','Error!',"Server error");
    })
}

export const switchQuestion = (d1)=>{
    return{
        type:'SWITCH_QUESTION',
        payload:d1
    }
}

export const updateIsMarked = (d1)=>{
    return {
        type:'UPDATE_TRAINEE_TEST_ANSWERSHEET',
        payload:d1
    }
}

export const FeedbackStatus = (s)=>{
    return{
        type:'SET_HAS_GIVEN_FEEDBACK',
        payload:s
    }
}

