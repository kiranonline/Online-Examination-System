const initialState = {
    proceedingToTest:false,
    invalidUrl:false,
    testid:null,
    traineeid:null,
    initialloading1:true,
    initialloading2:true,
    testbegins : true,
    startedWriting:true,
    testconducted:false,
    LocaltestDone:true,
    m_left:0,
    s_left:0,
    traineeDetails:{
        name:"",
        emailid:"",
        contact:""
    },
    activeQuestionIndex:0,
    questions:[],
    answers:[],
    hasGivenFeedBack:false
}


export default (state = initialState, action )=>{
    switch(action.type){
        case 'SET_HAS_GIVEN_FEEDBACK':
            return{
                ...state,
                hasGivenFeedBack:action.payload
            }
        case 'SET_TRAINEE_TEST_DETAILS':
            return{
                ...state,
                testid:action.payload1,
                traineeid:action.payload2,
            }
        case 'FETCH_TEST_FLAG':
            return{
                ...state,
                testbegins:action.payload1,
                startedWriting:action.payload2,
                testconducted:action.payload3,
                LocaltestDone:action.payload4,
                m_left:action.payload5,
                s_left:action.payload6,
                initialloading1:false
            }
        case 'INVALID_TEST_URL':
            return{
                ...state,
                invalidUrl:true
            }
        case 'TEST_DONE_LOCAL':
            return {
                ...state,
                LocaltestDone : true
            }
        case 'PROCEEDING_TO_TEST':
            return{
                ...state,
                proceedingToTest:action.payload
            }
        case 'SWITCH_QUESTION':
            return {
                ...state,
                activeQuestionIndex:action.payload
            }
        case 'FETCH_LOGGED_IN_TRAINEE':
            return{
                ...state,
                initialloading2:false,
                traineeDetails:action.payload
            }
        case 'UPDATE_TRAINEE_TEST_QUESTIONS':
            return{
                ...state,
                questions:action.payload
            }
        case 'UPDATE_TRAINEE_TEST_ANSWERSHEET':
            return{
                ...state,
                answers:action.payload
            }
        default:
            return state;
    }
}