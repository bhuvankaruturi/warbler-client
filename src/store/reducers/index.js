import {combineReducers} from 'redux';
import currentUser from './currentUser';
import error from './error';
import message from './message';

const rootReducer = combineReducers({
    currentUser,
    error,
    message
});

export default rootReducer;