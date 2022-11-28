
import { HEALTHRECORD } from "../Constants/Helthrecordconstants";
import HealthRecordService from "../services/HealthRecordService";

export const getPatientallergylist = (data) => async (dispatch) => {
    request();
    const res = await HealthRecordService.getallergieslist(data)
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: HEALTHRECORD.REQUEST_ALLERGYLIST });
    };

    function success(res) {
        dispatch({ type: HEALTHRECORD.SUCCESS_ALLERGYLIST, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: HEALTHRECORD.FAILED_ALLERGYLIST,
            payload: err
        });
    };
};

export const getmedicalhistory = (data) => async (dispatch) => {
    request();
    const res = await HealthRecordService.getmedicalhistorylist(data)
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: HEALTHRECORD.REQUEST_MEDICALHISTORYLIST });
    };

    function success(res) {
        dispatch({ type: HEALTHRECORD.SUCCESS_MEDICALHISTORYLIST, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: HEALTHRECORD.FAILED_MEDICALHISTORYLIST,
            payload: err
        });
    };
};

export const getfilteredmedicalhistory = (data, fromDate, toDate) => async (dispatch) => {
    request();
    const res = await HealthRecordService.getfilteredmedicalhistorylist(data, fromDate, toDate)
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: HEALTHRECORD.REQUEST_MEDICALHISTORYLIST });
    };

    function success(res) {
        dispatch({ type: HEALTHRECORD.SUCCESS_MEDICALHISTORYLIST, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: HEALTHRECORD.FAILED_MEDICALHISTORYLIST,
            payload: err
        });
    };
};



export const getPatientmedicationlist = (data) => async (dispatch) => {
    request();
    const res = await HealthRecordService.getmedicationlist(data)
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: HEALTHRECORD.REQUEST_MEDICATIONLIST });
    };

    function success(res) {
        dispatch({ type: HEALTHRECORD.SUCCESS_MEDICATIONLIST, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: HEALTHRECORD.FAILED_MEDICATIONLIST,
            payload: err
        });
    };
};


