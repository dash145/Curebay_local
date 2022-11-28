import { AUTH } from "../Constants/AuthConstants";
import { pat } from "../Constants/patientConstants";

const initialState = {
    particularpatientdetailsData: {},
    isError: false,
    isLoading: false,
    memberCode:'',
    msg: '',
    errMsg: ''
};


const particularpatientdetailsReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case pat.REQUEST_PARTICULARPATIENTDETAILS:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case pat.SUCCESS_PARTICULARPATIENTDETAILS:
            return {
                ...state,
                isLoading: false,
                particularpatientdetailsData : payload,
                isError: false,              
            };
        case pat.FAILED_PARTICULARPATIENTDETAILS:
            return {
                ...state,
                isLoading: false,
                errMsg: payload,
                isError: true
            };
        case AUTH.CODE: 
            return {
                ...state,
                memberCode: payload
            }
        default:
            return state;
    }
};

export default particularpatientdetailsReducer;