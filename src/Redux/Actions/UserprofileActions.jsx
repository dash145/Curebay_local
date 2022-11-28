import { pat } from "../Constants/patientConstants";
import { USER } from "../Constants/userprofileConstants";
import authService from "../services/authService";
import userprofileservice from "../services/userprofileservice";



export const getPatientDetails = (data) => async (dispatch) => {
    request();
    const res = await userprofileservice.getPatientinfo(data)
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: pat.REQUEST_PATIENTINFO });
    };

    function success(res) {
        dispatch({ type: pat.SUCCESS_PATIENTINFO, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: pat.FAILED_PATIENTINFO,
            payload: err
        });
    };
};



export const getPatientfamilymembers = (data) => async (dispatch) => {
    request();
    const res = await userprofileservice.getPatientfamilymember(data)
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: USER.REQUEST_FAMILYMEMBERS });
    };

    function success(res) {
        dispatch({ type: USER.SUCCESS_FAMILYMEMBERS, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: USER.FAILED_FAMILYMEMBERS,
            payload: err
        });
    };
};




export const onPatientfamilyMembersDelete = (data) => async (dispatch) => {
    request();
    const res = await userprofileservice.onPatientfamilyMemberDelete(data)
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: USER.REQUEST_FAMILYMEMBERS_DELETE });
    };

    function success(res) {
        dispatch({ type: USER.SUCCESS_FAMILYMEMBERS_DELETE, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: USER.FAILED_FAMILYMEMBERS_DELETE,
            payload: err
        });
    };
};







export const editPatientDetails = (id, data) => async (dispatch) => {
    request();
    const res = await userprofileservice.editPatientinfo(id, data)
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: USER.REQUEST_USEREDIT });
    };

    function success(res) {
        dispatch({ type: USER.SUCCESS_USEREDIT, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: USER.FAILED_PATIENTINFO,
            payload: err
        });
    };
};



export const patientFeedback = (data) => async (dispatch) => {
    request();
    const res = await userprofileservice.patientFeedback(data)

    try {
        success(res);
        console.log(res.data)
        return Promise.resolve(res.data);

    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: USER.REQUEST_FEEDBACK });
    };

    function success(res) {
        dispatch({ type: USER.SUCCESS_FEEDBACK, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: USER.FAILED_FEEDBACK,
            payload: err
        });
    };
};

// ///////////////////////

export const patientContactus = (data) => async (dispatch) => {
    request();
    const res = await userprofileservice.patientContactus(data)

    try {
        success(res);
        console.log(res.data)
        return Promise.resolve(res.data);

    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: USER.REQUEST_CONTACTUS });
    };

    function success(res) {
        dispatch({ type: USER.SUCCESS_CONTACTUS, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: USER.FAILED_CONTACTUS,
            payload: err
        });
    };
};


/////////////////////////////////apply coupon////////////
export const onApplyCoupon = (data,pageRef) => async (dispatch) => {
    request();
    const res = await userprofileservice.onApplyCoupon(data,pageRef)

    try {
        success(res);
        console.log(res.data)
        return Promise.resolve(res.data);

    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: USER.REQUEST_APPLYCOUPON });
    };

    function success(res) {
        dispatch({ type: USER.SUCCESS_APPLYCOUPON, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: USER.FAILED_APPLYCOUPON,
            payload: err
        });
    };
};




/////////////////////////////////apply coupon////////////
export const getCouponListDoctor = (data,pageRef) => async (dispatch) => {
    request();
    const res = await userprofileservice.getCouponList(data,pageRef)

    try {
        success(res);
        console.log(res.data)
        return Promise.resolve(res.data);

    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: USER.REQUEST_COUPON_DOCTOR });
    };

    function success(res) {
        dispatch({ type: USER.SUCCESS_COUPON_DOCTOR, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: USER.FAILED_COUPON_DOCTOR,
            payload: err
        });
    };
};


