import { Types } from '../actions/slots';

const INITIAL_STATE = {
    items: []
};

export default function slots(state = INITIAL_STATE, action){
    switch(action.type){
        case Types.GET_SLOTS_SUCCESS: {
            return {
                ...state,
                items: action.payload.items
            }
        }
        case Types.SLOT_ERROR: {
            return {
                ...state,
                error: action.payload.error
            }
        }
        default: {
            return state;
        }
    }
}