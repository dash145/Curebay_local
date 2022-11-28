import { AUTH } from '../Constants/AuthConstants';
import { USER } from '../Constants/userprofileConstants';
import { pat } from "../Constants/patientConstants";
import { CURRENTLOCATION } from '../Constants/locationConstants';
import AuthService from "../services/authService";
import Geocode from "react-geocode"; 
import { secureStorage } from '../Reducers/authReducer';

export const sendOtp = (data) => async (dispatch) => {
    request();
    const res = await AuthService.sendOTP(data)
    try {
        if (res.data && !res.data.details) {
            success(res);
            return Promise.resolve(res.data);

        } else {
            return Promise.reject(res.data);
        }

    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: AUTH.REQUEST_OTP });
    };

    function success(res) {
        dispatch({ type: AUTH.RESPONSE_OTP, payload: res.data, });
    };
    function failure(err) {
        dispatch({
            type: AUTH.FAILED_OTP,
            payload: err
        });
    };
};

export const verifyLogOtp = (data) => async (dispatch) => {
    request();

    const res = await AuthService.verifyLogOtp(data);
    try {

        if (res.data && !res.data.details) {
            if (!data.typePassword) {
                success(res);
            }
            return Promise.resolve(res.data);

        } else {
            return Promise.reject(res.data);
        }
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: AUTH.REQUEST_PATIENT });
    };

    function success(res) {

        dispatch({ type: AUTH.RESPONSE_PATIENT, payload: res.data, });
    };
    function failure(err) {
        dispatch({
            type: AUTH.FAILURE_PATIENT,
            payload: err
        });
    };
};

export const verifyRegOtp = (data) => async (dispatch) => {
    request();

    const res = await AuthService.verifyRegOtp(data);
    try {
        if (res.data && !res.data.details) {
            success(res);
            return Promise.resolve(res.data);

        } else {
            return Promise.reject(res.data);
        }
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: AUTH.REQUEST_OTP });
    };

    function success(res) {
        dispatch({ type: AUTH.RESPONSE_OTP, payload: res.data, });
    };
    function failure(err) {
        dispatch({
            type: AUTH.FAILED_OTP,
            payload: err
        });
    };
};

export const mobileExist = (data) => async (dispatch) => {
    request();
    const res = await AuthService.checkMobile(data);
    console.log("res", res)
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: AUTH.REQUEST_OTP });
    };

    function success(res) {
        dispatch({ type: AUTH.RESPONSE_OTP, payload: res.data, });
    };
    function failure(err) {
        dispatch({
            type: AUTH.FAILED_OTP,
            payload: err
        });
    };
};


export const loginWithPassword = (data) => async (dispatch) => {
    request();

    const res = await AuthService.loginWithPassword(data);
    try {

        if (res.data && !res.data.details) {
            success(res);
            return Promise.resolve(res.data);

        } else {
            return Promise.reject(res.data);
        }
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: AUTH.REQUEST_PATIENT });
    };

    function success(res) {

        dispatch({ type: AUTH.RESPONSE_PATIENT, payload: res.data, });
    };
    function failure(err) {
        dispatch({
            type: AUTH.FAILURE_PATIENT,
            payload: err
        });
    };
};

export const forgotPassword = (data) => async (dispatch) => {
    request();
    const res = await AuthService.forgotPassword(data)
    try {
        if (res.data && !res.data.details) {
            success(res);
            return Promise.resolve(res.data);

        } else {
            failure(res.data?.details[0])
            return Promise.reject(res.data);
        }
    } catch (err) {
        console.log("err",err)
        failure(err)
        
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: USER.REQUEST_CHANGEPASSWORD });
    };

    function success(res) {
        dispatch({ type: USER.SUCCESS_CHANGEPASSWORD, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: USER.FAILED_CHANGEPASSWORD,
            payload: err
        });
    };
};

