const initialState = {
    greet : 'Hi',
    currentStep:0,
    mode:"random",
    newtestFormData:{
        testType:null,
        testTitle: '',
        testDuration : 60,
        OrganisationName:null,
        testSubject:[],
        testQuestions:[]
    },
    questionsAvailablebasedonSubject:[]

}


export default (state = initialState, action )=>{
    switch(action.type){
        case 'CHANGE_ACTIVE_STEP':
            return {
                ...state,
                currentStep : action.payload
            }
        case 'CHANGE_BASIC_NEW_TEST_DETAILS':
            return{
                ...state,
                newtestFormData :{
                    ...state.newtestFormData,
                    ...action.payload
                }
            }
        case 'FETCH_QUESTIONS_BASED_ON_SUBJECT':
            return{
                ...state,
                questionsAvailablebasedonSubject:action.payload
            }
        case 'ADD_QUESTION_TO_QUESTION_QUEUSE':
            return{
                ...state,
                newtestFormData:{
                    ...state.newtestFormData,
                    testQuestions : action.payload
                }
            }
        case 'REMOVE_QUESTION_FROM_MAIN_QUEUE':
            return{
                ...state,
                questionsAvailablebasedonSubject : action.payload
            }
        case 'CHANGE_MODE_QUESTION_SELECT':
            return{
                ...state,
                mode : action.payload
            }
        
        default:
            return state;
    }
}