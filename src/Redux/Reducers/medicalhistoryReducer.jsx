import { VITALS } from "../Constants/VitalConstants";

const initialState = {
    medicalhistoryData: [],
    isError: false,
    isLoading: false,
    msg: '',
    errMsg: ''
};


const medicalhistoryReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case VITALS.REQUEST_MEDICALHISTORYLIST:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case VITALS.SUCCESS_MEDICALHISTORYLIST:
            return {
                ...state,
                isLoading: false,
                medicalhistoryData : payload,
                isError: false,              
            };
        case VITALS.FAILED_MEDICALHISTORYLIST:
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

export default medicalhistoryReducer;