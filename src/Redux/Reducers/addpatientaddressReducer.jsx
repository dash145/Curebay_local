import { USER } from "../Constants/userprofileConstants";

const initialState = {
    addaddressData: [],
    isError: false,
    isLoading: false,
    msg: '',
    errMsg: ''
};


const addpatientaddressReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case USER.REQUEST_ADDPATIENTADDRESS:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case USER.SUCCESS_ADDPATIENTADDRESS:
            return {
                ...state,
                isLoading: false,
                addaddressData : payload,
                isError: false,              
            };
        case USER.FAILED_ADDPATIENTADDRESS :
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

export default addpatientaddressReducer;