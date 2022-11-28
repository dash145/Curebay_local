import { DIAG } from "../Constants/DiagnosticsConstants";
import Diagnosticsservice from "../services/Diagnosticsservice";

export const getlabPartnerslist = (data) => async (dispatch) => {
    request();
    const res = await Diagnosticsservice.getlabpartnerslist(data)
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: DIAG.REQUEST_LABLIST });
    };

    function success(res) {
        dispatch({ type: DIAG.SUCCESS_LABLIST, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: DIAG.FAILED_LABLIST,
            payload: err
        });
    };
};

export const getElasticPartnerslist = (coords, freeTextSearch) => async (dispatch) => {
    request();
    const res = await Diagnosticsservice.getElasticLabsPartners(coords, freeTextSearch)
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: DIAG.REQUEST_LABLIST });
    };

    function success(res) {
        dispatch({ type: DIAG.SUCCESS_LABLIST, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: DIAG.FAILED_LABLIST,
            payload: err
        });
    };
};


export const getCommonLabTest = () => async (dispatch) => {
    request();
    const res = await Diagnosticsservice.getCommonLabTest()
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: DIAG.REQUEST_LABLIST_MOSTCOMMON });
    };

    function success(res) {
        dispatch({ type: DIAG.SUCCESS_LABLIST_MOSTCOMMON, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: DIAG.FAILED_LABLIST_MOSTCOMMON,
            payload: err
        });
    };
};


export const getlabappointmentlist = (data) => async (dispatch) => {
    request();
    const res = await Diagnosticsservice.recentlabtestappointments(data)
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: DIAG.REQUEST_LABAPPOINTMENTLIST });
    };

    function success(res) {
        dispatch({ type: DIAG.SUCCESS_LABAPPOINTMENTLIST, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: DIAG.FAILED_LABAPPOINTMENTLIST,
            payload: err
        });
    };
};

export const getPathologyTestlist = () => async (dispatch) => {
    request();
    const res = await Diagnosticsservice.getPathologyTestList()
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: DIAG.REQUEST_PATHOLOGYTEST });
    };

    function success(res) {
        dispatch({ type: DIAG.SUCCESS_PATHOLOGYTESTLIST, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: DIAG.FAILED_PATHOLOGYTESTLIST,
            payload: err
        });
    };
};

export const getLabTestList = (data,pageNo) => async (dispatch) => {
    request();
    const res = await Diagnosticsservice.getLabTestList(data,pageNo)
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: DIAG.REQUEST_GETLABTESTLIST });
    };

    function success(res) {
        dispatch({ type: DIAG.SUCCESS_GETLABTESTLIST, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: DIAG.FAILED_GETLABTESTLIST,
            payload: err
        });
    };
};

export const clearLabTestData = () => async(dispatch) => {
    request();
    function request() {
        dispatch({ type: DIAG.REMOVE_LAB_LIST });
    };
  }



