import { USER } from "../Constants/userprofileConstants";

const initialState = {
    couponListDoctor: [],
    isError: false,
    isLoading: false,
    msg: '',
    errMsg: ''
};


const couponListDoctorReducer = (state = initialState, action) => {
    const { type, payload } = action;

    console.log('sdefnksdnfkds',payload)
    switch (type) {
        case USER.REQUEST_COUPON_DOCTOR:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case USER.SUCCESS_COUPON_DOCTOR:
            return {
                ...state,
                isLoading: false,
                couponListDoctor: payload,
                isError: false,
            };
        case USER.FAILED_COUPON_DOCTOR:
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

export default couponListDoctorReducer;