/* global localStorage */
import apiCall, {setAuthorizationHeaders} from '../../services/apiCall';
import {SET_CURRENT_USER} from '../actionTypes';
import {addError, removeError} from './error';

export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        user
    };
}

export function logout() {
    return dispatch => {
        localStorage.clear();
        setAuthorizationHeaders(false);
        dispatch(setCurrentUser({}));
    };
}

export function authUser(type, userData) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            return apiCall('post', `/api/auth/${type}`, userData)
                    .then(({token, ...user}) => {
                        localStorage.setItem('jwtToken', token);
                        setAuthorizationHeaders(token);
                        dispatch(setCurrentUser(user));
                        dispatch(removeError());
                        resolve();
                    })
                    .catch(err => {
                        dispatch(addError(err));
                        reject(err);
                    });
        });
    };
}