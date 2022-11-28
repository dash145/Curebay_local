import { DASH } from "../Constants/Dashboardconstants";

const initialState = {
    loggincheadminData: [],
    isError: false,
    isLoading: false,
    msg: '',
    errMsg: ''
};


const chelogginadminreducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case DASH.REQUEST_LOGINCHEUSER:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case DASH.SUCCESS_LOGINCHEUSER:
            return {
                ...state,
                isLoading: false,
                loggincheadminData : payload,
                isError: false,              
            };
        case DASH.FAILED_LOGINCHEUSER:
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

export default chelogginadminreducer;