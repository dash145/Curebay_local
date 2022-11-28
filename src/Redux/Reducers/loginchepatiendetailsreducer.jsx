import { pat } from "../Constants/patientConstants";

const initialState = {
    logginchepatientData: [],
    isError: false,
    isLoading: false,
    msg: '',
    errMsg: ''
};

const loginchepatiendetailsreducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case pat.REQUEST_LOGGINCHEPATIENTDETAILS:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case pat.SUCCESS_LOGGINCHEPATIENTDETAILS:
            return {
                ...state,
                isLoading: false,
                logginchepatientData : payload,
                isError: false,              
            };
        case pat.FAILED_LOGGINCHEPATIENTDETAILS:
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

export default loginchepatiendetailsreducer;