/////////////////////////////////apply coupon////////////
export const getCouponList = (data,pageRef) => async (dispatch) => {
    request();
    const res = await userprofileservice.getCouponList(data,pageRef)

    try {
        success(res);
        console.log(res.data)
        return Promise.resolve(res.data);

    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: USER.REQUEST_COUPON_CART });
    };

    function success(res) {
        dispatch({ type: USER.SUCCESS_COUPON_CART, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: USER.FAILED_COUPON_CART,
            payload: err
        });
    };
};


/////////////////////////////////apply coupon////////////
export const getCouponListGen = (data,pageRef) => async (dispatch) => {
    request();
    const res = await userprofileservice.getCouponList(data,pageRef)

    try {
        success(res);
        console.log(res.data)
        return Promise.resolve(res.data);

    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: USER.REQUEST_COUPON_GEN });
    };

    function success(res) {
        dispatch({ type: USER.SUCCESS_COUPON_GEN, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: USER.FAILED_COUPON_GEN,
            payload: err
        });
    };
};

/////////////////////////


export const getCustomerList = (data) => async (dispatch) => {
    request();
    const res = await userprofileservice.getcustomercare(data)

    try {
        success(res);
        console.log(res.data)
        return Promise.resolve(res.data);

    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: USER.REQUEST_CUSTOMERLIST });
    };

    function success(res) {
        dispatch({ type: USER.SUCCESS_CUSTOMERLIST, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: USER.FAILED_CUSTOMERLIST,
            payload: err
        });
    };
};





export const getappointmentlist = (data) => async (dispatch) => {
    request();
    const res = await userprofileservice.patientappointmentlist(data)


    try {
        success(res);
        return Promise.resolve(res.data);

    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: USER.REQUEST_APPOINTMENT });
    };

    function success(res) {
        dispatch({ type: USER.SUCCESS_APPOINTMENT, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: USER.FAILED_APPOINTMENT,
            payload: err
        });
    };
};




export const getmypriscriptionlist = (data, fileName) => async (dispatch) => {
    request();
    const res = await userprofileservice.getmypriscription(data)


    try {
        success(res);
        return Promise.resolve(res.data);

    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: USER.REQUEST_MYPRISCRIPTION });
    };

    function success(res) {
        dispatch({ type: USER.SUCCESS_MYPRISCRIPTION, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: USER.FAILED_MYPRISCRIPTION,
            payload: err
        });
    };
};


export const getEPriscriptionList = (patientId, fromDate, toDate) => async (dispatch) => {
    request();
    const res = await userprofileservice.getPatientsVisit({patientId, fromDate, toDate})


    try {
        success(res);
        return Promise.resolve(res.data);

    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: USER.REQUEST_E_MYPRISCRIPTION });
    };

    function success(res) {
        dispatch({ type: USER.SUCCESS_E_MYPRISCRIPTION, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: USER.FAILED_E_MYPRISCRIPTION,
            payload: err
        });
    };
};

export const uploadPrescription = (data, filename) => async (dispatch) => {
    request();
    await userprofileservice.uploadPrescription(data)

    try {
        success(filename);
        return Promise.resolve(filename);

    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: USER.REQUEST_UPLOADPRESCRIPTION });
    };

    function success(res) {
        dispatch({ type: USER.SUCCESS_UPLOADPRESCRIPTION, payload: res });
    };
    function failure(err) {
        dispatch({
            type: USER.FAILED_UPLOADPRESCRIPTION,
            payload: err
        });
    };
}

export const clearPrescription = () => async  (dispatch) => {
    dispatch({ type: USER.CLEAR_PRESCRIPTION })
}

export const selectPrescription = (prescriptionName, isEPrescription, data) => async (dispatch) => {
    success(prescriptionName, {isEPrescription, data});
    function success(res, data) {
        dispatch({ type: USER.SUCCESS_UPLOADPRESCRIPTION, payload: res, data: data });
    };
}

export const getpatientorders = (data) => async (dispatch) => {
    request();
    const res = await userprofileservice.getMyorders(data)
    try {
        success(res);
        console.log(res)
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: USER.REQUEST_MYORDERS });
    };

    function success(res) {
        dispatch({ type: USER.SUCCESS_MYORDERS, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: USER.FAILED_MYORDERS,
            payload: err
        });
    };
};


