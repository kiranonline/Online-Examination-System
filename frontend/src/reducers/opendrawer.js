import { TOOGLE_NAVIGATION } from '../actions/types';


const initialState = {
    navigationCollapsed : true
}

export default (state = initialState, action )=>{
    switch(action.type){
        case TOOGLE_NAVIGATION:
            return {
                ...state,
                navigationCollapsed : !state.navigationCollapsed
            }  
        default:
            return state;
    }
}