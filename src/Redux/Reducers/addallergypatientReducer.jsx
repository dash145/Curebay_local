import { USER } from "../Constants/userprofileConstants";

const initialState = {
    addallergyData: {},
    isError: false,
    isLoading: false,
    msg: '',
    errMsg: ''
};


const addallergypatientReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case USER.REQUEST_ADDALLERGY:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case USER.SUCCESS_ADDALLERGY:
            return {
                ...state,
                isLoading: false,
                addallergyData : payload,
                isError: false,              
            };
        case USER.FAILED_ADDALLERGY :
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

export default addallergypatientReducer;