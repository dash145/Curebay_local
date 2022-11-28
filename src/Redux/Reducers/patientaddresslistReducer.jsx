import { USER } from "../Constants/userprofileConstants";

const initialState = {
    patientaddressinfoData: [],
    isError: false,
    isLoading: false,
    msg: '',
    errMsg: ''
};


const patientAddresslistReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case USER.REQUEST_PATIENTADDRESSLIST:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case USER.SUCCESS_PATIENTADDRESSLIST:
            return {
                ...state,
                isLoading: false,
                patientaddressinfoData : payload,
                isError: false,              
            };
        case USER.FAILED_PATIENTADDRESSLIST :
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

export default patientAddresslistReducer;