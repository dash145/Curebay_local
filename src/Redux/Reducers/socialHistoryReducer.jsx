import { USER } from "../Constants/userprofileConstants";

const initialState = {
    socialhistoryDataList: [],
    isError: false,
    isLoading: false,
    msg: '',
    errMsg: ''
};


const socialHistoryReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case USER.REQUEST_SOCIALHISTORYLIST:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case USER.SUCCESS_SOCIALHISTORYLIST:
            return {
                ...state,
                isLoading: false,
                socialhistoryDataList: payload,
                isError: false,
            };
        case USER.FAILED_SOCIALHISTORYLIST:
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

export default socialHistoryReducer;