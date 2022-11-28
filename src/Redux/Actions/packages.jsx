import { PKGCONSTANT } from "../Constants/packageConstant";
import PackageService from "../services/packagesService";


export const getMembershipList = () => async (dispatch) => {
    request();
    const res = await PackageService.getMembershiplist()
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: PKGCONSTANT.REQUEST_MEMBERSHIP });
    };

    function success(res) {
        dispatch({ type: PKGCONSTANT.RESPONSE_MEMBERSHIP, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: PKGCONSTANT.FAILURE_MEMBERSHOP,
            payload: err
        });
    };
};


export const getMyPackagesList = (patientCode) => async (dispatch) => {
    request();
    const res = await PackageService.getMyPackagesList(patientCode)
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: PKGCONSTANT.REQUEST_PACKAGE });
    };

    function success(res) {
        dispatch({ type: PKGCONSTANT.RESPONSE_PACKAGE, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: PKGCONSTANT.FAILURE_PACKAGE,
            payload: err
        });
    };
};



export const onMemberSubs = (data) => async (dispatch) => {
    request();
    const res = await PackageService.onMemberSubs(data)
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: PKGCONSTANT.REQUEST_MEMBERSHIP_SUBS });
    };

    function success(res) {
        dispatch({ type: PKGCONSTANT.RESPONSE_MEMBERSHIP_SUBS, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: PKGCONSTANT.FAILURE_MEMBERSHOP,
            payload: err
        });
    };
};



export const onMemberCheck = (patientCode,packageCode) => async (dispatch) => {
    request();
    const res = await PackageService.onMemberCheck(patientCode,packageCode)
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: PKGCONSTANT.REQUEST_MEMBERSHIP_SUBS });
    };

    function success(res) {
        dispatch({ type: PKGCONSTANT.RESPONSE_MEMBERSHIP_SUBS, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: PKGCONSTANT.FAILURE_MEMBERSHOP,
            payload: err
        });
    };
};




export const getPromotionList = () => async (dispatch) => {
    request();
    const res = await PackageService.getPromotionlist()
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: PKGCONSTANT.REQUEST_PROMOTION });
    };

    function success(res) {
        dispatch({ type: PKGCONSTANT.RESPONSE_PROMOTION, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: PKGCONSTANT.FAILURE_PROMOTION,
            payload: err
        });
    };
};

export const getHealthcarepackagesList = () => async (dispatch) => {
    request();
    const res = await PackageService.getHealthcarepackageslist()
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: PKGCONSTANT.REQUEST_HEALTHCAREPACKAGE });
    };

    function success(res) {
        dispatch({ type: PKGCONSTANT.RESPONSE_HEALTHCAREPACKAGE, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: PKGCONSTANT.FAILURE_HEALTHCAREPACKAGE,
            payload: err
        });
    };
};


export const getAllSearch = (data) => async (dispatch) => {
    request();
    const res = await PackageService.getAllSearch(data)
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: PKGCONSTANT.REQUEST_ALLSEARCH });
    };

    function success(res) {
        dispatch({ type: PKGCONSTANT.RESPONSE_ALLSEARCH, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: PKGCONSTANT.FAILURE_ALLSEARCH,
            payload: err
        });
    };
};








