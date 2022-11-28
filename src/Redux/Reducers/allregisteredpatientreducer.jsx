import { pat } from "../Constants/patientConstants";

const initialState = {
    allregisteredpatientdetailsData: [],
    isError: false,
    isLoading: false,
    msg: '',
    errMsg: ''
};


const allregisterpatientdetailsReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case pat.REQUEST_ALLREGISTEREDPATIENTLIST:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case pat.SUCCESS_ALLREGISTEREDPATIENTLIST:
            return {
                ...state,
                isLoading: false,
                allregisteredpatientdetailsData : payload,
                isError: false,              
            };
        case pat.FAILED_ALLREGISTEREDPATIENTLIST:
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

export default allregisterpatientdetailsReducer;