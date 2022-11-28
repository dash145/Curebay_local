// import { doc } from "../Constants/DoctorConstants";
import { pat } from "../Constants/patientConstants";
// import doctorService from "../services/doctorService";
import PatientService from "../services/patientService";


export const savepatientappointment = (data ) => async (dispatch) => {
    request();
    const res = await PatientService.savePatientAppointment(data)
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: pat.REQUEST_PATIENTAPPOINTMENT });
    };

    function success(res) {
        dispatch({ type: pat.SUCCESS_PATIENTAPPOINTMENT , payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: pat.FAILED_PATIENTAPPOINTMENT,
            payload: err
        });
    };
};

export const generateMaggiePlus = (data ) => async (dispatch) => {
    request();
    const res = await PatientService.generateMaggiePlus(data)
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: pat.REQUEST_PATIENTAPPOINTMENT });
    };

    function success(res) {
        dispatch({ type: pat.SUCCESS_PATIENTAPPOINTMENT , payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: pat.FAILED_PATIENTAPPOINTMENT,
            payload: err
        });
    };
};

export const getparticularPatientdetailsbynumber = (data) => async (dispatch) => {
    request();
    const res = await PatientService.getpatientdetailsbynumber(data)
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: pat.REQUEST_PARTICULARPATIENTDETAILSBYNUMBER });
    };

    function success(res) {
        dispatch({ type: pat.SUCCESS_PARTICULARPATIENTDETAILSBYNUMBER, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: pat.FAILED_PARTICULARPATIENTDETAILSBYNUMBER,
            payload: err
        });
    };
};

export const getLoginchepatientdetails = (data) => async (dispatch) => {
    request();
    const res = await PatientService.getlogginedchepatientdetails(data)
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: pat.REQUEST_LOGGINCHEPATIENTDETAILS });
    };

    function success(res) {
        dispatch({ type: pat.SUCCESS_LOGGINCHEPATIENTDETAILS, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: pat.FAILED_LOGGINCHEPATIENTDETAILS,
            payload: err
        });
    };
};

export const getpatientvitaldetails = (data) => async (dispatch) => {
    request();
    const res = await PatientService.getpatientvitalsdetails(data)
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: pat.REQUEST_PATIENTVITALSDETAILS });
    };

    function success(res) {
        dispatch({ type: pat.SUCCESS_PATIENTVITALSDETAILS, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: pat.FAILED_PATIENTVITALSDETAILS,
            payload: err
        });
    };
};

export const getparticularPatientdetails = (data) => async (dispatch) => {
    request();
    const res = await PatientService.getparticularpatientdetails(data)
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: pat.REQUEST_PARTICULARPATIENTDETAILS });
    };

    function success(res) {
        dispatch({ type: pat.SUCCESS_PARTICULARPATIENTDETAILS, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: pat.FAILED_PARTICULARPATIENTDETAILS,
            payload: err
        });
    };
};

export const getPatientmedicinedeliveryListFilter = (data) => async (dispatch) => {
    request();
    const res = await PatientService.getpatientmedicinedeliverydetailsFilter(data)
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: pat.REQUEST_PATIENTMEDICINEDELIVERYLIST });
    };

    function success(res) {
        dispatch({ type: pat.SUCCESS_PATIENTMEDICINEDELIVERYLIST, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: pat.FAILED_PATIENTMEDICINEDELIVERYLIST,
            payload: err
        });
    };
};


export const getPatientmedicinedeliveryList = (data,pageNo) => async (dispatch) => {
    request();
    const res = await PatientService.getpatientmedicinedeliverydetails(data,pageNo)
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: pat.REQUEST_PATIENTMEDICINEDELIVERYLIST });
    };

    function success(res) {
        dispatch({ type: pat.SUCCESS_PATIENTMEDICINEDELIVERYLIST, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: pat.FAILED_PATIENTMEDICINEDELIVERYLIST,
            payload: err
        });
    };
};


export const getPatientmedicinedeliveryListOnFilter = (data) => async (dispatch) => {
    request();
    const res = await PatientService.getpatientmedicinedeliverydetailsOnFilter(data)
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: pat.REQUEST_PATIENTMEDICINEDELIVERYLIST });
    };

    function success(res) {
        dispatch({ type: pat.SUCCESS_PATIENTMEDICINEDELIVERYLIST, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: pat.FAILED_PATIENTMEDICINEDELIVERYLIST,
            payload: err
        });
    };
};

export const getPatientAppointmentList = (payload) => async (dispatch) => {
    request();
    const res = await PatientService.getpatientappointmentlist(payload)
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: pat.REQUEST_PATIENTAPPOINTMENTLIST });
    };

    function success(res) {
        dispatch({ type: pat.SUCCESS_PATIENTAPPOINTMENTLIST, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: pat.FAILED_PATIENTAPPOINTMENTLIST,
            payload: err
        });
    };
};

export const getallactivePatientdetails = (data) => async (dispatch) => {
    request();
    const res = await PatientService.getallactivePatientdetails(data);
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) { 
        failure(err)
        return Promise.reject(err);
    } 

    function request() {
        dispatch({ type: pat.REQUEST_ALLREGISTEREDPATIENTLIST });
    };

    function success(res) {
        dispatch({ type: pat.SUCCESS_ALLREGISTEREDPATIENTLIST, payload: res.data });
    };
    
    function failure(err) {
        dispatch({
            type: pat.FAILED_ALLREGISTEREDPATIENTLIST,
            payload: err
        });
    };
    
  };

export const getEnquirePatientDetails = (patientId) => async (dispatch) => {
    request();
    const res = await PatientService.getPatientEnquireList(patientId);
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) { 
        failure(err)
        return Promise.reject(err);
    } 

    function request() {
        dispatch({ type: pat.REQUEST_PATIENTENQUIREDETAILS });
    };

    function success(res) {
        dispatch({ type: pat.SUCCESS_PATIENTENQUIREDETAILS, payload: res.data });
    };
    
    function failure(err) {
        dispatch({
            type: pat.FAILED_PATIENTENQUIREDETAILS,
            payload: err
        });
    };
}