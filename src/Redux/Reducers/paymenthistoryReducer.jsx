import { USER } from "../Constants/userprofileConstants";

const initialState = {
    paymenthistoryData: [],
    isError: false,
    isLoading: false,
    msg: '',
    errMsg: ''
};


const paymenthistoryReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case USER.REQUEST_PATIENTPAYMENTHISTORY:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case USER.SUCCESS_PATIENTPAYMENTHISTORY:
            return {
                ...state,
                isLoading: false,
                paymenthistoryData : payload,
                isError: false,              
            };
        case USER.FAILED_PATIENTPAYMENTHISTORY :
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

export default paymenthistoryReducer;