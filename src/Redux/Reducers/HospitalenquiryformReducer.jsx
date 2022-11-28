import { hos } from "../Constants/Hospitalpageconstants";


const initialState = {
    hospitalenquiryData: {},
    isError: false,
    isLoading: false,
    msg: '',
    errMsg: ''
};


const HospitalenquiryformReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case  hos.REQUEST_HOSPENQUIRYFORM: 
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case hos.SUCCESS_HOSPENQUIRYFORM:
            return {
                ...state,
                isLoading: false,
                hospitalenquiryData : payload,
                isError: false,              
            };
        case hos.FAILED_HOSPENQUIRYFORM:
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

export default HospitalenquiryformReducer;