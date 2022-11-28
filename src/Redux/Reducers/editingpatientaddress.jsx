import { USER } from "../Constants/userprofileConstants";

const initialState = {
    editaddressData: [],
    isError: false,
    isLoading: false,
    msg: '',
    errMsg: ''
};


const editingpatientaddressReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case USER.REQUEST_EDITPATIENTADDRESS:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case USER.SUCCESS_EDITPATIENTADDRESS:
            return {
                ...state,
                isLoading: false,
                editaddressData : payload,
                isError: false,              
            };
        case USER.FAILED_EDITPATIENTADDRESS:
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

export default editingpatientaddressReducer;