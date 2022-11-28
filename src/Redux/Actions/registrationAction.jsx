import { REGISTER } from '../Constants/RegistrationConstants';
import registrationService from "../services/registrationService";


export const addRegistration = (data) => async (dispatch) => {
    request();
    const res = await registrationService.Registration(data);

    console.log("response", res);
    
    try {
        success(res);
        return Promise.resolve(res.data);
        
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: REGISTER.REQUEST_REGISTRATION });
    };

    function success(res) {
        dispatch({ type: REGISTER.SUCCESS_REGISTRATION, payload: res.data, });
    };
    
    function failure(err) {
        dispatch({
            type: REGISTER.FAILED_REGISTRATION,
            payload: err
        });
    };
};





