import { USER } from "../Constants/userprofileConstants";
//import { USER } from "../Constants/userprofileConstants";

const initialState = {
    patientmyordersData: [],
    isError: false,
    isLoading: false,
    msg: '',
    errMsg: ''
};


const patientmyordersReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case USER.REQUEST_PATIENTMYORDERS:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case USER.SUCCESS_PATIENTMYORDERS:
            return {
                ...state,
                isLoading: false,
                patientmyordersData : payload,
                isError: false,              
            };
        case USER.FAILED_PATIENTMYORDERS :
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

export default patientmyordersReducer;