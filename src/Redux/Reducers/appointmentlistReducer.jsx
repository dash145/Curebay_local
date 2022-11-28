import { USER } from "../Constants/userprofileConstants";

const initialState = {
    appointmentlistData: [],
    isError: false,
    isLoading: false,
    msg: '',
    errMsg: ''
};


const appointmentlistReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case USER.REQUEST_APPOINTMENT:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case USER.SUCCESS_APPOINTMENT:
            return {
                ...state,
                isLoading: false,
                appointmentlistData : payload,
                isError: false,              
            };
        case USER.FAILED_APPOINTMENT:
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

export default appointmentlistReducer;