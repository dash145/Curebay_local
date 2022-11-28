import { VITALS } from "../Constants/VitalConstants";
import vitalservice from "../services/vitalservice";

export const getPatientallergylist = (data) => async (dispatch) => {
    request();
    const res = await vitalservice.getallergieslist(data)
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: VITALS.REQUEST_ALLERGYLIST });
    };

    function success(res) {
        dispatch({ type: VITALS.SUCCESS_ALLERGYLIST, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: VITALS.FAILED_ALLERGYLIST,
            payload: err
        });
    };
};




export const getPatientmedicationhistorylist = (data) => async (dispatch) => {
    request();
    const res = await vitalservice.getmedicationhistorylist(data)
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: VITALS.REQUEST_MEDICATIONHISTORYLIST });
    };

    function success(res) {
        dispatch({ type: VITALS.SUCCESS_MEDICATIONHISTORYLIST, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: VITALS.FAILED_MEDICATIONHISTORYLIST,
            payload: err
        });
    };
};







export const getPatientvitallist = (data) => async (dispatch) => {
    request();
    const res = await vitalservice.getpatientvitallist(data)
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: VITALS.REQUEST_VITALSLIST });
    };

    function success(res) {
        dispatch({ type: VITALS.SUCCESS_VITALSLIST, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: VITALS.FAILED_VITALSLIST,
            payload: err
        });
    };
};

export const addPatientvitals = (data) => async (dispatch) => {
    request();
    const res = await vitalservice.addpatientvitaldetails(data)
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: VITALS.REQUEST_ADDVITALS });
    };

    function success(res) {
        dispatch({ type: VITALS.SUCCESS_ADDVITALS, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: VITALS.FAILED_ADDVITALS,
            payload: err
        });
    };
};




export const getmedicalhistory = (data) => async (dispatch) => {
    request();
    const res = await vitalservice.getmedicalhistorylist(data)
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: VITALS.REQUEST_MEDICALHISTORYLIST });
    };

    function success(res) {
        dispatch({ type: VITALS.SUCCESS_MEDICALHISTORYLIST, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: VITALS.FAILED_MEDICALHISTORYLIST,
            payload: err
        });
    };
};