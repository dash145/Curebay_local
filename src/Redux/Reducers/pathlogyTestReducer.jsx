import { DIAG } from "../Constants/DiagnosticsConstants";
const initialState = {
    pathlogyTestData: [],
    isError: false,
    isLoading: false,
    msg: '',
    errMsg: ''
};


const pathLogyReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case DIAG.REQUEST_PATHOLOGYTEST:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case DIAG.SUCCESS_PATHOLOGYTESTLIST:
            return {
                ...state,
                isLoading: false,
                pathlogyTestData : payload,
                isError: false,              
            };
        case DIAG.FAILED_PATHOLOGYTESTLIST:
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

export default pathLogyReducer;