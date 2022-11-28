

import { DASH } from "../Constants/Dashboardconstants";
import Dashboardservice from "../services/Dashboardservice";


export const getloggincheadminuser = (data) => async (dispatch) => {
    request();
    const res = await Dashboardservice.getlogginedcheadmin(data)
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: DASH.REQUEST_LOGINCHEUSER });
    };

    function success(res) {
        dispatch({ type: DASH.SUCCESS_LOGINCHEUSER, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: DASH.FAILED_LOGINCHEUSER,
            payload: err
        });
    };
};




export const getupcomingconsultation = (cheCenterId, cheBranchId, fromDate, toDate) => async (dispatch) => {
    request();
    const res = await Dashboardservice.getupcomingconsultations(cheCenterId, cheBranchId, fromDate, toDate)
    try {
        console.log('Appointments Data : ' + JSON.stringify(res.data));
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: DASH.REQUEST_UPCOMINGCONSULTATION });
    };

    function success(res) {
        dispatch({ type: DASH.SUCCESS_UPCOMINGCONSULTATION, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: DASH.FAILED_UPCOMINGCONSULTATION,
            payload: err
        });
    };
};




// export const getupcominglabappointments  = (cheCenterId , cheBranchId , fromDate) => async (dispatch) => {
//     request();
//     const res = await Dashboardservice.getupcominglabappointments(cheCenterId , cheBranchId , fromDate)
//     try {
//         console.log(JSON.stringify(res.data));
//         success(res);
//         return Promise.resolve(res.data);
//     } catch (err) {
//         failure(err)
//         return Promise.reject(err);
//     }

//     function request() {
//         dispatch({ type: DASH.REQUEST_UPCOMINGLABAPPOINTMENTS });
//     };

//     function success(res) {
//         dispatch({ type: DASH.SUCCESS_UPCOMINGLABAPPOINTMENTS, payload: res.data });
//     };
//     function failure(err) {
//         dispatch({
//             type: DASH.FAILED_UPCOMINGLABAPPOINTMENTS,
//             payload: err
//         });
//     };
// };

export const getupcominglabappointments = (cheCenterId, cheBranchId) => async (dispatch) => {
    request();
    const res = await Dashboardservice.getupcominglabappointments(cheCenterId, cheBranchId)
    try {
        console.log('Upcoming Lab Appointments : ' + JSON.stringify(res.data));
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: DASH.REQUEST_UPCOMINGLABAPPOINTMENTS });
    };

    function success(res) {
        dispatch({ type: DASH.SUCCESS_UPCOMINGLABAPPOINTMENTS, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: DASH.FAILED_UPCOMINGLABAPPOINTMENTS,
            payload: err
        });
    };
};
export const getupcominglabappointmentsFilter = (data) => async (dispatch) => {

    request();
    const res = await Dashboardservice.getupcominglabappointmentsFilter(data)
    console.log("loglog", data, res)
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: DASH.REQUEST_UPCOMINGLABAPPOINTMENTS });
    };

    function success(res) {
        dispatch({ type: DASH.SUCCESS_UPCOMINGLABAPPOINTMENTS, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: DASH.FAILED_UPCOMINGLABAPPOINTMENTS,
            payload: err
        });
    };
};





export const gethospitalenquirylists = (fromDate, toDate) => async (dispatch) => {
    request();
    const res = await Dashboardservice.gethospitalenquirylist(fromDate, toDate)
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: DASH.REQUEST_HOSPITALENQUIRYLIST });
    };

    function success(res) {
        dispatch({ type: DASH.SUCCESS_HOSPITALENQUIRYLIST, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: DASH.FAILED_HOSPITALENQUIRYLIST,
            payload: err
        });
    };
};



export const getHospitalEnquiry = (payload) => async (dispatch) => {
    request();
    const res = await Dashboardservice.getHospitalEnquiry(payload)
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: DASH.REQUEST_HOSPITALENQUIRYLIST });
    };

    function success(res) {
        dispatch({ type: DASH.SUCCESS_HOSPITALENQUIRYLIST, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: DASH.FAILED_HOSPITALENQUIRYLIST,
            payload: err
        });
    };
};

export const getChemedicinedelivery = (cheCenterId, cheBranchId, fromDate) => async (dispatch) => {
    request();
    const res = await Dashboardservice.getupcomingchemedicinedelivery(cheCenterId, cheBranchId, fromDate)
    try {
        console.log(JSON.stringify(res.data));
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: DASH.REQUEST_CHEMEDICINEDELIVERYLIST });
    };

    function success(res) {
        dispatch({ type: DASH.SUCCESS_CHEMEDICINEDELIVERYLIST, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: DASH.FAILED_CHEMEDICINEDELIVERYLIST,
            payload: err
        });
    };
};
export const getChemedicinedeliveryFilter = (data) => async (dispatch) => {
    request();
    const res = await Dashboardservice.getupcomingchemedicinedeliveryFilter(data)
    try {
        console.log(JSON.stringify(res.data));
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: DASH.REQUEST_CHEMEDICINEDELIVERYLIST });
    };

    function success(res) {
        dispatch({ type: DASH.SUCCESS_CHEMEDICINEDELIVERYLIST, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: DASH.FAILED_CHEMEDICINEDELIVERYLIST,
            payload: err
        });
    };
};