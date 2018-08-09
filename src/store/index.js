import {createStore, applyMiddleware, compose} from 'redux';
import ReduxThunk  from 'redux-thunk';
import rootReducer from './reducers';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = function() {
    const store = createStore(rootReducer,
    composeEnhancer(applyMiddleware(ReduxThunk)));
    return store;
};

export default configureStore;