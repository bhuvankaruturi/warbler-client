import {LOAD_MESSAGES, REMOVE_MESSAGE} from '../actionTypes';
import {addError} from './error';
import apiCall from '../../services/apiCall';


export const loadMessages = function(messages) {
    return {
        type: LOAD_MESSAGES,
        messages
    }; 
};

export const remove = id => ({
  type: REMOVE_MESSAGE,
  id
}); 

export const removeMessage = (user_id, message_id) => {
  return dispatch => {
    return apiCall("delete", `/api/users/${user_id}/messages/${message_id}`)
      .then(() => dispatch(remove(message_id)))
      .catch(err => {
        addError(err.message);
      });
  };
};

export function getMessages(messages) {
    return dispatch => {
        return apiCall('get', '/api/messages', {})
                .then(messages => { 
                    return dispatch(loadMessages(messages));
                })
                .catch(err => dispatch(addError(err)));
    };
}

export const postNewMessage = text => (dispatch, getState) => {
  let { currentUser } = getState();
  const id = currentUser.user.id;
  return apiCall("post", `/api/users/${id}/messages`, { text })
    .then(res => {})
    .catch(err => addError(err.message));
};