import { PKGCONSTANT } from "../Constants/packageConstant";

const initialState = {
    packageList: [],
    isError: false,
    isLoading: false,
    success : false,
    msg: '',
    errMsg: ''
};


const healthcarepackageReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case PKGCONSTANT.REQUEST_HEALTHCAREPACKAGE:
            return {
                ...state,
                isLoading: true,
                isError: false,
                success : false
            };
        case PKGCONSTANT.RESPONSE_HEALTHCAREPACKAGE:
            return {
                ...state,
                isLoading: false,
                packageList : payload,
                success : true,
                isError: false,              
            };
        case PKGCONSTANT.FAILURE_HEALTHCAREPACKAGE:
            return {
                ...state,
                isLoading: false,
                errMsg: payload,
                success : false,
                isError: true
            };
        default:
            return state;
    }
};

export default healthcarepackageReducer;