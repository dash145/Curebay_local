import { USER } from "../Constants/userprofileConstants";

const initialState = {
    familyhistoryDataList: [],
    isError: false,
    isLoading: false,
    msg: '',
    errMsg: ''
};


const familyHistoryReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case USER.REQUEST_FAMILYHISTORYLIST:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case USER.SUCCESS_FAMILYHISTORYLIST:
            return {
                ...state,
                isLoading: false,
                familyhistoryDataList: payload,
                isError: false,
            };
        case USER.FAILED_FAMILYHISTORYLIST:
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

export default familyHistoryReducer;