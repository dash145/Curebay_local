import http from "./http-common";

class DashboardService {

  getlogginedcheadmin(data) {
    return http.get(`user/list/filter?code=${data}&status=1`);
  }

  getupcomingconsultations(cheCenterId, cheBranchId, fromDate, toDate) {
    return http.get(`PatientAppointment/listCHE?cheCenterId=${cheCenterId}&cheBranchId=${cheBranchId}&fromDate=${fromDate}&toDate=${toDate}&patientPhotoRequired=Y`);
  }

  getupcominglabappointments(cheCenterId, cheBranchId, fromDate) {
    return http.get(`PatientLabTestsOrder/listCHE?CHEId=${cheCenterId}&CHELocationId=${cheBranchId}`);
    //return http.get(`PatientLabTestsOrder/listCHE?CHEId=${cheCenterId}&CHELocationId=${cheBranchId}`);
  }
  getupcominglabappointmentsFilter(data) {
    var queryString = Object.keys(data).map(key => key + '=' + data[key]).join('&');
    return http.get(
      `PatientLabTestsOrder/listCHE?${queryString}`
    );
  }
  getlabappointments(data) {
    var queryString = Object.keys(data).map(key => key + '=' + data[key]).join('&');
    return http.get(`PatientLabTestsOrder/listCHE?${queryString}`);
    //return http.get(`PatientLabTestsOrder/listCHE?CHEId=${cheCenterId}&CHELocationId=${cheBranchId}`);
  }



  getupcomingchemedicinedelivery(cheCenterId, cheBranchId, fromDate) {
    return http.get(`PatientDrugPrescriptionOrder/listCHE?cheCenterId=${cheCenterId}&cheBranchId=${cheBranchId}&fromDate=${fromDate}&status=1&photoRequired=Y`);
  }
  getupcomingchemedicinedeliveryFilter(data) {
    var queryString = Object.keys(data).map(key => key + '=' + data[key]).join('&');
    return http.get(
      `PatientDrugPrescriptionOrder/listCHE?${queryString}`
    );
  }
  gethospitalenquirylist(fromDate, toDate) {
    // &fromDate=${fromDate}&toDate=${fromDate}
    const locationid = localStorage.getItem('locationid');
    return http.get(`PatientServiceEnquiryForm/listCHE?CHELocationId=${locationid}&fromDate=${fromDate}&toDate=${toDate}`);
  }

  getchedetails(data) {
    var queryString = Object.keys(data).map(key => key + '=' + data[key]).join('&');
    return http.get(
      `User_Hospital_Location/list?${queryString}`
    );
  }

  getHospitalEnquiry(data) {
    var queryString = Object.keys(data).map(key => key + '=' + data[key]).join('&');
    return http.get(`PatientServiceEnquiryForm/listCHE?${queryString}`);
  }

}

export default new DashboardService();