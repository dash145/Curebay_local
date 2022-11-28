import { USER } from "../Constants/userprofileConstants";

const initialState = {
    chronicconditionsDataList: [],
    isError: false,
    isLoading: false,
    msg: '',
    errMsg: ''
};


const chronicConditionsReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case USER.REQUEST_CHRONICCONDITIONSLIST:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case USER.SUCCESS_CHRONICCONDITIONSLIST:
            return {
                ...state,
                isLoading: false,
                chronicconditionsDataList: payload,
                isError: false,
            };
        case USER.FAILED_CHRONICCONDITIONSLIST:
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

export default chronicConditionsReducer;