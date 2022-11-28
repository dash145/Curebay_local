import { CHE } from "../Constants/Cheprofileconstants";
import Cheprofileservice from "../services/Cheprofileservice";

export const cheadminfeedbacks = (data) => async (dispatch) => {
    request();
    const res = await Cheprofileservice.cheadminFeedback(data)
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: CHE.REQUEST_CHEFEEDBACK });
    };

    function success(res) {
        dispatch({ type: CHE.SUCCESS_CHEFEEDBACK, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: CHE.FAILED_CHEFEEDBACK,
            payload: err
        });
    };
};



export const getcheadmindetails = (data) => async (dispatch) => {
    request();
    const res = await Cheprofileservice.cheadmindetails(data)
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: CHE.REQUEST_CHEADMINDETAILS });
    };

    function success(res) {
        dispatch({ type: CHE.SUCCESS_CHEADMINDETAILS, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: CHE.FAILED_CHEADMINDETAILS,
            payload: err
        });
    };
};





export const getcheadminnotifications = (data) => async (dispatch) => {
    request();
    const res = await Cheprofileservice.cheadminnotifications(data)
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: CHE.REQUEST_CHEADMINNOTIFICATIONS });
    };

    function success(res) {
        dispatch({ type: CHE.SUCCESS_CHEADMINNOTIFICATIONS, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: CHE.FAILED_CHEADMINNOTIFICATIONS,
            payload: err
        });
    };
};




export const getcheadminallcheorders = (cheid, chelocationid) => async (dispatch) => {
    request();
    const res = await Cheprofileservice.cheadminallcheorders(cheid, chelocationid)
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: CHE.REQUEST_CHEADMINALLCHEORDERS });
    };

    function success(res) {
        dispatch({ type: CHE.SUCCESS_CHEADMINALLCHEORDERS, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: CHE.FAILED_CHEADMINALLCHEORDERS,
            payload: err
        });
    };
};




export const cheadminchangepassword = (data) => async (dispatch) => {
    request();
    const res = await Cheprofileservice.chechangePassword(data)
    try {
        if (res.data && !res.data.details) {
            success(res);
            return Promise.resolve(res.data);

        } else {
            failure(res.data?.details[0])
            return Promise.reject(res.data);
        }
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: CHE.REQUEST_CHECHANGEPASSWORD });
    };

    function success(res) {
        dispatch({ type: CHE.SUCCESS_CHECHANGEPASSWORD, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: CHE.FAILED_CHECHANGEPASSWORD,
            payload: err
        });
    };
};

export const editCheAdminDetails = (data) => async (dispatch) => {
    console.log("editCheAdminDetails", data)
    request();
    const res = await Cheprofileservice.savecheadmindetails(data)
    console.log("editCheAdminDetails", res)
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: CHE.REQUEST_SAVECHEADMINDETAILS });
    };

    function success(res) {
        dispatch({ type: CHE.SUCCESS_SAVECHEADMINDETAILS, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: CHE.FAILED_SAVECHEADMINDETAILS,
            payload: err
        });
    };
};






