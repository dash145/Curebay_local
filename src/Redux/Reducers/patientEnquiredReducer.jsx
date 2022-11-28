
import { pat } from "../Constants/patientConstants";

const initialState = {
    userData: {},
    isError: false,
    isLoading: false,
    errMsg: ''
};


const PatientEnquiredReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case pat.REQUEST_PATIENTENQUIREDETAILS:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case pat.SUCCESS_PATIENTENQUIREDETAILS:
            return {
                ...state,
                isLoading: false,
                userData : payload,
                isError: false,             
            };
        case pat.FAILED_PATIENTENQUIREDETAILS:
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

export default PatientEnquiredReducer;