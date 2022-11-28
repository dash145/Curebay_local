import { DIAG } from "../Constants/DiagnosticsConstants";
const initialState = {
    partnerlablisttData: [],
    isError: false,
    isLoading: false,
    msg: '',
    errMsg: ''
};


const partnerlablistReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case DIAG.REQUEST_LABLIST:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case DIAG.SUCCESS_LABLIST:
            return {
                ...state,
                isLoading: false,
                // partnerlablisttData : payload.data,
                partnerlablisttData : payload,
                isError: false,              
            };
        case DIAG.FAILED_LABLIST:
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

export default partnerlablistReducer;