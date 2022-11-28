import { PAY } from "../Constants/paymentConstants";

const initialState = {
    billingData: [],
    total: "",
    currentPage: 0,
    isError: false,
    isLoading: false,
    msg: '',
    errMsg: ''
};


const BillingDetails = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case PAY.REQUEST_BILLING:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case PAY.SUCCESS_REQUEST_BILLING:
            return {
                ...state,
                isLoading: false,
                billingData: payload,
                isError: false,
            };
        case PAY.FAILED_BILLING:
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

export default BillingDetails;