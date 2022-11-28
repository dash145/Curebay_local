import { REGISTER } from '../Constants/RegistrationConstants';

import { MSGCONSTANT } from '../Constants/msgConstant';
const initialState = {
    userData: {},
    isError: false,
    isLoading: false,
    msg: '',
    errMsg: ''
};

const RegistrationReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case REGISTER.REQUEST_REGISTRATION:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case REGISTER.SUCCESS_REGISTRATION:
            return {
                ...state,
                isLoading: false,
                msg: 'User Registration ' + MSGCONSTANT.success
                ,userData:payload,
                isError: false,              
            };
        case REGISTER.FAILED_REGISTRATION:
            return {
                ...state,
                isLoading: false,
                msg: "User Registration" +MSGCONSTANT.error,
                errMsg: payload,
                isError: true
            };
        default:
            return state;
    }
};




export default RegistrationReducer;