export const getpatientDrugorders = (data) => async (dispatch) => {
    request();
    const res = await userprofileservice.getMyDrugOrder(data)
    try {
        success(res);
        console.log(res)
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: USER.REQUEST_MYORDERS });
    };

    function success(res) {
        dispatch({ type: USER.SUCCESS_MYORDERS, payload: res.data.data });
    };
    function failure(err) {
        dispatch({
            type: USER.FAILED_MYORDERS,
            payload: err
        });
    };
};





export const getNotification = (data) => async (dispatch) => {
    request();
    const res = await userprofileservice.getNotifications(data)
    try {

        console.log('is not',res.data)
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: USER.REQUEST_NOTIFICATIONS });
    };

    function success(res) {
        dispatch({ type: USER.SUCCESS_NOTIFICATIONS, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: USER.FAILED_NOTIFICATIONS,
            payload: err
        });
    };
};






export const patientChangepassword = (data) => async (dispatch) => {
    request();
    const res = await authService.changePassword(data)
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

export const patientResetPassword = (data) => async (dispatch) => {
    request();
    const res = await authService.resetPassword(data) 
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: USER.REQUEST_RESETPASSWORD });
    };

    function success(res) {
        dispatch({ type: USER.SUCCESS_RESETPASSWORD, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: USER.FAILED_RESETPASSWORD,
            payload: err
        });
    };
};



export const patientResetPasswordOTP = (data) => async (dispatch) => {
    // request();
    const res = await authService.resetPasswordOTP(data) 
    try {
        // success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        // failure(err)
        return Promise.reject(err);
    }

    // function request() {
    //     dispatch({ type: USER.REQUEST_RESETPASSWORDOTP });
    // };

    // function success(res) {
    //     dispatch({ type: USER.SUCCESS_RESETPASSWORDOTP, payload: res.data });
    // };
    // function failure(err) {
    //     dispatch({
    //         type: USER.FAILED_RESETPASSWORDOTP,
    //         payload: err
    //     });
    // };
};



export const patientlabtestOrderlists = (data) => async (dispatch) => {
    request();
    const res = await userprofileservice.patientlabtestorderlist(data)
    try {
        success(res);
        console.log(res)
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: USER.REQUEST_PATLABTESTORDERLIST });
    };

    function success(res) {
        dispatch({ type: USER.SUCCESS_PATLABTESTORDERLIST, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: USER.FAILED_PATLABTESTORDERLIST,
            payload: err
        });
    };
};





export const patientlabtestOrderreportlists = (data) => async (dispatch) => {
    request();
    const res = await userprofileservice.patientlabtestorderreportlist(data)
    try {
        success(res);
        console.log(res)
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: USER.REQUEST_PATLABTESTORDEREPORTLIST });
    };

    function success(res) {
        dispatch({ type: USER.SUCCESS_PATLABTESTORDEREPORTLIST, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: USER.FAILED_PATLABTESTORDEREPORTLIST,
            payload: err
        });
    };
};






export const patientaddresslists = (data) => async (dispatch) => {
    request();
    const res = await userprofileservice.getpatientaddress(data)
    try {
        success(res);
        console.log(res)
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: USER.REQUEST_PATIENTADDRESSLIST });
    };

    function success(res) {
        dispatch({ type: USER.SUCCESS_PATIENTADDRESSLIST, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: USER.FAILED_PATIENTADDRESSLIST,
            payload: err
        });
    };
};




export const addingpatientaddress = (data) => async (dispatch) => {
    request();
    const res = await userprofileservice.addpatientaddress(data)
    try {
        success(res);
        console.log(res)
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: USER.REQUEST_ADDPATIENTADDRESS });
    };

    function success(res) {
        dispatch({ type: USER.SUCCESS_ADDPATIENTADDRESS, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: USER.FAILED_ADDPATIENTADDRESS,
            payload: err
        });
    };
};



