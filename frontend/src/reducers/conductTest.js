const initialState = { 
    id : null,
    testRegisterLink:'',
    basictestdetails:{
        isRegistrationavailable:false,
        testbegins:false,
        testconducted:false,
        isResultgenerated:false
    },
    registeredCandidates:[],
    questionsOfTest:[]
}
export default (state = initialState, action )=>{
    switch(action.type){
        case 'SET_CONDUCT_TEST_ID':
            return {
                ...state ,
                id:action.payload
            }
        case 'SET_TEST_REGISTER_LINK':
            return {
                ...state ,
                testRegisterLink:action.payload
            }
        case 'UPDATE_TEST_BASIC_DETAILS':
            return{
                ...state,
                basictestdetails:action.payload
            }
        case 'CHANGE_TEST_ISREGISTRATION_AVAILABLE':
            return{
                ...state,
                basictestdetails:{
                    ...state.basictestdetails,
                    isRegistrationavailable:action.payload
                }
            }
        case 'CHANGE_BEGIN_TEST_STATUS':
            return{
                ...state,
                basictestdetails:action.payload
            }
        case 'CHANGE_CANDIDATES_OF_TEST':
            return{
                ...state,
                registeredCandidates:action.payload
            }
        case 'CHANGE_QUESTIONS_OF_TEST':
            return{
                ...state,
                questionsOfTest :action.payload
            }
        default:
            return state;
    }
}