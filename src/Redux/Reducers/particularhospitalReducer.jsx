import { hos } from "../Constants/Hospitalpageconstants";

const initialState = {
    particularhospitalData: [],
    isError: false,
    isLoading: false,
    msg: '',
    errMsg: ''
};


const parrticularhospitalReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case hos.REQUEST_SPECIFICHOSLIST:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case hos.SUCCESS_SPECIFICHOSLIST:
            return {
                ...state,
                isLoading: false,
                particularhospitalData : payload,
                isError: false,              
            };
        case hos.FAILED_SPECIFICHOSLIST:
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

export default parrticularhospitalReducer;