import http from "./http-common";

class UserprofileService {

  getPatientinfo(data) {
    return http.get(`patient/${data}`);
  }

  getPatientfamilymember(data) {
    return http.get(`/patient/list/filter?parentCode=${data}`);
  }


  onPatientfamilyMemberDelete(data) {
    return http.delete(`/patient/deletePatientByCode?code=${data}`);
  }


  getMyorders(data) {
    return http.get(`PatientLabTestsOrder/list?patientId=${data}&status=1`);
  }

  getMyDrugOrder(data) {
    return http.get(`PatientDrugPrescriptionOrder/orderlist?patientId=${data}&status=1`)
  }

  getNotifications(data) {
    return http.get(`notification/list/${data}`);
  }


  editPatientinfo(code, data) {
    return http.put(`patient/${code}`, data);
  }


  patientFeedback(data) {
    return http.post(`Feedback/`, data);
  }

  patientContactus(data) {
    return http.post(`ContactUs/enquiry`, data);
  }


  onApplyCoupon(data){
    return http.post(`Vouchery/redemptions/voucher`, data);


  }

  getCouponList(patientId,pageRef){
    return http.get(`Vouchery/campaign/vouchers/${pageRef}?patientId=${patientId}`)
  }

  getcustomercare(roleCode){
    return http.get(`user/list/filter?roleCode=${roleCode}`)
  }

  patientappointmentlist(data) {
    return http.get(`PatientAppointment/list?patientId=${data}&photoRequired=Y`);
  }

  // getmypriscription(data) {
  //   return http.get(`PatientDocument/list/filter?patientCode=${data}&documentRequired=Y`);
  // }

  getmypriscription(data) {
    var queryString = Object.keys(data).map(key => key + '=' + data[key]).join('&');
    return http.get(
      `Visit/list?${queryString}`
    );
  }


  // Visit/list?patientId=Deenxij52461p&visitSummary=Y&documentRequired=Y



  uploadPrescription(data) {
    return http.post('PatientDocument/', data);
  }

  patientlabtestorderlist(data) {
    return http.get(`PatientLabTestsOrder/list?patientId=${data}&status=1`);
  }

  patientlabtestorderreportlist(data) {
    return http.get(`LabTestsOrderReport/list/filter?orderId=${data}&docmentRequired=y&status=1`);
  }

  getpatientaddress(data) {
    return http.get(`AddressBook/list/filter?patientId=${data}`);
  }

  addpatientaddress(data) {
    return http.post(`AddressBook/`, data);
  }

  editpatientaddress(id, data) {
    return http.put(`AddressBook/${id}`, data);
  }


  deletePatientAddress( data) {
    return http.delete(`AddressBook/delete`,  { data:data });
  }



  getpatientpaymenthistory(data) {
    return http.get(`PayUMoneyTransaction/list/filter?patientId=${data}&status=1`);
  }



  addpatientallergy(data) {
    return http.post(`PatientAllergies/`, data);
  }

  addpatientmedication(data) {
    return http.post(`PatientMedication/`, data);
  }

  editpatientmedication(data) {
    return http.put(`PatientMedication/`, data);
  }


  addpatientmedicalhistory(data) {
    return http.post(`PastMedicalHistory/`, data);
  }

  getPatientsVisit({ patientId, fromDate, toDate }) {
    let params = "patientId=" + patientId;
    /**
     * Add other Params like fromDate, toDate
     */
    if (fromDate) {
      params = params.concat("&fromDate=", fromDate)
    }
    if (toDate) {
      params = params.concat("&toDate=", toDate)
    }
    params = params.concat("&visitSummary=Y");
    params = params.concat("&status=1");
    return http.get(`Visit/list?${params}`,)
  }

  getchronicconditionslist() {
    return http.get(`ChronicConditions/list/filter?status=1`);
  }
  
  getsocialhistorylist(data) {
    return http.get(`SocialHistory/list/filter?patientId=${data}`);
  }
  
  getfilteredsocialhistorylist(data, fromDate, toDate) {
    return http.get(`SocialHistory/list/filter?patientId=${data}&fromDate=${fromDate}&toDate=${toDate}`);
  }
  getfamilyhistorylist(data) {
    return http.get(`FamilyHistory/list/filter?patientId=${data}`);
  }
  
  
  getfilteredfamilyhistorylist(data, fromDate, toDate) {
    return http.get(`FamilyHistory/list/filter?patientId=${data}&fromDate=${fromDate}&toDate=${toDate}`);
  }
  
  getsurgicalhistorylist(data) {
    return http.get(`SurgicalHistory/list/filter?patientId=${data}`);
  }

  getfilteredsurgicalhistorylist(data, fromDate, toDate) {
    return http.get(`SurgicalHistory/list/filter?patientId=${data}&fromDate=${fromDate}&toDate=${toDate}`);
  }

  getmedicalhistorylist(data) {
    return http.get(`PastMedicalHistory/list/filter?patientId=${data}`);
  }
  
  getmedicationlist(data) {
    return http.get(`PatientMedication/list?patientCode=${data}`);
  }

  getallergieslist(data) {
    return http.get(`PatientAllergies/list?patientCode=${data}`);
  }
  
  getfilteredallergieslist(data, fromDate, toDate) {
    return http.get(`PatientAllergies/list?patientCode=${data}&fromDate=${fromDate}&toDate=${toDate}`);
  }

  
  getpatientchronicconditionslist(data) {
    return http.get(`PatientClassification/list?patientId=${data}`);
  }  

  
  // wallet
  getpatientwalletdetails(data) {
    return http.get(`users/${data}/wallet-account`);
  }

  //Wallet Transaction
  getpatientwalletTransactiondetails(data) {
    return http.get(`users/${data}/wallet-account/transactions`);
  }


  // add Surgical Data 
  
  addpatientsurgicalhistory(data) {
    return http.post(`SurgicalHistory/`, data);
  }
  
  editpatientallergy(data) {
    return http.put(`PatientAllergies/`, data)
  }
  
  //Chronical Data 
  addpatientchronicconditionslist(data) {
    return http.post(`PatientClassification/`, data);
  }
  
  //add history Detail
  addpatientsocialhistory(data) {
    return http.post(`SocialHistory/`, data);
  }

  addpatientfamilyhistory(data) {
    return http.post(`FamilyHistory/`, data);
  }

  myrequestpatients(data) {
    return http.get(`PatientServiceEnquiryForm/list?patientId=${data}`);
  }

  getPatientLabTestsDetails(data) {
    return http.get(`PatientLabTestsOrder/list?patientId=${data}&status=1&photoRequired=Y&orderDetailsRequired=Y`);
  }
  getPatientLabTestsDetailsFilter(data) {
    var queryString = Object.keys(data).map(key => key + '=' + data[key]).join('&');
    return http.get(
      `PatientLabTestsOrder/list?${queryString}`
    );
    // return http.get(`PatientLabTestsOrder/list?patientId=${data.patientId}&procedureStatus=1&status=1`);

    // return http.get(`PatientLabTestsOrder/list?patientId=${data.patientId}&fromDate=${data.fromDate}&toDate=${data.toDate}`);

    // return http.get(`PatientLabTestsOrder/list?patientId=${data.patientId}&orderId=${data.orderId}&fromDate=${data.fromDate}&toDate=${data.toDate}&procedureStatus=${data.procedureStatus}&status=`);
  }

}

export default new UserprofileService();