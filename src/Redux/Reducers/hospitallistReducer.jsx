import { hos } from "../Constants/Hospitalpageconstants";

const initialState = {
    hospitallistData: [],
    isError: false,
    isLoading: false,
    total: "",
    currentPage: 0,
    msg: '',
    errMsg: ''
};


const hospitallistReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case hos.REQUEST_HOSLIST:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case hos.SUCCESS_HOSLIST:

            console.log("hello", payload)
            return {
                ...state,
                isLoading: false,
                hospitallistData: payload,
                // hospitallistData: state.hospitallistData.concat(payload.data), for elastic search use this
                total: payload.total,
                currentPage: payload.currentPage,
                isError: false,
            };
        case hos.FAILED_HOSLIST:
            return {
                ...state,
                isLoading: false,
                errMsg: payload,
                isError: true
            };
        case hos.REMOVE_HOSLIST:
            return {
                ...state,
                hospitallistData: [],
                total: "",
                currentPage: 0,
                isLoading: true
            }
        default:
            return state;
    }
};

export default hospitallistReducer;