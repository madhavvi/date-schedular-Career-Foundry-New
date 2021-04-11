import { combineReducers } from 'redux';
import SlotsReducer from './reducers/slots';

export default combineReducers({
    slots: SlotsReducer
})