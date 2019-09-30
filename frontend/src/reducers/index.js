import { combineReducers } from 'redux'; 
import openDrawer from './opendrawer';
import adminAction from './admin';
import userAction from './loggedinuser'
import trainerAction from './trainer';
import testAction from './test';
import conductTest from './conductTest';
import trainee from './trainee';

export default combineReducers({
    drawer : openDrawer,
    admin : adminAction,
    user : userAction,
    trainer : trainerAction,
    test : testAction,
    conduct:conductTest,
    trainee:trainee
})