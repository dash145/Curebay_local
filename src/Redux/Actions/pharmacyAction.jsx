import { PHARMACY } from "../Constants/PharmacyConstant";
import pharmacyService from "../services/pharmacyService";

export const getPharmacyList = (filters) => async (dispatch) => {
    request();
    const res = await pharmacyService.getParmacyNearMe(filters);
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err);
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: PHARMACY.REQUEST_PHARMALIST });
    }

    function success(res) {
        dispatch({ type: PHARMACY.SUCCESS_PHARMALIST, payload: res.data });
    }
    function failure(err) {
        dispatch({
            type: PHARMACY.FAILED_PHARMALIST,
            payload: err,
        });
    }
};

export const getParticularPharmacy = (data) => async (dispatch) => {
    request();
    const res = await pharmacyService.getParticularPharma(data);
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err);
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: PHARMACY.REQUEST_PARTICULARPHARMA });
    }

    function success(res) {
        dispatch({ type: PHARMACY.SUCCESS_PARTICULARPHARMA, payload: res.data });
    }
    function failure(err) {
        dispatch({
            type: PHARMACY.FAILED_PARTICULARPHARMA,
            payload: err,
        });
    }
};

export const getAllProduct = () => async (dispatch) =>{
    request();
    const res = await pharmacyService.getAllProduct();
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err);
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: PHARMACY.REQUEST_PARTICULARPHARMA });
    }

    function success(res) {
        dispatch({ type: PHARMACY.SUCCESS_PARTICULARPHARMA, payload: res.data });
    }
    function failure(err) {
        dispatch({
            type: PHARMACY.FAILED_PARTICULARPHARMA,
            payload: err,
        });
    }
}

export const getMedicineByKeyword = (keyword) => async (dispatch) => {
    request();

    const res = await pharmacyService.getMedicineBy(keyword);

    try {
        success(res);
        return Promise.resolve(res);
    } catch (err) {
        failure(err);
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: PHARMACY.REQUEST_SEARCH });
    }

    function success(res) {
        dispatch({ type: PHARMACY.SUCCESS_SEARCH, payload: res.data });
    }
    function failure(err) {
        dispatch({
            type: PHARMACY.FAILED_SEARCH,
            payload: err,
        });
    }
}


export const getAllProductByIds = (data) => async (dispatch) =>{
    request();
    const res = await pharmacyService.getAllProductByIds(data);
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err);
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: PHARMACY.REQUEST_PARTICULARPHARMA });
    }

    function success(res) {
        dispatch({ type: PHARMACY.SUCCESS_PARTICULARPHARMA, payload: res.data });
    }
    function failure(err) {
        dispatch({
            type: PHARMACY.FAILED_PARTICULARPHARMA,
            payload: err,
        });
    }
}

export const getBrandFilter = () => async (dispatch) =>{
    request();
    const res = await pharmacyService.getBrandFilter();
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err);
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: PHARMACY.REQUEST_BRANDFILTER });
    }

    function success(res) {
        dispatch({ type: PHARMACY.SUCCESS_BRANDFILTER, payload: res.data });
    }
    function failure(err) {
        dispatch({
            type: PHARMACY.FAILED_BRANDFILTER,
            payload: err,
        });
    }
}
