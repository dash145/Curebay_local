import { USER } from "../Constants/userprofileConstants";

const initialState = {
    addmedicalhistoryData: {},
    isError: false,
    isLoading: false,
    msg: '',
    errMsg: ''
};


const addmedicalhistoryReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case USER.REQUEST_ADDMEDICALHISTORY:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case USER.SUCCESS_ADDMEDICALHISTORY:
            return {
                ...state,
                isLoading: false,
                addmedicalhistoryData : payload,
                isError: false,              
            };
        case USER.FAILED_ADDMEDICALHISTORY :
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

export default addmedicalhistoryReducer;