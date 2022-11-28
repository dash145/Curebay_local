import { USER } from "../Constants/userprofileConstants";

const initialState = {
    partnerlabtestorderlisttData: [],
    isError: false,
    isLoading: false,
    msg: '',
    errMsg: ''
};


const labtestorderlistReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case USER.REQUEST_PATLABTESTORDERLIST:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case USER.SUCCESS_PATLABTESTORDERLIST:
            return {
                ...state,
                isLoading: false,
                partnerlabtestorderlisttData : payload,
                isError: false,              
            };
        case USER.FAILED_PATLABTESTORDERLIST:
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

export default labtestorderlistReducer;