import { USER } from "../Constants/userprofileConstants";

const initialState = {
    resetPasswordData: '',
    isError: false,
    isLoading: false,
    msg: '',
    errMsg: ''
};


const resetPasswordReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case USER.REQUEST_RESETPASSWORD:
            return {
                ...state,
                isLoading: true,
                errMsg: ''
            };
        case USER.SUCCESS_RESETPASSWORD:
            return {
                ...state,
                isLoading: false,
                resetPasswordData: payload,
                isError: false,

            };
        case USER.FAILED_RESETPASSWORD:
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

export default resetPasswordReducer;