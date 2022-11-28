import http from "./http-common";
import {ELASTIC_URL} from '../../config/constant';
class PackageService {

    getMembershiplist() {
        return http.get(`Packages/list/filter`);
    }


    onMemberSubs(data){
      return http.post(`PatientPackages/`,data);

    }

    getPromotionlist(){
      return http.get(`Promotions/list/filter`);
    }

    getMyPackagesList(patientCode){
      return http.get(`PatientPackages/list/filter?patientCode=${patientCode}`);
    }

    redeemPackage(userCode , packageCode, packageOrderId){
    return http.post(`PatientPackageRedeem/?patientCode=${userCode}&packageCode=${packageCode}&packageOrderId=${packageOrderId}&status=1`)
    }

    getPackageInfo(code){
      return http.get(`PackageServices/list/filter?packageCode=${code}&status=1`)
    }


    onRedeemLabs(payload){
      return http.post(`PatientLabTestsOrder/`,payload)
    }

    onMemberCheck(patientCode,packageCode){
      return http.get(`PatientPackages/dulplicate?patientCode=${patientCode}&packageCode=${packageCode}&status=1`)
    }

    getHealthcarepackageslist() {
        return http.get(`Packages/list/filter?status=1`);
      }

      getAllSearch(data) {
        return http.get(`${ELASTIC_URL}items?type=ALL&page=1&limit=100&lat=${data.lat}&lon=${data.lon}&radius=100&keyword=${data.keyword}`);
      }
}

export default new PackageService();