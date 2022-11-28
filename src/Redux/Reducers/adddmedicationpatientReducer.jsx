import { USER } from "../Constants/userprofileConstants";

const initialState = {
    addmedicationData: {},
    isError: false,
    isLoading: false,
    msg: '',
    errMsg: ''
};


const adddmedicationpatientReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case USER.REQUEST_ADDMEDICATION:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case USER.SUCCESS_ADDMEDICATION:
            return {
                ...state,
                isLoading: false,
                addmedicationData : payload,
                isError: false,              
            };
        case USER.FAILED_ADDMEDICATION :
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

export default adddmedicationpatientReducer;