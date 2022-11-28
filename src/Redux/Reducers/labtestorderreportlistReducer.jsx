import { USER } from "../Constants/userprofileConstants";

const initialState = {
    partnerlabtestorderreportlisttData: [],
    isError: false,
    isLoading: false,
    msg: '',
    errMsg: ''
};


const labtestorderreportlistReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case USER.REQUEST_PATLABTESTORDEREPORTLIST:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case USER.SUCCESS_PATLABTESTORDEREPORTLIST:
            return {
                ...state,
                isLoading: false,
                partnerlabtestorderreportlisttData : payload,
                isError: false,              
            };
        case USER.FAILED_PATLABTESTORDEREPORTLIST:
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

export default labtestorderreportlistReducer;