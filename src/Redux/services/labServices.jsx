import http from "./http-common";

class LabServices {

  getLabOrderDetails(data) {
    var queryString = Object.keys(data).map(key => key + '=' + data[key]).join('&');
    return http.get(
      `LabTestsOrderReport/list/filter?${queryString}`
    );
  }

  getDiagnosticCenter(data) {
    var queryString = Object.keys(data).map(key => key + '=' + data[key]).join('&');
    return http.get(
      `hospital/list/filter?${queryString}`
    );
  }

  getPatientList(data) {
    var queryString = Object.keys(data).map(key => key + '=' + data[key]).join('&');
    return http.get(
      `patient/list?${queryString}`
    );
  }

  getDiagnosticLocation(data) {
    var queryString = Object.keys(data).map(key => key + '=' + data[key]).join('&');
    return http.get(
      `location/list/filter?${queryString}`
    );
  }
}

export default new LabServices();
