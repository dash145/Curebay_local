import { PAY } from "../Constants/paymentConstants";
import paymentService from "../services/paymentService";


export const getPaymentListDetails = (params) => async (dispatch) => {
    request();
    const res = await paymentService.gettotalPaymentList(params);
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) { 
        failure(err)
        return Promise.reject(err);
    } 

    function request() {
        dispatch({ type: PAY.REQUEST_PAYMENTLIST });
    };

    function success(res) {
        dispatch({ type: PAY.SUCCESS_SUCCESSFULLLIST, payload: res.data });
    };
    
    function failure(err) {
        dispatch({
            type: PAY.FAILED_PAYMENTLIST,
            payload: err
        });
    };
    
  };

  export const getBillingDetails = (params) => async (dispatch) => {   
    request();
    const res = await paymentService.getBillingDetails(params);
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) { 
        failure(err)
        return Promise.reject(err);
    } 

    function request() {
        dispatch({ type: PAY.REQUEST_BILLING });
    };

    function success(res) {
        dispatch({ type: PAY.SUCCESS_REQUEST_BILLING, payload: res.data });
    };
    
    function failure(err) {
        dispatch({
            type: PAY.FAILED_BILLING,
            payload: err
        });
    };
    
  }
