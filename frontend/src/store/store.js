import { combineReducers, legacy_createStore as createStore } from 'redux';
import loaderReducer from './reducers/loaderReducer.js';

const rootReducer = combineReducers({
    loader: loaderReducer
})

const store = createStore(rootReducer)

export default store