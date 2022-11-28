
import { PAT } from "../Constants/patientConstants";
import { USER } from "../Constants/userprofileConstants";
import { VITALS } from "../Constants/vitalConstants";
import patientService from "../services/patientService";
import userprofileservice from "../services/userprofileservice";
import vitalService from "../services/vitalService";


export const getallregisterPatientdetails = (hospitalid, locationid) => async (dispatch) => {
    request();
    const res = await patientService.getallregisteredpatientdetails(hospitalid, locationid)
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: PAT.REQUEST_ALLREGISTEREDPATIENTLIST });
    };

    function success(res) {
        dispatch({ type: PAT.SUCCESS_ALLREGISTEREDPATIENTLIST, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: PAT.FAILED_ALLREGISTEREDPATIENTLIST,
            payload: err
        });
    };
};




export const getpatientfamilymemberslist = (data) => async (dispatch) => {
    request();
    const res = await patientService.getPatientfamilymember(data)
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: PAT.REQUEST_PATIENTFAMILYMEMBERLIST });
    };

    function success(res) {
        dispatch({ type: PAT.SUCCESS_PATIENTFAMILYMEMBERLIST, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: PAT.FAILED_PATIENTFAMILYMEMBERLIST,
            payload: err
        });
    };
};


export const getSelectedPatient = (data) => async (dispatch) => {
    request();
    const res = await patientService.getPatientDetails(data)
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: PAT.REQUEST_PARTICULARPATIENTDETAILS });
    };

    function success(res) {
        dispatch({ type: PAT.SUCCESS_PARTICULARPATIENTDETAILS, payload: res.data[0] });
    };
    function failure(err) {
        dispatch({
            type: PAT.FAILED_PARTICULARPATIENTDETAILS,
            payload: err
        });
    };
};


export const getparticularPatientdetails = (data) => async (dispatch) => {
    request();
    const res = await patientService.getparticularpatientdetails(data)
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: PAT.REQUEST_PARTICULARPATIENTDETAILS });
    };

    function success(res) {
        dispatch({ type: PAT.SUCCESS_PARTICULARPATIENTDETAILS, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: PAT.FAILED_PARTICULARPATIENTDETAILS,
            payload: err
        });
    };
};






export const getparticularPatientdetailsbynumber = (data) => async (dispatch) => {
    request();
    const res = await patientService.getpatientdetailsbynumber(data)
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: PAT.REQUEST_PARTICULARPATIENTDETAILSBYNUMBER });
    };

    function success(res) {
        dispatch({ type: PAT.SUCCESS_PARTICULARPATIENTDETAILSBYNUMBER, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: PAT.FAILED_PARTICULARPATIENTDETAILSBYNUMBER,
            payload: err
        });
    };
};

export const getdatafromsimpleCRM = (data) => async (dispatch) => {
    request();
    const res = await patientService.getpatientfromSimpleCRM(data)
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: PAT.REQUEST_GETSIMPLECRM });
    };

    function success(res) {
        dispatch({ type: PAT.SUCCESS_GETSIMPLECRM, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: PAT.FAILED_GETSIMPLECRM,
            payload: err
        });
    };
};

export const getCheckedInPatients = (allCheckIns) => async (dispatch) => {
    request();
    allCheckIns.split(",").map(async (numbers) => {
        try {
            const res = await patientService.getpatientdetailsbynumber(numbers)
            success(res, true);
            return Promise.resolve(res.data);
        } catch (err) {
            failure(err)
            return Promise.reject(err);
        }
    });

    success([], false);

    function request() {
        dispatch({ type: PAT.REQUEST_ALL_CHECKINS });
    };

    function success(res, isLoading) {
        dispatch({ type: PAT.SUCCESS_ALL_CHECKINS, payload: res.data, isLoading });
    };
    function failure(err) {
        dispatch({
            type: PAT.FAILED_ALL_CHECKINS,
            payload: err
        });
    };
}



export const getpatientvitaldetails = (data) => async (dispatch) => {
    request();
    const res = await patientService.getpatientvitalsdetails(data)
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: PAT.REQUEST_PATIENTVITALSDETAILS });
    };

    function success(res) {
        dispatch({ type: PAT.SUCCESS_PATIENTVITALSDETAILS, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: PAT.FAILED_PATIENTVITALSDETAILS,
            payload: err
        });
    };
};




export const getPatientAppointmentList = (data) => async (dispatch) => {
    request();
    const res = await patientService.getpatientappointmentlist(data)
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: PAT.REQUEST_PATIENTAPPOINTMENTLIST });
    };

    function success(res) {
        dispatch({ type: PAT.SUCCESS_PATIENTAPPOINTMENTLIST, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: PAT.FAILED_PATIENTAPPOINTMENTLIST,
            payload: err
        });
    };
};


export const getAppointmentLists = (data) => async (dispatch) => {
    request();
    const res = await patientService.getAppointmentLists(data)
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: PAT.REQUEST_PATIENTAPPOINTMENTLIST });
    };

    function success(res) {
        dispatch({ type: PAT.SUCCESS_PATIENTAPPOINTMENTLIST, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: PAT.FAILED_PATIENTAPPOINTMENTLIST,
            payload: err
        });
    };
};


export const getPatientPharmacyLists = (data) => async (dispatch) => {
    request();
    const res = await patientService.getPatientPharmacyLists(data)
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: PAT.REQUEST_PATIENTMEDICINEDELIVERYLIST });
    };

    function success(res) {
        dispatch({ type: PAT.SUCCESS_PATIENTMEDICINEDELIVERYLIST, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: PAT.FAILED_PATIENTMEDICINEDELIVERYLIST,
            payload: err
        });
    };
};

