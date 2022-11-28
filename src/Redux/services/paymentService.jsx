import http from "./http-common";

class PaymentService {
  
  gettotalPaymentList(data) {
    var queryString = Object.keys(data).map(key => key + '=' + data[key]).join('&');
    return http.get(
      `PatientBilling/list?${queryString}`
    );
  }

  getBillingDetails(params) {
    return http.get(
      `PatientBilling/listBillingDetails?txnId=${params}`
    );
  }
}

export default new PaymentService();
