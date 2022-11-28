import { doc } from "../Constants/DoctorConstants";

const initialState = {
    fromdatetodateData: [],
    isError: false,
    isLoading: false,
    success : false,
    msg: '',
    errMsg: ''
};


const doctorslotfromdatetodateReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case doc.REQUEST_DOCSLOTSFORDATETODATE:
            return {
                ...state,
                isLoading: true,
                isError: false,
                success : false
            };
        case doc.SUCCESS_DOCSLOTSFORDATETODATE:
            return {
                ...state,
                isLoading: false,
                fromdatetodateData : payload,
                success : true,
                isError: false,              
            };
        case doc.FAILED_DOCSLOTSFORDATETODATE:
            return {
                ...state,
                isLoading: false,
                errMsg: payload,
                success : false,
                isError: true
            };
        default:
            return state;
    }
};

export default doctorslotfromdatetodateReducer;