export const getCurrentlocation = () => async (dispatch) => {
    dispatch({
        type: CURRENTLOCATION.REQUEST_CURRENTLOCATION
    });
    try {
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log(position);
            // const lat = position.coords.latitude;
            // const long = position.coords.longitude;
            Geocode.setApiKey("AIzaSyAWa7-RTKOR7BulmJ1PWmDaJ9r2ZB8UqAs");
            Geocode.setLanguage("en");
            Geocode.setRegion("es");
            Geocode.enableDebug();
            Geocode.fromLatLng("19.1974199", "72.9946847").then(
                (response) => {
                    console.log(response)
                    const address = response.results[9].formatted_address;
                    console.log(address);
                    dispatch({ type: CURRENTLOCATION.SUCCESS_CURRENTLOCATION, payload: address })
                },
                (error) => {
                    console.error(error);
                }
            );
        });
    }
    catch (error) {
        dispatch({ type: CURRENTLOCATION.FAILED_CURRENTLOCATION, payload: error });
    }
};

export const setLoginModal = (data) => async (dispatch) => {
    dispatch({ type: AUTH.SETMODAL, payload: data });
};

export const getUserType = () => async (dispatch) => {
    request();
    const res = await AuthService.getuserType();
    try {
        console.log("resolve", res.data)
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: AUTH.REQUEST_USERTYPE });
    };

    function success(res) {
        dispatch({ type: AUTH.RESPOSNE_USERTYPE, payload: res.data, });
    };
    function failure(err) {
        dispatch({
            type: AUTH.FAILURE_USERTYPE,
            payload: err
        });
    };
};

export const Logout = (data) => async (dispatch) => {
    dispatch({ type: AUTH.LOGOUT });
    await AuthService.logout(data); 
};


export const LoginWithPassword = (data) => async (dispatch) => {
    request();

    const res = await AuthService.LoginWithPassword(data);
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: AUTH.REQUEST_PATIENT });
    };

    function success(res) {

        dispatch({ type: AUTH.RESPONSE_PATIENT, payload: res.data, });
    };
    function failure(err) {
        dispatch({
            type: AUTH.FAILURE_PATIENT,
            payload: err
        });
    };
};


export const getToken = (data) => async (dispatch) => {
    request();

    const res = await AuthService.callToken();
    try {
        success(res);

        console.log('isssssss',JSON.stringify(res))
        secureStorage.setItem('token', res.data?.access_token)
        secureStorage.setItem('refreshToken', res.data?.refresh_token)
        return Promise.resolve(res.data);
    } catch (err) {
        console.log('issssssseeee',JSON.stringify(err))
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: AUTH.REQUEST_PATIENT });
    };

    function success(res) {
        dispatch({ type: AUTH.SETOKEN, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: AUTH.FAILURE_PATIENT,
            payload: err
        });
    };
};

export const checkIsLoggedIn = () => {
    const userCode = secureStorage.getItem('patientData') ? secureStorage.getItem('patientData').code : null
    return userCode;
}




export const checkOpen = (data) => async (dispatch) => {
    dispatch({ type: AUTH.CHECKOPEN, payload: data });
};

export const setPatientCode = (data) => async (dispatch) => {
    dispatch({ type: AUTH.CODE, payload: data });
};

export const setDropDownPatientCode = (data) => async (dispatch) => {
    console.log(data , "vsdvshdovhsd")
    dispatch({ type: pat.CODE, payload: data });
};



export const setLatLong = (data) => async (dispatch) => {
    dispatch({ type: AUTH.LATLON, payload: data });
};

export const actioncustomPinCode = (data) => async (dispatch) => {
    dispatch({ type: AUTH.PINCODE, payload: data });
};

export const setAddressString = (data) => async (dispatch) => {
    dispatch({ type: AUTH.ADDRESS, payload: data });
};

export const setSearchString = (data) => async (dispatch) => {
    dispatch({ type: AUTH.SEARCH_STRING, payload: data });
};


