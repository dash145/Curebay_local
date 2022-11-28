import http from "./http-common";
class DiagnosticService {

    AddtoCart(data) {
        return http.post(`/PatientCart/`, data);
    }

    getCartList(data) {
        return http.get(`/PatientCart/list?patientId=${data}&status=1`);
    }

    getRecentOrder(data) {
        return http.get(`/PatientDrugPrescriptionOrder/list?patientId=${data}&status=1`)
    }

    uploadPrescriptionDoc(orderId, data) {
        return http.put(`/PatientCart/UploadPrescriptionDoc/${orderId}`, data);
    }

    getPrescriptionDoc(orderId, orderType){
        return http.get(`/PatientCart/PrescriptionDoc?orderId=${orderId}&orderType=${orderType}`);

    }

    // getCartList(data) {
    //     return http.get(`/PatientCart/list`);
    // }


    // PlaceLabTestOrder(data) {
    //     return http.post(`${ELASTIC_URL}items?type=LAB&page=${data.page}&limit=${data.limit}&lat=${data.lat}&lon=${data.lon}&radius=100&keyword=${data.keyword}`);
    // }
}



export default new DiagnosticService();