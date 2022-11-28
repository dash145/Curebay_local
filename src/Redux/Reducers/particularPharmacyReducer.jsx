import { PHARMACY } from "../Constants/PharmacyConstant";

const initialState = {
    particularPharma: [],
    brandInfo: [],
    isError: false,
    isLoading: false,
    msg: '',
    errMsg: ''
};


const particularPharmacyReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case PHARMACY.REQUEST_PARTICULARPHARMA:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case PHARMACY.SUCCESS_PARTICULARPHARMA:
            return {
                ...state,
                isLoading: false,
                particularPharma: payload,
                total: payload.total,
                currentPage: payload.currentPage,
                isError: false,
            };
        case PHARMACY.FAILED_PARTICULARPHARMA:
            return {
                ...state,
                isLoading: false,
                errMsg: payload,
                isError: true
            };
            case PHARMACY.REQUEST_BRANDFILTER:
                return {
                    ...state,
                    isLoading: true,
                    isError: false
                };
            case PHARMACY.SUCCESS_BRANDFILTER:
                return {
                    ...state,
                    isLoading: false,
                    brandInfo: payload,
                    isError: false,
                };
            case PHARMACY.FAILED_BRANDFILTER:
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

export default particularPharmacyReducer;