import { doc } from "../Constants/DoctorConstants";
import { spe } from "../Constants/SpecialityConstants";
import doctorService from "../services/doctorService";
import { USER } from "../Constants/userprofileConstants";

export const getDoctorslist = (coords, freeTextSearch, pageNo, pageSize) => async (dispatch) => {
    request();
    // const res = await doctorService.getDoctorslist(pincode, freeTextSearch, pageNo, pageSize)
    const res = await doctorService.esgetDoctorslist(coords, freeTextSearch, pageNo, pageSize)
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: doc.REQUEST_DOCLIST });
    };

    function success(res) {
        dispatch({ type: doc.SUCCESS_DOCLIST, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: doc.FAILED_DOCLIST,
            payload: err
        });
    };
};


export const getElasticDoctorslist = (data) => async (dispatch) => {
    request();
    //const res = await doctorService.getElasticDoctorslist(data)
    const res = await doctorService.getDoctorslist1("PROV,SPECIALIST", 1);
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: doc.REQUEST_DOCLIST });
    };

    function success(res) {
        dispatch({ type: doc.SUCCESS_DOCLIST, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: doc.FAILED_DOCLIST,
            payload: err
        });
    };
};

export const getDoctorspecialitylist = () => async (dispatch) => {
    request();
    const res = await doctorService.getDoctorsspecialitylist()
    try {
        success(res);
        return Promise.resolve(res.data);

    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: spe.REQUEST_SPELIST });
    };

    function success(res) {
        dispatch({ type: spe.SUCCESS_SPELIST, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: spe.FAILED_SPELIST,
            payload: err
        });
    };
};



export const getReportDetails = () => async (dispatch) => {
    request();
    const res = await doctorService.getReportDetails()
    try {
        success(res);
        return Promise.resolve(res.data);

    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: spe.REQUEST_REPORT_DETAILS });
    };

    function success(res) {
        dispatch({ type: spe.SUCCESS_REPORT_DETAILS, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: spe.FAILED_REPORT_DETAILS,
            payload: err
        });
    };
};

export const getParticularDoctors = (data) => async (dispatch) => {
    request();
    const res = await doctorService.getParticularDoctor(data);
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: doc.REQUEST_PARTICULARDOC });
    };

    function success(res) {
        dispatch({ type: doc.SUCCESS_PARTICULARDOC, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: doc.FAILED_PARTICULARDOC,
            payload: err
        });
    };
};

export const getDoctorsslots = (data, to , from) => async (dispatch) => {
    request();
    const res = await doctorService.getDoctorSlotsfordatetodate(data , to ,from)
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: doc.REQUEST_DOCSLOTS });
    };

    function success(res) {
        dispatch({ type: doc.SUCCESS_DOCSLOTS, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: doc.FAILED_DOCSLOTS,
            payload: err
        });
    };
};

export const getDoctorsslotsfordatetodate = (doc, data) => async (dispatch) => {
    request();
    const res = await doctorService.getDoctorSlotsfordatetodate(doc, data)
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: doc.REQUEST_DOCSLOTSFORDATETODATE });
    };

    function success(res) {
        dispatch({ type: doc.SUCCESS_DOCSLOTSFORDATETODATE, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: doc.FAILED_DOCSLOTSFORDATETODATE,
            payload: err
        });
    };
};

export const getDoctorforparticularspeciaity = (code) => async (dispatch) => {
    request();
    const res = await doctorService.getDoctorforparticularspeciality(code)
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: doc.REQUEST_DOCSPECIAITYLIST });
    };

    function success(res) {
        dispatch({ type: doc.SUCCESS_DOCSPECIAITYLIST, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: doc.FAILED_DOCSPECIAITYLIST,
            payload: err
        });
    };
};

export const bookDoctorAppointment = (data) => async (dispatch) => {
    request();
    const res = await doctorService.bookDoctorAppointment(data)
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
        dispatch({ type: doc.REQUEST_DOCAPPOINTMENT });
    };

    function success(res) {
        dispatch({ type: doc.SUCCESS_DOCAPPOINTMENT, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: doc.FAILED_DOCAPPOINTMENT,
            payload: err
        });
    };
};

