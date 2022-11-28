import { USER } from "../Constants/userprofileConstants";

const initialState = {
    notificationData: [],
    isError: false,
    isLoading: false,
    msg: '',
    errMsg: ''
};


const notificationReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case USER.REQUEST_NOTIFICATIONS:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case USER.SUCCESS_NOTIFICATIONS:
            return {
                ...state,
                isLoading: false,
                notificationData : action.payload,
                isError: false,              
            };
        case USER.FAILED_NOTIFICATIONS:
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

export default notificationReducer;