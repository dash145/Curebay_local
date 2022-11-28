import { pat } from "../Constants/patientConstants";

const initialState = {
    Patientvitalsdetailsdata: [],
    isError: false,
    isLoading: false,
    msg: '',
    errMsg: ''
};


const PatientvitalsdetailsReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case pat.REQUEST_PATIENTVITALSDETAILS:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case pat.SUCCESS_PATIENTVITALSDETAILS:
            return {
                ...state,
                isLoading: false,
                Patientvitalsdetailsdata : payload,
                isError: false,              
            };
        case pat.FAILED_PATIENTVITALSDETAILS:
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

export default PatientvitalsdetailsReducer;