export const confirmPostDoctorAppointment = (id, data) => async (dispatch) => {
    request();
    const res = await doctorService.confirmPostDoctorAppointment(id ,data)
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
        dispatch({ type: doc.REQUEST_DOCAPPOINTMENT });
    };

    function success(res) {
        dispatch({ type: doc.SUCCESS_DOCAPPOINTMENT, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: doc.FAILED_DOCAPPOINTMENT,
            payload: err
        });
    };
};

export const updateDoctorAppointment = (data) => async (dispatch) => {
    request();
    const res = await doctorService.updateDoctorAppointment(data)
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
        dispatch({ type: doc.REQUEST_DOCAPPOINTMENT });
    };

    function success(res) {
        dispatch({ type: doc.SUCCESS_DOCAPPOINTMENT, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: doc.FAILED_DOCAPPOINTMENT,
            payload: err
        });
    };
};

export const deleteAppointment = (id,reason) => async (dispatch) => {
    request();
    const res = await doctorService.deleteDoctorAppointment(id,reason)
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
        dispatch({ type: doc.REQUEST_DOCAPPOINTMENT });
    };

    function success(res) {
        dispatch({ type: doc.SUCCESS_DOCAPPOINTMENT, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: doc.FAILED_DOCAPPOINTMENT,
            payload: err
        });
    };
};

export const getDoctorsAppointment = (data) => async (dispatch) => {
    request();
    const res = await doctorService.getDoctorsAppointment(data)
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: doc.REQUEST_DOCAPPOINTMENTLIST });
    };

    function success(res) {
        dispatch({ type: doc.SUCCESS_DOCAPPOINTMENTLIST, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: doc.FAILED_DOCAPPOINTMENTLIST,
            payload: err
        });
    };
};

export const getPostConsultation = (data) => async (dispatch) => {
    request();
    const res = await doctorService.getPostConsultation(data)
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: doc.REQUEST_POST_CONSULT });
    };

    function success(res) {
        dispatch({ type: doc.SUCCESS_POST_CONSULT, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: doc.FAILED_POST_CONSULT,
            payload: err
        });
    };
};

export const clearPostConsultation = () => async (dispatch) => {
    dispatch({ type: USER.CLEAR_POST_CONSULT });
};

export const removeSuccess = () => async (dispatch) => {
    request();
    function request() {
        dispatch({ type: doc.REQUEST_REMOVE });
    };
};

export const clearDoctorData=()=>async(dispatch)=>{
    request();
    function request() {
        dispatch({ type: doc.REMOVE_DOCLIST });
    };
}

export const gethospitalclinicList = (data) => async (dispatch) => {
    request();
    const res = await doctorService.gethospitalsandcliniclist(data)
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: doc.REQUEST_HOSPITALCLINICLIST });
    };

    function success(res) {
        dispatch({ type: doc.SUCCESS_HOSPITALCLINICLIST, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: doc.FAILED_HOSPITALCLINICLIST,
            payload: err
        });
    };
};

export const removeUpdateSuccess = () => async (dispatch) => {
    request();
    function request() {
        dispatch({ type: doc.REMOVE_UPDATEAPPOINTMENT });
    };
  };



//   Star Doctors

export const getStarDoctors = (pincode) => async (dispatch) => {
    console.log(getStarDoctors);
    request();
    const res = await doctorService.getStarDoctors(pincode)
    try {
        success(res);
        // console.log("starrrrrrrrrrrrrrrr",res.data);
        return Promise.resolve(res.data);
        
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: doc.REQUEST_DOCLIST });
    };

    function success(res) {
        dispatch({ type: doc.SUCCESS_DOCLIST, payload: res.data });
        // console.log("starrrrrrrrrrrrrrrr",res.data);
    };
    function failure(err) {
        dispatch({
            type: doc.FAILED_DOCLIST,
            payload: err
        });
    };
};
