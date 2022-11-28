import http from "./http-common";

class AuthDataService {
  sendOTP(data) {
    return http.post(`PatientOTP/generatePatientOTP/${data.mobileNo}/${data.mobileCheck}`);
  }

  verifyRegOtp(data) {
    return http.get(`PatientOTP/verifyPatientOTP/${data.otp}/${data.mobileNo}/${data.mobileCheck}`);
  }

  loginWithPassword(data) {
    return http.post('Login/Patient', data);
  }

  verifyLogOtp(data) {
    console.log("data123", data)
    return http.post('Login/PatientLoginWithMobile', data);
  }

  checkMobile(data) {
    console.log("data", data)
    return http.get(`PatientOTP/patinetMobileExist/${data.mobileNo}`);
  }

  registration(data) {
    return http.post(`user/`, data)
  }

  LoginWithPassword(data) {
    return http.post('Login/', data)
  }

  getuserType() {
    return http.get(`role/list`)
  }

  changePassword(data) {
    return http.post(`PatientPasswordConfig/changePassword`, data)
  }

  forgotPassword(data) {
    return http.post(`PatientPasswordConfig/forgetpassword/`, data)
  }

  resetPassword(data) {
    return http.post(`PatientPasswordConfig/resetpassword/`, data)
  }


  ///////////Forget Password OTP ////////
  
  resetPasswordOTP(data) {
    return http.post(`PatientOTP/generateForgetPasswordOTP?mobileNumber=${data.mobileNumber}&email=${data.email}&mobileCheck=${data.mobileCheck}`)
  }


  callToken = async () => {
    var data = new FormData();
    // @ts-ignore
    data.append('username', process.env.REACT_APP_USERNAME);
    // @ts-ignore
    data.append('password', process.env.REACT_APP_PASSWORD);
    // @ts-ignore
    data.append('grant_type', process.env.REACT_APP_GRANT_TYPE);
    // @ts-ignore
    return http.post(process.env.REACT_APP_BASEURL + 'oauth/token', data, {
      // @ts-ignore
      auth: { username: process.env.REACT_APP_AUTH_USERNAME, password: process.env.REACT_APP_AUTH_PASSWORD }
    })
  }

  logout(data) {
    return http.post(`Login/Patient/logout/${data.sessionId}/${data.userCode}`)
  }


}

export default new AuthDataService();