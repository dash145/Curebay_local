import http from "./http-common";

class RegistrationService {
  Registration(data ) {
    return http.post(`patient/`,data)
  }
}

export default new RegistrationService();