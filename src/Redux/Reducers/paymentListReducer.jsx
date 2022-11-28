import { PAY } from "../Constants/paymentConstants";

const initialState = {
    paymentData: [],
    total: "",
    currentPage: 0,
    isError: false,
    isLoading: false,
    msg: '',
    errMsg: ''
};


const paymentListReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case PAY.REQUEST_PAYMENTLIST:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case PAY.SUCCESS_SUCCESSFULLLIST:
            return {
                ...state,
                isLoading: false,
                paymentConstants: payload,
                paymentData: payload,
               // total: payload.total,
               // currentPage: payload.currentPage,
                isError: false,
            };
        case PAY.FAILED_PAYMENTLIST:
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

export default paymentListReducer;