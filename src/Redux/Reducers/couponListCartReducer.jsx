import { USER } from "../Constants/userprofileConstants";

const initialState = {
    couponListCart: [],
    isError: false,
    isLoading: false,
    msg: '',
    errMsg: ''
};


const couponListCartReducer = (state = initialState, action) => {
    const { type, payload } = action;

    console.log('sdefnksdnfkds',payload)
    switch (type) {
        case USER.REQUEST_COUPON_CART:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case USER.SUCCESS_COUPON_CART:
            return {
                ...state,
                isLoading: false,
                couponListCart: payload,
                isError: false,
            };
        case USER.FAILED_COUPON_CART:
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

export default couponListCartReducer;