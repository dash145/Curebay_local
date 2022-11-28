import { USER } from "../Constants/userprofileConstants";

const initialState = {
    changepasswordData: '',
    isError: false,
    isLoading: false,
    msg: '',
    errMsg: ''
};


const changepasswordReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case USER.REQUEST_CHANGEPASSWORD:
            return {
                ...state,
                isLoading: true,
                errMsg: ''
            };
        case USER.SUCCESS_CHANGEPASSWORD:
            return {
                ...state,
                isLoading: false,
                changepasswordData: payload,
                isError: false,

            };
        case USER.FAILED_CHANGEPASSWORD:
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

export default changepasswordReducer;