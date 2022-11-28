import http from "./http-common";

class Cheprofileservice {

  cheadminFeedback(data) {
    return http.post(`Feedback/`, data);
  }

  cheadmindetails(data) {
    return http.get(`user/${data}`);
  }

  savecheadmindetails(data) {
    return http.put(`user/${data.id}`, data);
  }

  cheadminnotifications(data) {
    return http.get(`notification/list/filter?trigeredTo=${data}`);
  }

  getNotification(data) {
    var queryString = Object.keys(data).map(key => key + '=' + data[key]).join('&');
    return http.get(`notification/list/filter?${queryString}`);
  }

  updateNotification(data) {
    return http.put(`notification/${data.id}`, data);
  }

  cheadminallcheorders(cheid, chelocationid) {
    return http.get(`PatientLabTestsOrder/list?CHEId=${cheid}&CHELocationId=${chelocationid}`);
  }

  getMappedDiagnostics(data) {
    var queryString = Object.keys(data).map(key => key + '=' + data[key]).join('&');
    return http.get(`Map_CHE_Facility/list?${queryString}`);
  }

  chechangePassword(data){
    return http.post(`PasswordMaintenance/`, data)
  }

  

}

export default new Cheprofileservice();