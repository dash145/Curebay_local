import http from "./http-common";

class ReportServices {

  getReportList(payload) {
    var queryString = Object.keys(payload).map(key => key + '=' + payload[key]).join('&');
    return http.get(
      `PatientDocument/list/filter?${queryString}&documentRequired=Y&status=1`
    );
  }

  uploadReport(payload) {
    return http.post(
      `PatientDocument/` , payload
    );
  }

  updateReport(payload, id) {
    return http.put(
      `PatientDocument/${id}` , payload
    );
  }
  
  alliedService () {
    return http.get(
      `Services/list/filter?serviceCategoryCode=${'CBS-5'}&status=${'1'}`
    )
  }
  
  getAlliedServiceDetails (hosid) {
    return http.get(
      `/FacilityBillingConfig/list?hospitalId=CBP-13&serviceCode=${hosid}`
    );
  }

//   getPatientList(data) {
//     var queryString = Object.keys(data).map(key => key + '=' + data[key]).join('&');
//     return http.get(
//       `patient/list?${queryString}`
//     );
//   }

//   getDiagnosticLocation(data) {
//     var queryString = Object.keys(data).map(key => key + '=' + data[key]).join('&');
//     return http.get(
//       `location/list/filter?${queryString}`
//     );
//   }
}

export default new ReportServices();