import { DIAG } from "../Constants/DiagnosticsConstants";

const initialState = {
    recentlabappointmentData: [],
    isError: false,
    isLoading: false,
    msg: '',
    errMsg: ''
};


const RecentlabappointmentsReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case DIAG.REQUEST_LABAPPOINTMENTLIST:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case DIAG.SUCCESS_LABAPPOINTMENTLIST:
            return {
                ...state,
                isLoading: false,
                recentlabappointmentData : payload,
                isError: false,              
            };
        case DIAG.FAILED_LABAPPOINTMENTLIST:
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

export default RecentlabappointmentsReducer;