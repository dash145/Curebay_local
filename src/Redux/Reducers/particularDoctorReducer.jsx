import { doc } from "../Constants/DoctorConstants";

const initialState = {
    particularDoct: {},
    hospitalcliniclistData: [],
    isError: false,
    isLoading: false,
    msg: '',
    errMsg: ''
};


const particularDoctorReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case doc.REQUEST_PARTICULARDOC:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case doc.SUCCESS_PARTICULARDOC:
            return {
                ...state,
                isLoading: false,
                particularDoct: action.payload,
                isError: false,
            };
        case doc.FAILED_PARTICULARDOC:
            return {
                ...state,
                isLoading: false,
                errMsg: payload,
                isError: true
            };
        case doc.REQUEST_HOSPITALCLINICLIST:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case doc.SUCCESS_HOSPITALCLINICLIST:
            return {
                ...state,
                isLoading: false,
                hospitalcliniclistData: action.payload,
                isError: false,
            };
        case doc.FAILED_HOSPITALCLINICLIST:
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

export default particularDoctorReducer;