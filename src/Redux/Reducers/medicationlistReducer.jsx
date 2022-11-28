
import { USER } from "../Constants/userprofileConstants";

const initialState = {
    medicationData: [],
    isError: false,
    isLoading: false,
    msg: '',
    errMsg: ''
};

const medicationlistReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case USER.REQUEST_MEDICATIONLIST:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case USER.SUCCESS_MEDICATIONLIST:
            return {
                ...state,
                isLoading: false,
                medicationData : payload,
                isError: false,              
            };
        case USER.FAILED_MEDICATIONLIST:
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

export default medicationlistReducer;