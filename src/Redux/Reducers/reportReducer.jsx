import { REPORT } from "../Constants/ReportConstant";

const initialState = {
    reportList: [],
    isError: false,
    isLoading: false,
    msg: '',
    errMsg: ''
};


const reportReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case REPORT.REQUEST_REPORTLIST:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case REPORT.SUCCESS_REPORTLIST:
            return {
                ...state,
                isLoading: false,
                reportList: payload,
                isError: false,
            };
        case REPORT.FAILED_REPORTLIST:
            return {
                ...state,
                isLoading: false,
                errMsg: payload,
                isError: true
            };
            case REPORT.REQUEST_UPLOADREPORT:
                return {
                    ...state,
                    isLoading: true,
                    isError: false
                };
            case REPORT.SUCCESS_UPLOADREPORT:
                return {
                    ...state,
                    isLoading: false,
                    // reportList: payload,
                    isError: false,
                };
            case REPORT.FAILED_UPLOADREPORT:
                return {
                    ...state,
                    isLoading: false,
                    errMsg: payload,
                    isError: true
                };
         case REPORT.REQUEST_UPDATEREPORT:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case REPORT.SUCCESS_UPDATEREPORT:
            return {
                ...state,
                isLoading: false,
                // reportList: payload,
                isError: false,
            };
        case REPORT.FAILED_UPDATEREPORT:
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

export default reportReducer;