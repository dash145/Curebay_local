import { CART } from "../Constants/CartConstant";

const initialState = {
    cartList: [],
    isError: false,
    isLoading: false,
    msg: '',
    errMsg: '',
    previousOrders: [],
};


const CartReducer = (state = initialState, action) => {
    const { type, payload } = action;
    console.log("payload", payload)
    switch (type) {
        case CART.REQUEST_ADDCART:
            return {
                ...state,
                isLoading: true,
                isError: false,
                errMsg: payload
            };
        case CART.SUCCESS_FETCHCART:
            return {
                ...state,
                isLoading: false,
                cartList: payload[0],
                isError: false,
            };
        case CART.SUCCESS_ADDCART:
            return {
                ...state,
                isLoading: false,
                msg: 'added',
                isError: false,
                cartList: payload
            };
        case CART.FAILED_ADDCART:
        case CART.FAILED_RECENTCART:
            return {
                ...state,
                isLoading: false,
                errMsg: payload,
                isError: true,
            };
        case CART.SUCCESS_RECENTCART:
            return {
                ...state,
                isLoading: false,
                isError: false,
                msg: 'recent',
                previousOrders: payload,
            }
        default:
            return state;
    }
};

export default CartReducer;