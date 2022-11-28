import http from "./http-common";

class GetQuotation {
  drugPrescriptionList(visitId) {
    return http.get("PatientDrugPrescription/list?visitId=" + visitId);
  }

  prescribedPharmacyCenters(prescriptionId) {
    return http.get(
      "PrescriptionPharamacyCenters/list?prescriptionId=" + prescriptionId
    );
  }

  patientLabTestsFromVisit(visitId) {
    return http.get("PatientLabTests/list?visitId=" + visitId);
  }

  getPrescriptionPharmacyCenters(data) {
    var queryString = Object.keys(data).map(key => key + '=' + data[key]).join('&');
    return http.get(
      `PrescriptionPharamacyCenters/list?${queryString}`
    );
  }

  getPrescriptionDiagnosticsCenters(data) {
    let queryString = Object.keys(data).map(key => key + '=' + data[key]).join('&');
    return http.get(
      `PrescriptionDiagnosticCenters/list?${queryString}`
    );
  }
  prescriptionDiagnosticCenters(prescriptionId) {
    return http.get(
      "PrescriptionDiagnosticCenters/list?prescriptionId=" + prescriptionId
    );
  }
}

export default new GetQuotation();