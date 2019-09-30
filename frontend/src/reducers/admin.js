const initialState = {
    TrainermodalOpened : false,
    TrainerconfirmDirty: false,
    Trainermode : 'Register',
    trainerId : null,
    TrainersearchText : '',
    trainerTableLoadingStatus:false,
    trainerEditFormLoadingStatus:false,
    trainerTableData:[],
    trainerdetails:{},
    subjectTableData : [] ,
    SubjectmodalOpened : false,
    SubjectconfirmDirty: false,
    Subjectmode : 'New Topic',
    SubjectId : null,
    SubjectsearchText : '',
    SubjectTableLoading : false, 
    subjectDetails :{}    
}

export default (state = initialState, action )=>{
    switch(action.type){
        case 'CHANGE_TRAINER_MODAL_STATE':
            return {
                ...state,
                TrainermodalOpened : action.payload1,
                trainerId : action.payload2,
                Trainermode : action.payload3,
                trainerdetails : action.payload4

            }
        case 'CHANGE_TRAINER_FORM_CONFIRMDIRTY':
            return {
                ...state,
                TrainerconfirmDirty : action.payload
            }
        case 'CHANGE_TRAINER_SEARCH_TEXT':
                return {
                    ...state,
                    TrainersearchText : action.payload
                }
        case 'CHANGE_TRAINER_TABLE_LOADING_STATUS':
                return {
                    ...state,
                    trainerTableLoadingStatus : action.payload1,
                    trainerTableData : action.payload2,

                }
        case 'CHANGE_SUBJECT_MODAL_STATE':
            return {
                ...state,
                SubjectmodalOpened : action.payload1,
                SubjectId : action.payload2,
                Subjectmode : action.payload3,
                subjectDetails : action.payload4
            }
        case 'CHANGE_SUBJECT_FORM_CONFIRMDIRTY':
            return {
                ...state,
                SubjectconfirmDirty : action.payload
            }
        case 'CHANGE_SUBJECT_SEARCH_TEXT':
                return {
                    ...state,
                    SubjectsearchText : action.payload
                }
        case 'CHANGE_SUBJECT_TABLE_LOADING_STATUS':
                return {
                    ...state,
                    SubjectTableLoading : action.payload1,
                    subjectTableData :action.payload2
                }
        default:
            return state;
    }
}