export const editingpatientaddress = (id, data) => async (dispatch) => {
    request();
    const res = await userprofileservice.editpatientaddress(id, data)
    try {
        success(res);
        console.log(res)
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: USER.REQUEST_EDITPATIENTADDRESS });
    };

    function success(res) {
        dispatch({ type: USER.SUCCESS_EDITPATIENTADDRESS, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: USER.FAILED_EDITPATIENTADDRESS,
            payload: err
        });
    };
};



export const deletePatientAddress = ( data) => async (dispatch) => {
    request();
    const res = await userprofileservice.deletePatientAddress( data)
    try {
        success(res);
        console.log(res)
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: USER.REQUEST_DELETEPATIENTADDRESS });
    };

    function success(res) {
        dispatch({ type: USER.SUCCESS_DELETEPATIENTADDRESS, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: USER.FAILED_DELETEPATIENTADDRESS,
            payload: err
        });
    };
};





export const patientpaymentdetails = (data) => async (dispatch) => {
    request();
    const res = await userprofileservice.getpatientpaymenthistory(data)
    try {
        success(res);
        console.log(res)
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: USER.REQUEST_PATIENTPAYMENTHISTORY });
    };

    function success(res) {
        dispatch({ type: USER.SUCCESS_PATIENTPAYMENTHISTORY, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: USER.FAILED_PATIENTPAYMENTHISTORY,
            payload: err
        });
    };
};



// Patient Wallet Details

export const walletdetails = (data) => async (dispatch) => {
    request();
    const res = await userprofileservice.getpatientwalletdetails(data)
    try {
        success(res);
        console.log(res)
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: USER.REQUEST_WALLET });
    };

    function success(res) {
        dispatch({ type: USER.SUCCESS_WALLET, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: USER.FAILED_WALLET,
            payload: err
        });

    }
}

//Patient Wallet Transaction Details

export const walletTransactiondetails = (data) => async (dispatch) => {
    request();
    const res = await userprofileservice.getpatientwalletTransactiondetails(data)
    try {
        success(res);
        console.log(res)
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: USER.REQUEST_WALLET });
    };

    function success(res) {
        dispatch({ type: USER.SUCCESS_WALLET_TRANS, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: USER.FAILED_WALLET,
            payload: err
        });

    }
}




export const patientaddallergy = (data) => async (dispatch) => {
    request();
    const res = await userprofileservice.addpatientallergy(data)
    try {
        success(res);
        console.log(res)
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: USER.REQUEST_ADDALLERGY });
    };

    function success(res) {
        dispatch({ type: USER.SUCCESS_ADDALLERGY, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: USER.FAILED_ADDALLERGY,
            payload: err
        });
    };
};


export const patientEditallergy = (data) => async (dispatch) => {
    request();
    const res = await userprofileservice.editpatientallergy(data)
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: USER.REQUEST_ADDALLERGY });
    };

    function success(res) {
        dispatch({ type: USER.SUCCESS_ADDALLERGY, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: USER.FAILED_ADDALLERGY,
            payload: err
        });
    };
};





export const patientaddmedication = (data) => async (dispatch) => {
    request();
    const res = await userprofileservice.addpatientmedication(data)
    try {
        success(res);
        console.log(res)
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: USER.REQUEST_ADDMEDICATION });
    };

    function success(res) {
        dispatch({ type: USER.SUCCESS_ADDMEDICATION, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: USER.FAILED_ADDMEDICATION,
            payload: err
        });
    };
};

export const patientMedicationEdit = (data) => async (dispatch) => {
    request();
    const res = await userprofileservice.editpatientmedication(data)

    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        // dispatch({ type: PAT.REQUEST_PATIENTINFO });
    };

    function success(res) {
        // dispatch({ type: PAT.SUCCESS_PATIENTINFO, payload: res.data });
    };
    function failure(err) {
        // dispatch({
        //     type: PAT.FAILED_PATIENTINFO,
        //     payload: err
        // });
    };
};





