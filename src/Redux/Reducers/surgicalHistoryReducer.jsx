import { USER } from "../Constants/userprofileConstants";

const initialState = {
    surgicalhistoryDataList: [],
    isError: false,
    isLoading: false,
    msg: '',
    errMsg: ''
};


const surgicalHistoryReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case USER.REQUEST_SURGICALHISTORYLIST:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case USER.SUCCESS_SURGICALHISTORYLIST:
            return {
                ...state,
                isLoading: false,
                surgicalhistoryDataList: payload,
                isError: false,
            };
        case USER.FAILED_SURGICALHISTORYLIST:
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

export default surgicalHistoryReducer;