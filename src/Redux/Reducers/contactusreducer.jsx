import { USER } from "../Constants/userprofileConstants";

const initialState = {
    contactusData: {},
    
    isError: false,
    isLoading: false,
    issuccess: false,
    msg: '',
    errMsg: ''
};


const contactusReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case USER.REQUEST_CONTACTUS:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case USER.SUCCESS_CONTACTUS:
            return {
                ...state,
                isLoading: false,
                issuccess : true,
                feedbackData : payload,
                isError: false,              
            };
        case USER.FAILED_CONTACTUS:
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

export default contactusReducer;