export const patientaddmedicalhistory = (data) => async (dispatch) => {
    request();
    const res = await userprofileservice.addpatientmedicalhistory(data)
    try {
        success(res);
        console.log(res)
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: USER.REQUEST_ADDMEDICALHISTORY });
    };

    function success(res) {
        dispatch({ type: USER.SUCCESS_ADDMEDICALHISTORY, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: USER.FAILED_ADDMEDICALHISTORY,
            payload: err
        });
    };
};

export const getPatientallergylist = (data) => async (dispatch) => {
    request();
    const res = await userprofileservice.getallergieslist(data)
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: USER.REQUEST_ALLERGYLIST });
    };

    function success(res) {
        dispatch({ type: USER.SUCCESS_ALLERGYLIST, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: USER.FAILED_ALLERGYLIST,
            payload: err
        });
    };
};

export const getFilteredPatientallergylist = (data, fromDate, toDate) => async (dispatch) => {
    request();
    const res = await userprofileservice.getfilteredallergieslist(data, fromDate, toDate)
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: USER.REQUEST_ALLERGYLIST });
    };

    function success(res) {
        dispatch({ type: USER.SUCCESS_ALLERGYLIST, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: USER.FAILED_ALLERGYLIST,
            payload: err
        });
    };
};

export const getPatientmedicationlist = (data) => async (dispatch) => {
    request();
    const res = await userprofileservice.getmedicationlist(data)
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: USER.REQUEST_MEDICATIONLIST });
    };

    function success(res) {
        dispatch({ type: USER.SUCCESS_MEDICATIONLIST, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: USER.FAILED_MEDICATIONLIST,
            payload: err
        });
    };
};

//add pateent Details 

export const patientaddsurgicalhistory = (data) => async (dispatch) => {
    request();
    const res = await userprofileservice.addpatientsurgicalhistory(data)
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        // dispatch({ type: USER.REQUEST_SURGICALHISTORY });
    };

    function success(res) {
        // dispatch({ type: USER.SUCCESS_SURGICALHISTORY, payload: res.data });
    };
    function failure(err) {
        // dispatch({
        //     type: USER.FAILED_SURGICALHISTORY,
        //     payload: err
        // });
    };
};


export const getmedicalhistory = (data) => async (dispatch) => {
    request();
    const res = await userprofileservice.getmedicalhistorylist(data)
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: USER.REQUEST_MEDICALHISTORYLIST });
    };

    function success(res) {
        dispatch({ type: USER.SUCCESS_MEDICALHISTORYLIST, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: USER.FAILED_MEDICALHISTORYLIST,
            payload: err
        });
    };
};

export const getsurgicalhistory = (data) => async (dispatch) => {
    request();
    const res = await userprofileservice.getsurgicalhistorylist(data)
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: USER.REQUEST_SURGICALHISTORYLIST });
    };

    function success(res) {
        dispatch({ type: USER.SUCCESS_SURGICALHISTORYLIST, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: USER.FAILED_SURGICALHISTORYLIST,
            payload: err
        });
    };
};

export const getfilteredsurgicalhistory = (data, fromDate, toDate) => async (dispatch) => {
    request();
    
    const res = await userprofileservice.getfilteredsurgicalhistorylist(data, fromDate, toDate)
    
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: USER.REQUEST_SURGICALHISTORYLIST });
    };

    function success(res) {
        dispatch({ type: USER.SUCCESS_SURGICALHISTORYLIST, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: USER.FAILED_SURGICALHISTORYLIST,
            payload: err
        });
    };
};

export const getfamilyhistory = (data) => async (dispatch) => {
    request();
    const res = await userprofileservice.getfamilyhistorylist(data)
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: USER.REQUEST_FAMILYHISTORYLIST });
    };

    function success(res) {
        dispatch({ type: USER.SUCCESS_FAMILYHISTORYLIST, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: USER.FAILED_FAMILYHISTORYLIST,
            payload: err
        });
    };
};

export const getfilteredfamilyhistory = (data, fromDate, toDate) => async (dispatch) => {
    request();
    const res = await userprofileservice.getfilteredfamilyhistorylist(data, fromDate, toDate)
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: USER.REQUEST_FAMILYHISTORYLIST });
    };

    function success(res) {
        dispatch({ type: USER.SUCCESS_FAMILYHISTORYLIST, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: USER.FAILED_FAMILYHISTORYLIST,
            payload: err
        });
    };
};

