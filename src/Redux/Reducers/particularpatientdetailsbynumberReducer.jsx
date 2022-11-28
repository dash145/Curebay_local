import { pat } from "../Constants/patientConstants";

const initialState = {
    particularpatientdetailsbynumberData: [],
    isError: false,
    isLoading: false,
    msg: '',
    errMsg: ''
};


const particularpatientdetailsbynumberReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case pat.REQUEST_PARTICULARPATIENTDETAILSBYNUMBER:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case pat.SUCCESS_PARTICULARPATIENTDETAILSBYNUMBER:
            return {
                ...state,
                isLoading: false,
                particularpatientdetailsbynumberData : payload,
                isError: false,              
            };
        case pat.FAILED_PARTICULARPATIENTDETAILSBYNUMBER:
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

export default particularpatientdetailsbynumberReducer;