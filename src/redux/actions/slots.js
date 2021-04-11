export const Types = {
    GET_SLOTS_REQUEST: 'slots/GET_SLOTS_REQUEST',
    GET_SLOTS_SUCCESS: 'slots/GET_SLOTS_SUCCESS',
    SLOT_ERROR: 'slots/SLOT_ERROR'
}

export const getSlotsRequest = () => ({
    type: Types.GET_SLOTS_REQUEST
})

export const getSlotsSuccess = ({items}) => ({
    type: Types.GET_SLOTS_SUCCESS,
    payload: {
        items
    }
})

export const slotError = ({error}) => ({
    type: Types.SLOT_ERROR,
    payload: {
        error
    }
});