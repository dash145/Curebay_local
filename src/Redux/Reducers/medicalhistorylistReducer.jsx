import { USER } from "../Constants/userprofileConstants";

const initialState = {
    medicalhistoryData: [],
    isError: false,
    isLoading: false,
    msg: '',
    errMsg: ''
};


const medicalhistorylistReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case USER.REQUEST_MEDICALHISTORYLIST:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case USER.SUCCESS_MEDICALHISTORYLIST:
            return {
                ...state,
                isLoading: false,
                medicalhistoryData : payload,
                isError: false,              
            };
        case USER.FAILED_MEDICALHISTORYLIST:
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

export default medicalhistorylistReducer;