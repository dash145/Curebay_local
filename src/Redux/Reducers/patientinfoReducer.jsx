import { pat } from "../Constants/patientConstants";
import { USER } from "../Constants/userprofileConstants";

const initialState = {
    patientinfoData: {},
    isError: false,
    isSuccess: 0,
    isLoading: false,
    msg: '',
    errMsg: ''
};


const patientinfoReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case pat.REQUEST_PATIENTINFO:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case pat.SUCCESS_PATIENTINFO:
            return {
                ...state,
                isLoading: false,
                patientinfoData: payload,
                isError: false,
            };
        case pat.FAILED_PATIENTINFO:
            return {
                ...state,
                isLoading: false,
                errMsg: payload,
                isError: true
            };

        case USER.REQUEST_USEREDIT:
            return {
                ...state,
                isLoading: true,
                isError: false,
                isSuccess: 0
            };
        case USER.SUCCESS_USEREDIT:
            return {
                ...state,
                isLoading: false,
                isSuccess: payload,
                isError: false,
            };
        case USER.FAILED_USEREDIT:
            return {
                ...state,
                isLoading: false,
                errMsg: payload,
                isError: true,
                isSuccess: 0
            };
        default:
            return state;
    }
};

export default patientinfoReducer;