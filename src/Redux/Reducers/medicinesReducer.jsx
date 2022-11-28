import { PHARMACY } from "../Constants/PharmacyConstant";

const initialState = {
    medicines: [],
    isError: false,
    isLoading: false,
    msg: '',
    errMsg: '',
    total: 0,
};


const medicinesReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case PHARMACY.REQUEST_SEARCH:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case PHARMACY.SUCCESS_SEARCH:
            return {
                ...state,
                isLoading: false,
                medicines: payload,
                total: payload.total,
                currentPage: payload.currentPage,
                isError: false,
                msg: 'fetched'
            };
        case PHARMACY.FAILED_SEARCH:
            return {
                ...state,
                isLoading: false,
                errMsg: payload,
                isError: true,
            };
        default:
            return state;
    }
};

export default medicinesReducer;