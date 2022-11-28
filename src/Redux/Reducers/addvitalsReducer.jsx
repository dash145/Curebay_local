import { VITALS } from "../Constants/VitalConstants";


const initialState = {
    addvitalsData: {},
    isError: false,
    isLoading: false,
    msg: '',
    errMsg: ''
};


const addvitalsReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case VITALS.REQUEST_ADDVITALS:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case VITALS.SUCCESS_ADDVITALS:
            return {
                ...state,
                isLoading: false,
                addvitalsData : payload,
                isError: false,              
            };
        case VITALS.FAILED_ADDVITALS:
            return {
                ...state,
                isLoading: false,
                errMsg: payload,
                isError: true
            };
        default:
            return state;
    }
};

export default addvitalsReducer;