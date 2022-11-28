import http from "./http-common";
import { ELASTIC_URL } from '../../config/constant'
class DoctorService {

  getDoctorslist(rolecode, pincode) {
    // return http.get(`user/list/filter1?roleCode=${data}`);
    return http.get(`location/list/users?userRoleCode=${rolecode}&pinCode=${pincode}&photoRequired=Y`);
  }

  esgetDoctorslist(coords, freeTextSearch, pageNo, pageSize) {
    return http.get(`${process.env.REACT_APP_ELASTIC_BASEURL}doctors?freeTextSearch=${freeTextSearch}&pageNo=${pageNo}&pageSize=${pageSize}&latitude=${coords.lat}&longitude=${coords.long}`);
  }

  getElasticDoctorslist(data) {
    console.log("Daasta",data)
    return http.get(`${ELASTIC_URL}items?type=DOCTOR&page=${data.page}&limit=${data.limit}&lat=${data.lat}&lon=${data.lon}&radius=100&keyword=${data.keyword}`);
  }


  getParticularDoctor(data) {
    return http.get(`user/${data}`);
    // return http.get(`/User_Hospital_Location/Users/list?code=${data}&status=1`);

  }

  getDoctorSlots(data) {
    return http.get(`AppointmentTemplate/list?userId=${data}`);
  }

  getDoctorSlotsfordatetodate(doc, to, from) {
    return http.get(`AppointmentTemplate/list?userId=${doc}&fromDate=${to}&toDate=${from}&status=1`);
  }

  getAllDoctorsAppointment(doc, data) {
    return http.get(`AppointmentTemplate/list?userId=${doc}&fromDate=${data}&toDate=${data}`);
  }

  getDoctorsspecialitylist() {
    return http.get(`Speciality/list`);
  }


  getReportDetails() {
    return http.get(`api/v1/reports/getDetails`);
  }

  getDoctorforparticularspeciality(code) {
    if(code){
      return http.get(`UserSpeciality/list?specialityCode=${code}&status=1`)

    } else{
      return http.get(`UserSpeciality/list?status=1`)
    }
    
  }

  bookDoctorAppointment(data) {
    return http.post('PatientAppointment/', data)
  }

  confirmPostDoctorAppointment(id, data){
    return http.put(`PatientAppointment/preferredOneUpdate/${id}`, data)
  }

  updateDoctorAppointment(data) {
    return http.put(`PatientAppointment/${data.id}`, data)
  }

  getDoctorsAppointment(data) {
    return http.get(`PatientAppointment/list?userId=${data}&fromPage=1`)
  }

  getPostConsultation(data) {
    return http.get(`Visit/list?appointmentId=${data}&visitSummary=Y&status=1&stampRequired=Y&documentRequired=Y&vitalRequired=Y`)
  }

  deleteDoctorAppointment(id,reason) {
    return http.delete(`PatientAppointment/${id}?status=3&reason=${reason}`)
  }

  gethospitalsandcliniclist(data) {
    return http.get(`User_Hospital_Location/list?userId=${data}&status=1`);
  }

  getBase64Img(fileName) {
    return http.get(`/FileData/fileWithByteArray?fileName=${fileName}`);
  }
  
  getDoctorslist1(roleCode , status) {
    // return http.get(`user/list/filter1?roleCode=${data}`);
    return http.get(
      `location/list/users?userRoleCode=PROV&pinCode=110001&status=1`
      //`User_Hospital_Location/Users/list?userRoleCode=PROV,SPECIALIST&uniqueUser=Y&pageNumber=10&status=1`
    );
  };


//       Star Doctors

  getStarDoctors(pincode) {
    return http.get(`location/list/users?userRoleCode=PROV&userStarDoctor=Y&pinCode=${pincode}&photoRequired=Y`);
  }

  getPackagesForDoctorPayment(userCode , serviceCode , doctorType){
    return http.get(`PatientPackageList?patientCode=${userCode}&serviceCode=${serviceCode}&status=1&doctorType=${doctorType}`)
  }

  imagetoData(data) {
    return http.get(`FileData/fileWithByteArray?fileName=${data}`)
  }

}

export default new DoctorService();