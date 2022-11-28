import http from "./http-common";
class DiagnosticService {

  getlabpartnerslist(data) {
    return http.get(`location/list/filter?HospitalType=D&photoRequired=Y&pinCode=${data}`);
  }


  getElasticLabsPartners(coords) {
    return http.get(`${process.env.REACT_APP_ELASTIC_BASEURL}labs?latitude=${coords.lat}&longitude=${coords.long}`);
  }


  recentlabtestappointments(data) {
    return http.get(`PatientLabTestsOrder/list?patientId=${data}`);
  }

  getCommonLabTest() {
    return http.get(`LabTests/list/commonLabTest`);
  }

  getPathologyTestList() {
    return http.get(`/LabTestsAndScans/list/filter?status=1`);
  }

  getLabTestList(data,pageNo) {
    // return http.get(`/LabTests/list?locationId=${data}&pageNo=${pageNo}&pageSize=200`);
    return http.get(`${process.env.REACT_APP_ELASTIC_BASEURL}labs/${data}/labtest?pageNo=${pageNo}&pageSize=20`);
  }

  getLabTestListSearch(data,searchText) {
    return http.get(`${process.env.REACT_APP_ELASTIC_BASEURL}labs/${data}/labtest?pageNo=1&pageSize=20&freeTextSearch=${searchText}`);
  }

  getFacilityDiscountPercent(facilityId){
    //https://api.curebay.com/dhp/FacilityBillingConfig/list?hospitalId=CBP-19&serviceCode=CBS-1301
    return http.get(`FacilityBillingConfig/list?locationId=${facilityId}`);
  }
}



export default new DiagnosticService();