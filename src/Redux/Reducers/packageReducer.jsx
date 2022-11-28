import { PKGCONSTANT } from "../Constants/packageConstant";

const initialState = {
    membershipList: [],
    promotionList: [],
    allList: [],
    isError: false,
    isLoading: false,
    success: false,
    msg: '',
    errMsg: ''
};


const packageReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case PKGCONSTANT.REQUEST_MEMBERSHIP:
            return {
                ...state,
                isLoading: true,
                isError: false,
                success: false
            };
        case PKGCONSTANT.RESPONSE_MEMBERSHIP:
            return {
                ...state,
                isLoading: false,
                membershipList: payload,
                success: true,
                isError: false,
            };
        case PKGCONSTANT.FAILURE_MEMBERSHOP:
            return {
                ...state,
                isLoading: false,
                errMsg: payload,
                success: false,
                isError: true
            };

        case PKGCONSTANT.REQUEST_PROMOTION:
            return {
                ...state,
                isLoading: true,
                isError: false,
                success: false
            };
        case PKGCONSTANT.RESPONSE_PROMOTION:
            return {
                ...state,
                isLoading: false,
                promotionList: payload,
                success: true,
                isError: false,
            };
        case PKGCONSTANT.FAILURE_PROMOTION:
            return {
                ...state,
                isLoading: false,
                errMsg: payload,
                success: false,
                isError: true
            };    

        case PKGCONSTANT.REQUEST_ALLSEARCH:
            return {
                ...state,
                isLoading: true,
                isError: false,
                allList: [],
                success: false
            };
        case PKGCONSTANT.RESPONSE_ALLSEARCH:
            return {
                ...state,
                isLoading: false,
                allList: payload,
                success: true,
                isError: false,
            };
        case PKGCONSTANT.FAILURE_ALLSEARCH:
            return {
                ...state,
                isLoading: false,
                errMsg: payload,
                success: false,
                isError: true
            };
        default:
            return state;
    }
};

export default packageReducer;