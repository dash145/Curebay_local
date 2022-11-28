import { VITALS } from "../Constants/VitalConstants";

const initialState = {
    vitalslistData: [],
    isError: false,
    isLoading: false,
    msg: '',
    errMsg: ''
};


const vitalsReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case VITALS.REQUEST_VITALSLIST:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case VITALS.SUCCESS_VITALSLIST:
            return {
                ...state,
                isLoading: false,
                vitalslistData : payload,
                isError: false,              
            };
        case VITALS.FAILED_VITALSLIST:
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

export default vitalsReducer;