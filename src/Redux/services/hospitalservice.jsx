import http from "./http-common";
import { ELASTIC_URL } from '../../config/constant'
class HospitalService {

  getAllStates() {
    return http.get(`state/list`);
  }
  getHopitalslist(data) {
    // return http.get(`hospital/list/filter?type=H`);
    if(data){
      return http.get(`location/list/filter?pinCode=${data}&HospitalType=H&photoRequired=Y`);
    } else{
      return http.get(`location/list/filter`);
    }
  }

  getparticularhospital(code, pincode) {
    return http.get(`location/list/filter?code=${code}&photoRequired=Y`);
  }

  esgetHopitalslist(coords, freeTextSearch, pageNo, pageSize){
    return http.get(`${process.env.REACT_APP_ELASTIC_BASEURL}hospital/search?pageNo=${pageNo}&pageSize=${pageSize}&freeTextSearch=${freeTextSearch}&latitude=${coords.lat}&longitude=${coords.long}`);
  }
  
  getElastichospitallist(data) {
    return http.get(`${ELASTIC_URL}items?type=HOSPITAL&page=${data.page}&limit=${data.limit}&lat=${data.lat}&lon=${data.lon}&radius=100&keyword=${data.keyword}`);
  }

  getDoctorslist(hospitalcode , rolecode) {
    // return http.get(`user/list/filter1?roleCode=${data}`);
    return http.get(
      `User_Hospital_Location/Users/list?hospitalCode=${hospitalcode}&userRoleCode=${rolecode}`
    );
  };

  submitEnquiry(data) {
    return http.post(`PatientServiceEnquiryForm/`, data);
  }
   
  procedurelist(){
    return http.get(`Procedure/list`);
  }

  postpatientenquiryhospitalform(data){
    return http.post(`PatientServiceEnquiryForm/`, data);
  }

}

export default new HospitalService();