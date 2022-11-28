import { CHE } from "../Constants/Cheprofileconstants";

const initialState = {
    cheadminnotificationsData: [],
    isError: false,
    isLoading: false,
    msg: '',
    errMsg: ''
};


const cheadminnotificationReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case CHE.REQUEST_CHEADMINNOTIFICATIONS:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case CHE.SUCCESS_CHEADMINNOTIFICATIONS:
            return {
                ...state,
                isLoading: false,
                cheadminnotificationsData : payload,
                isError: false,              
            };
        case CHE.FAILED_CHEADMINNOTIFICATIONS:
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

export default cheadminnotificationReducer;