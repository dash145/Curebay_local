import {REPORT} from '../Constants/ReportConstant'
import ReportServices from '../services/reportServices'
export const getReport = (payload) => async (dispatch) => {
    request();
    const res = await ReportServices.getReportList(payload);
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err);
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: REPORT.REQUEST_REPORTLIST });
    }

    function success(res) {
        dispatch({ type: REPORT.SUCCESS_REPORTLIST, payload: res.data });
    }
    function failure(err) {
        dispatch({
            type: REPORT.FAILED_REPORTLIST,
            payload: err,
        });
    }
};

export const uploadReport = (payload) => async (dispatch) => {
    request();
    const res = await ReportServices.uploadReport(payload);
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err);
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: REPORT.REQUEST_UPLOADREPORT });
    }

    function success(res) {
        dispatch({ type: REPORT.REQUEST_UPLOADREPORT, payload: res.data });
    }
    function failure(err) {
        dispatch({
            type: REPORT.REQUEST_UPLOADREPORT,
            payload: err,
        });
    }
};

export const updateReport = (payload, id) => async (dispatch) => {
    request();
    const res = await ReportServices.updateReport(payload, id);
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err);
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: REPORT.REQUEST_UPDATEREPORT });
    }

    function success(res) {
        dispatch({ type: REPORT.REQUEST_UPDATEREPORT, payload: res.data });
    }
    function failure(err) {
        dispatch({
            type: REPORT.REQUEST_UPDATEREPORT,
            payload: err,
        });
    }
};