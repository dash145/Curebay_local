import http from "./http-common";

class PatientService {

  savePatientAppointment(data) {
    return http.post(`PatientAppointment/`, data);
  }

  generateMaggiePlus(data) {
    const headers={
      "secretkey":"CcJYfbsgItHpTQPFr5lg"
    }
    // @ts-ignore
    console.log("process.env.REACT_APP_MAGGIEPLUS",process.env.REACT_APP_MAGGIEPLUS)
    // @ts-ignore
    return http.post(process.env.REACT_APP_MAGGIEPLUS, data,{headers: headers});
  }
   
  getpatientdetailsbynumber(data) {
    return http.get(`/patient/list/filter?mobile=${data}`);
  }
  
 

  getlogginedchepatientdetails(data) {
    return http.get(`PatientCHELocation/list?patientId=${data}&status=1`);
  }
  
  getPatientEnquireList(data) {
    return http.get(`/patient/list/filter?code=${data}?status=1`)
  }
  
  getpatientvitalsdetails(data) {
    return http.get(`PatientVitals/list/filter?patientCode=${data}`);
  }
  getparticularpatientdetails(data) {
    return http.get(`/patient/${data}`);
  }

  getpatientmedicinedeliverydetailsFilter(data) {
    var queryString = Object.keys(data).map(key => key + '=' + data[key]).join('&');
    return http.get(
      `PatientDrugPrescriptionOrder/list?${queryString}`
    );
  }
  
  getpatientmedicinedeliverydetails(data,pageSize) {
    return http.get(`PatientDrugPrescriptionOrder/orderlist?patientId=${data.patientId}&photoRequired=Y&pageNo=${pageSize}&pageSize=5`); 
  }


  getpatientmedicinedeliverydetailsOnFilter(data) {

    var queryString = Object.keys(data).map(key => key + '=' + data[key]).join('&');

    return http.get(`PatientDrugPrescriptionOrder/orderlist?${queryString}`); 
  }

  getpatientappointmentlist(data) {
    console.log( "patientappointmentlist",data)
    var queryString = Object.keys(data).map(key => key + '=' + data[key]).join('&');
    return http.get(`PatientAppointment/list?${queryString}`);
  }

  getpatientappointmentlistFilter(data) {
    console.log( "patientappointmentlist",data)
    var queryString = Object.keys(data).map(key => key + '=' + data[key]).join('&');
    return http.get(`PatientAppointment/list?${queryString}`);
  }

  

  
  getallactivePatientdetails(data) {
    var queryString = Object.keys(data).map(key => key + '=' + data[key]).join('&');
    return http.get(
      `PatientCHELocation/list?${queryString}`
    );
  }


  getPrintMediaData(mediaType) {
    return http.get(`media/getMedia?type=${mediaType}`); 
  }
}

export default new PatientService();