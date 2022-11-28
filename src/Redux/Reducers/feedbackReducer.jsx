import { USER } from "../Constants/userprofileConstants";

const initialState = {
    feedbackData: {},
    customercareData:{},
    isError: false,
    isLoading: false,
    issuccess: false,
    msg: '',
    errMsg: ''
};


const feedbackReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case USER.REQUEST_FEEDBACK:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case USER.SUCCESS_FEEDBACK:
            return {
                ...state,
                isLoading: false,
                issuccess : true,
                feedbackData : payload,
                isError: false,              
            };
        case USER.FAILED_FEEDBACK:
            return {
                ...state,
                isLoading: false,
                errMsg: payload,
                isError: true
            };
        case USER.REQUEST_CUSTOMERLIST:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case USER.SUCCESS_CUSTOMERLIST:
            return {
                ...state,
                isLoading: false,
                issuccess : true,
                customercareData : payload,
                isError: false,              
            };
        case USER.FAILED_CUSTOMERLIST:
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

export default feedbackReducer;