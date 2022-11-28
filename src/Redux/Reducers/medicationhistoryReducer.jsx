import { VITALS } from "../Constants/VitalConstants";

const initialState = {
    medicationhistoryData: [],
    isError: false,
    isLoading: false,
    msg: '',
    errMsg: ''
};


const medicationhistoryReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case VITALS.REQUEST_MEDICATIONHISTORYLIST:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case VITALS.SUCCESS_MEDICATIONHISTORYLIST:
            return {
                ...state,
                isLoading: false,
                medicationhistoryData : payload,
                isError: false,              
            };
        case VITALS.FAILED_MEDICATIONHISTORYLIST:
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

export default medicationhistoryReducer;