import { doc } from "../Constants/DoctorConstants";


const initialState = {
    doctorData: [],
    doctorsCountDetail: '',
    total: "",
    currentPage: 0,
    isError: false,
    isLoading: false,
    msg: '',
    errMsg: ''
};


const DoctorlistReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case doc.REQUEST_ALL_DOCLIST:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case doc.SUCCESS_ALL_DOCLIST:
            const alldata = payload?.alldata ?? payload ?? [];
            return {
                ...state,
                isLoading: false,
                doctorData: alldata,
                total: payload.total,
                currentPage: payload.currentPage,
                isError: false,
            };
        case doc.FAILED_ALL_DOCLIST:
            return {
                ...state,
                isLoading: false,
                errMsg: payload,
                isError: true
            };
        case doc.REQUEST_DOCLIST:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case doc.SUCCESS_DOCLIST:
            const data = payload?.data ?? payload ?? [];
            console.log("Doctor Payload", payload)
            return {
                ...state,
                isLoading: false,
                doctorData: data ?? data,
                total: payload.total,
                currentPage: payload.currentPage,
                isError: false,
            };
        case doc.FAILED_DOCLIST:
            return {
                ...state,
                isLoading: false,
                errMsg: payload,
                isError: true
            };

            case doc.REQUEST_DOCLIST_COUNT:
                return {
                    ...state,
                    isLoading: true,
                    isError: false
                };
            case doc.SUCCESS_DOCLIST_COUNT:
                const countData = payload?.data ?? payload ?? [];
                return {
                    ...state,
                    isLoading: false,
                    doctorsCountDetail: countData ?? countData,
                    isError: false,
                };
            case doc.FAILED_DOCLIST_COUNT:
                return {
                    ...state,
                    isLoading: false,
                    errMsg: payload,
                    isError: true
                };

        case doc.REMOVE_DOCLIST:
            return {
                ...state,
                doctorData: [],
                total: "",
                currentPage: 0,
                isLoading: true,
            };
            
        case doc.REQUEST_DOCFEES:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case doc.SUCCESS_DOCFEES:
            const fees = payload?.data ?? payload ?? [];
            console.log("Doctor Fees", payload)
            return {
                ...state,
                isLoading: false,
                userFee: state?.userFee?.concat(fees) ?? fees,
                total: payload.total,
                currentPage: payload.currentPage,
                isError: false,
            };
        case doc.FAILED_DOCFEES:
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

export default DoctorlistReducer;