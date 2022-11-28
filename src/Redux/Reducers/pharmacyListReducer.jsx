import { PHARMACY } from "../Constants/PharmacyConstant";

const initialState = {
    pharmacyData: [],
    total: "",
    currentPage: 0,
    isError: false,
    isLoading: false,
    msg: '',
    errMsg: ''
};


const pharmalistReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case PHARMACY.REQUEST_PHARMALIST:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case PHARMACY.SUCCESS_PHARMALIST:
            return {
                ...state,
                isLoading: false,
                pharmacyData: payload,
                total: payload.total,
                currentPage: payload.currentPage,
                isError: false,
            };
        case PHARMACY.FAILED_PHARMALIST:
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

export default pharmalistReducer;