export const getPatientdiagnosticOrderLists = (data) => async (dispatch) => {
    request();
    const res = await patientService.getPatientdiagnosticOrderLists(data)
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: PAT.REQUEST_PATIENTDIAGNOSTICSAPPOINTMENTLIST });
    };

    function success(res) {
        dispatch({ type: PAT.SUCCESS_PATIENTDIAGNOSTICSAPPOINTMENTLIST, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: PAT.FAILED_PATIENTDIAGNOSTICSAPPOINTMENTLIST,
            payload: err
        });
    };
};


export const getPatientmedicinedeliveryList = (data) => async (dispatch) => {
    request();
    const res = await patientService.getpatientmedicinedeliverydetails(data)
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: PAT.REQUEST_PATIENTMEDICINEDELIVERYLIST });
    };

    function success(res) {
        dispatch({ type: PAT.SUCCESS_PATIENTMEDICINEDELIVERYLIST, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: PAT.FAILED_PATIENTMEDICINEDELIVERYLIST,
            payload: err
        });
    };
};





export const getPatientdiagnosticsappointmentList = (data) => async (dispatch) => {
    request();
    const res = await patientService.getpatientdiagnosticsappointmentdetails(data)
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: PAT.REQUEST_PATIENTDIAGNOSTICSAPPOINTMENTLIST });
    };

    function success(res) {
        dispatch({ type: PAT.SUCCESS_PATIENTDIAGNOSTICSAPPOINTMENTLIST, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: PAT.FAILED_PATIENTDIAGNOSTICSAPPOINTMENTLIST,
            payload: err
        });
    };
};
export const getallactivePatientdetails = (data) => async (dispatch) => {
    request();
    const res = await patientService.getallactivePatientdetails(data);
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) { 
        failure(err)
        return Promise.reject(err);
    } 

    function request() {
        dispatch({ type: PAT.REQUEST_ALLREGISTEREDPATIENTLIST });
    };

    function success(res) {
        dispatch({ type: PAT.SUCCESS_ALLREGISTEREDPATIENTLIST, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: PAT.FAILED_ALLREGISTEREDPATIENTLIST,
            payload: err
        });
    };
  };








export const getLoginchepatientdetails = (data) => async (dispatch) => {
    request();
    const res = await patientService.getlogginedchepatientdetails(data)
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: PAT.REQUEST_LOGGINCHEPATIENTDETAILS });
    };

    function success(res) {
        dispatch({ type: PAT.SUCCESS_LOGGINCHEPATIENTDETAILS, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: PAT.FAILED_LOGGINCHEPATIENTDETAILS,
            payload: err
        });
    };
};





export const getAppointmentList = (data) => async (dispatch) => {
    request();
    const res = await patientService.getappointmentlist(data)
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: PAT.REQUEST_APPOINTMENTLIST });
    };

    function success(res) {
        dispatch({ type: PAT.SUCCESS_APPOINTMENTLIST, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: PAT.FAILED_APPOINTMENTLIST,
            payload: err
        });
    };
};






export const getupcomingAppointmentList = (doct, fromDate, toDate) => async (dispatch) => {
    request();
    const res = await patientService.getupcomingappointmentlist(doct, fromDate, toDate)
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: PAT.REQUEST_UPCOMINGAPPOINTMENTLIST });
    };

    function success(res) {
        dispatch({ type: PAT.SUCCESS_UPCOMINGAPPOINTMENTLIST, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: PAT.FAILED_UPCOMINGAPPOINTMENTLIST,
            payload: err
        });
    };
};




export const gethospitalclinicList = (data) => async (dispatch) => {
    request();
    const res = await patientService.gethospitalsandcliniclist(data)
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: PAT.REQUEST_HOSPITALCLINICLIST });
    };

    function success(res) {
        dispatch({ type: PAT.SUCCESS_HOSPITALCLINICLIST, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: PAT.FAILED_HOSPITALCLINICLIST,
            payload: err
        });
    };
};






export const getPatientReports = () => async (dispatch) => {
    request();
    const res = await userprofileservice.getpatientReport()
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: USER.REQUEST_PATIENTREPORT });
    };

    function success(res) {
        dispatch({ type: USER.SUCCESS_PATIENTREPORT, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: USER.FAILED_PATIENTREPORT,
            payload: err
        });
    };
};




export const getChelocationList = (data) => async (dispatch) => {
    request();
    const res = await patientService.getchelocationlist(data)
    console.log("resssssssssss", res)
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: PAT.REQUEST_CHELOCATIONLIST });
    };

    function success(res) {
        dispatch({ type: PAT.SUCCESS_CHELOCATIONLIST, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: PAT.FAILED_CHELOCATIONLIST,
            payload: err
        });
    };
};

export const getPatientmedicinedeliveryListFilter = (data) => async (dispatch) => {
    request();
    const res = await patientService.getpatientmedicinedeliverydetailsFilter(data)
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: PAT.REQUEST_PATIENTMEDICINEDELIVERYLIST });
    };

    function success(res) {
        dispatch({ type: PAT.SUCCESS_PATIENTMEDICINEDELIVERYLIST, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: PAT.FAILED_PATIENTMEDICINEDELIVERYLIST,
            payload: err
        });
    };
};




export const patientchemappinglocation = (data) => async (dispatch) => {
    request();
    const res = await patientService.savePatientchelocationmapping(data)
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: PAT.REQUEST_PATIENTCHELOCATIONMAPPING });
    };

    function success(res) {
        dispatch({ type: PAT.SUCCESS_PATIENTCHELOCATIONMAPPING, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: PAT.FAILED_PATIENTCHELOCATIONMAPPING,
            payload: err
        });
    };
};