export const getsocialhistory = (data) => async (dispatch) => {
    request();
    const res = await userprofileservice.getsocialhistorylist(data)
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: USER.REQUEST_SOCIALHISTORYLIST });
    };

    function success(res) {
        dispatch({ type: USER.SUCCESS_SOCIALHISTORYLIST, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: USER.FAILED_SOCIALHISTORYLIST,
            payload: err
        });
    };
};

export const getfilteredsocialhistory = (data, fromDate, toDate) => async (dispatch) => {
    request();
    const res = await userprofileservice.getfilteredsocialhistorylist(data, fromDate, toDate)
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: USER.REQUEST_SOCIALHISTORYLIST });
    };

    function success(res) {
        dispatch({ type: USER.SUCCESS_SOCIALHISTORYLIST, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: USER.FAILED_SOCIALHISTORYLIST,
            payload: err
        });
    };
};


export const getchronicconditions = () => async (dispatch) => {
    request();
    const res = await userprofileservice.getchronicconditionslist()
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: USER.REQUEST_CHRONICCONDITIONSLIST });
    };

    function success(res) {
        dispatch({ type: USER.SUCCESS_CHRONICCONDITIONSLIST, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: USER.FAILED_CHRONICCONDITIONSLIST,
            payload: err
        });
    };
};

export const patientaddfamilyhistory = (data) => async (dispatch) => {
    request();
    const res = await userprofileservice.addpatientfamilyhistory(data)
    try {
        success(res);
        console.log(res)
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        // dispatch({ type: USER.REQUEST_ADDMEDICALHISTORY });
    };

    function success(res) {
        // dispatch({ type: USER.SUCCESS_ADDMEDICALHISTORY, payload: res.data });
    };
    function failure(err) {
        // dispatch({
        //     type: USER.FAILED_ADDMEDICALHISTORY,
        //     payload: err
        // });
    };
};

export const patientaddsocialhistory = (data) => async (dispatch) => {
    request();
    const res = await userprofileservice.addpatientsocialhistory(data)
    try {
        success(res);
        console.log(res)
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        // dispatch({ type: USER.REQUEST_ADDMEDICALHISTORY });
    };

    function success(res) {
        // dispatch({ type: USER.SUCCESS_ADDMEDICALHISTORY, payload: res.data });
    };
    function failure(err) {
        // dispatch({
        //     type: USER.FAILED_ADDMEDICALHISTORY,
        //     payload: err
        // });
    };
};


export const getPatientMyRequests = (data) => async (dispatch) => {
    request();
    const res = await userprofileservice.myrequestpatients(data)
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: USER.REQUEST_MYREQUESTPATIENT });
    };

    function success(res) {
        dispatch({ type: USER.SUCCESS_MYREQUESTPATIENT, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: USER.FAILED_MYREQUESTPATIENT,
            payload: err
        });
    };
};

export const getPatientLabTestsList = (data) => async (dispatch) => {
    request();
    const res = await userprofileservice.getPatientLabTestsDetails(data)
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: USER.REQUEST_PATIENTMYORDERS });
    };

    function success(res) {
        dispatch({ type: USER.SUCCESS_PATIENTMYORDERS, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: USER.FAILED_PATIENTMYORDERS,
            payload: err
        });
    };
};

export const getPatientLabTestsListFilter = (data) => async (dispatch) => {
    request();
    const res = await userprofileservice.getPatientLabTestsDetailsFilter(data)
    try {
        success(res);
        return Promise.resolve(res.data);
    } catch (err) {
        failure(err)
        return Promise.reject(err);
    }

    function request() {
        dispatch({ type: USER.REQUEST_PATIENTMYORDERS });
    };

    function success(res) {
        dispatch({ type: USER.SUCCESS_PATIENTMYORDERS, payload: res.data });
    };
    function failure(err) {
        dispatch({
            type: USER.FAILED_PATIENTMYORDERS,
            payload: err
        });
    };
};
