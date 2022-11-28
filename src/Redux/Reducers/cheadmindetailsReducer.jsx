import { CHE } from "../Constants/Cheprofileconstants";

const initialState = {
    cheadmindetailsData: {},
    isError: false,
    isLoading: false,
    msg: '',
    errMsg: ''
};


const cheadmindetailsReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case CHE.REQUEST_CHEADMINDETAILS:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case CHE.SUCCESS_CHEADMINDETAILS:
            return {
                ...state,
                isLoading: false,
                cheadmindetailsData : payload,
                isError: false,              
            };
        case CHE.FAILED_CHEADMINDETAILS:
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

export default cheadmindetailsReducer;