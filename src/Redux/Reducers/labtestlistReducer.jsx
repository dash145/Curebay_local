import { DIAG } from "../Constants/DiagnosticsConstants";

const initialState = {
    labTestlist: [],
    isError: false,
    isLoading: false,
    msg: '',
    errMsg: ''
};


const LabTestListReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case DIAG.REQUEST_GETLABTESTLIST:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case DIAG.SUCCESS_GETLABTESTLIST:
            return {
                ...state,
                isLoading: false,
                labTestlist : payload,
                isError: false,              
            };
        case DIAG.FAILED_GETLABTESTLIST:
            return {
                ...state,
                isLoading: false,
                errMsg: payload,
                isError: true
            };
            case DIAG.REMOVE_LAB_LIST: 
            return {
                ...state,
                labTestlist: [],
                isLoading: true,
            }    
        default:
            return state;
    }
};

export default LabTestListReducer;