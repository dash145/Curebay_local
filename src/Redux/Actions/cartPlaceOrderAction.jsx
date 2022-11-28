
import CartPlaceService from "../services/CartPlaceService";
import { CART } from '../Constants/CartConstant';

export const AddtoCart = (data) => async (dispatch) => {
    request();
    const res = await CartPlaceService.AddtoCart(data)
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: CART.REQUEST_ADDCART });
    };

    function success(res) {
        dispatch({ type: CART.SUCCESS_ADDCART, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: CART.FAILED_ADDCART,
            payload: err
        });
    };
};





export const getCartDetails = (data) => async (dispatch) => {
    request();
    const res = await CartPlaceService.getCartList(data)
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: CART.REQUEST_ADDCART });
    };

    function success(res) {
        console.log("res", res)
        dispatch({ type: CART.SUCCESS_FETCHCART, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: CART.FAILED_ADDCART,
            payload: err
        });
    };
};

export const getRecentOrders = (data) => async (dispatch) => {
    request();
    const res = await CartPlaceService.getRecentOrder(data);
    try {
        success(res);
        return Promise.resolve(res);
    } catch (err) {
        console.log(err);
        failure(err);
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: CART.REQUEST_ADDCART });
    };
    function success(res) {
        console.log("res", res)
        dispatch({ type: CART.SUCCESS_RECENTCART, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: CART.FAILED_RECENTCART,
            payload: err
        });
    };
}
