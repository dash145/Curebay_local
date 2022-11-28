import { doc } from "../Constants/DoctorConstants";

const initialState = {
    specialityData: [],
    isError: false,
    isLoading: false,
    msg: '',
    errMsg: ''
};


const particularspecialityReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case doc.REQUEST_DOCSPECIAITYLIST:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case doc.SUCCESS_DOCSPECIAITYLIST:
            return {
                ...state,
                isLoading: false,
                specialityData : payload,
                isError: false,              
            };
        case doc.FAILED_DOCSPECIAITYLIST:
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

export default particularspecialityReducer;