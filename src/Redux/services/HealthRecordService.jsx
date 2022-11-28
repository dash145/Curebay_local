import http from "./http-common";

class HealthRecordService {

  getallergieslist(data) {
    return http.get(`PatientAllergies/list?patientCode=${data}`);
  }


  getmedicationlist(data) {
    return http.get(`PatientMedication/list?patientCode=${data}`);
  }

  getpatientvitallist(data) {
    return http.get(`PatientVitals/list/filter?patientCode=${data}`);
  }


  getmedicalhistorylist(data) {
    return http.get(`PastMedicalHistory/list/filter?patientId=${data}`);
  }

  getsurgicalhistorylist(data) {
    return http.get(`SurgicalHistory/list/filter?patientId=${data}`);
  }

  getfamilyhistorylist(data) {
    return http.get(`FamilyHistory/list/filter?patientId=${data}`);
  }

  getsocialhistorylist(data) {
    return http.get(`SocialHistory/list/filter?patientId=${data}`);
  }

  getchronicconditionslist() {
    return http.get(`ChronicConditions/list/filter?status=1`);
  }

  getpatientchronicconditionslist(data) {
    return http.get(`PatientClassification/list?patientId=${data}`);
  }

  addpatientchronicconditionslist(data) {
    return http.post(`PatientClassification/`, data);
  }


  
  getfilteredmedicalhistorylist(data, fromDate, toDate) {
    return http.get(`PastMedicalHistory/list/filter?patientId=${data}&fromDate=${fromDate}&toDate=${toDate}`);
  }

}

export default new HealthRecordService();