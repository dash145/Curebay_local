
import { hos } from "../Constants/Hospitalpageconstants";

import hospitalservice from "../services/hospitalservice";



export const gethospitallist = (coords, freeTextSearch, pageNo, pageSize) => async (dispatch) => {
    request();
    const res = await hospitalservice.esgetHopitalslist(coords, freeTextSearch, pageNo, pageSize)
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: hos.REQUEST_HOSLIST });
    };

    function success(res) {
        dispatch({ type: hos.SUCCESS_HOSLIST, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: hos.FAILED_HOSLIST,
            payload: err
        });
    };
};

export const getAllStates = () => async (dispatch) => {
    request();
    const res = await hospitalservice.getAllStates()
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: hos.REQUEST_HOSLIST });
    };

    function success(res) {
        dispatch({ type: hos.SUCCESS_HOSLIST , payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: hos.FAILED_HOSLIST,
            payload: err
        });
    };
};

export const getElastichospitallist = (data) => async (dispatch) => {
    request();
   // const res = await hospitalservice.getElastichospitallist(data)
   const res = await hospitalservice.getDoctorslist("URBANECLINIC","PROV")
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }
    function request() {
        dispatch({ type: hos.REQUEST_HOSLIST });
    };

    function success(res) {
        dispatch({ type: hos.SUCCESS_HOSLIST, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: hos.FAILED_HOSLIST,
            payload: err
        });
    };
};


export const getparticularhospital = (code) => async (dispatch) => {
    request();
    const res = await hospitalservice.getparticularhospital(code)
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: hos.REQUEST_SPECIFICHOSLIST });
    };

    function success(res) {
        dispatch({ type: hos.SUCCESS_SPECIFICHOSLIST, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: hos.FAILED_SPECIFICHOSLIST,
            payload: err
        });
    };
};


export const saveEnquiry = (data) => async (dispatch) => {
    const res = await hospitalservice.submitEnquiry(data)
    try {
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const clearHospitalData=()=>async(dispatch)=>{
    request();
    function request() {
        dispatch({ type: hos.REMOVE_HOSLIST });
    };
}

export const getprocedurelist = () => async (dispatch) => {
    request();
    const res = await hospitalservice.procedurelist()
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: hos.REQUEST_PROCEDURELIST });
    };

    function success(res) {
        dispatch({ type: hos.SUCCESS_PROCEDURELIST , payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: hos.FAILED_PROCEDURELIST,
            payload: err
        });
    };
};


export const postenquiryhospital = (data) => async (dispatch) => {
    request();
    const res = await hospitalservice.postpatientenquiryhospitalform(data)
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: hos.REQUEST_HOSPENQUIRYFORM });
    };

    function success(res) {
        dispatch({ type: hos.SUCCESS_HOSPENQUIRYFORM , payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: hos.FAILED_HOSPENQUIRYFORM,
            payload: err
        });
    };
};