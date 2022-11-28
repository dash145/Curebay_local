import { doc } from "../Constants/DoctorConstants";

const initialState = {
    doctorData: [],
    total: "",
    currentPage: 0,
    isError: false,
    isLoading: false,
    msg: '',
    errMsg: ''
};


const doctorlistReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case doc.REQUEST_DOCLIST:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case doc.SUCCESS_DOCLIST:
            return {
                ...state,
                isLoading: false,
                doctorData: payload,
                // doctorData: state.doctorData.concat(payload.data), for elastic search
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

        case doc.REMOVE_DOCLIST:
            console.log("hesdfsdf")
            return {
                ...state,
                doctorData: [],
                total: "",
                currentPage: 0,
                isLoading: true,
            };
        default:
            return state;
    }
};

export default doctorlistReducer;