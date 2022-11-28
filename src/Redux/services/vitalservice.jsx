import http from "./http-common";

class VitalService {
  getallergieslist(data) {
    return http.get(`PatientAllergies/list?patientCode=${data}`);
  }

  getmedicationhistorylist(data) {
    return http.get(`PatientMedication/list?patientCode=${data}`);
  }

  getpatientvitallist(data) {
    return http.get(`PatientVitals/list/filter?patientCode=${data}`);
  }

  getmedicalhistorylist(data) {
    return http.get(`PastMedicalHistory/list/filter?patientId=${data}`);
  }

  addpatientvitaldetails(data) {
    return http.post(`PatientVitals/`, data);
  }
}

export default new VitalService();
