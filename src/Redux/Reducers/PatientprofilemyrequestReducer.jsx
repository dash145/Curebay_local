import { USER } from "../Constants/userprofileConstants";

const initialState = {
    patientrequestData: [],
    isError: false,
    isLoading: false,
    msg: '',
    errMsg: ''
};


const PatientprofilemyrequestReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case USER.REQUEST_MYREQUESTPATIENT:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case USER.SUCCESS_MYREQUESTPATIENT:
            return {
                ...state,
                isLoading: false,
                patientrequestData : payload,
                isError: false,              
            };
        case USER.FAILED_MYREQUESTPATIENT :
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

export default PatientprofilemyrequestReducer;