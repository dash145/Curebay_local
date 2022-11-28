import { AUTH } from '../Constants/AuthConstants';
import { CURRENTLOCATION } from '../Constants/locationConstants';
import { MSGCONSTANT } from '../Constants/msgConstant';
const CryptoJS = require("crypto-js");
const SecureStorage = require('secure-web-storage')
const SECRET_KEY = 'secureMyData';



export var secureStorage = new SecureStorage(localStorage, {
  hash: function hash(key) {
    key = CryptoJS.SHA256(key, SECRET_KEY);
    return key.toString();
  },
  encrypt: function encrypt(data) {
    data = CryptoJS.AES.encrypt(data, SECRET_KEY);
    data = data.toString();
    return data;
  },
  decrypt: function decrypt(data) {
    data = CryptoJS.AES.decrypt(data, SECRET_KEY);
    data = data.toString(CryptoJS.enc.Utf8);
    return data;
  }
});
var abc = secureStorage.getItem('cords');
console.log("abc", abc)

const initialState = {
  userData: {},
  isError: false,
  isLoading: false,
  isLoginModal: true,
  index: 0,
  isOpen: false,
  search: { string: '', drop: '' , code: '' },
  otp: '',
  msg: '',
  errMsg: '',
  setModal: false,
  setModalSignup: false,
  isForgotModal: false,
  token: secureStorage.getItem('token') ? secureStorage.getItem('token') : null,
  refreshToken: secureStorage.getItem('refreshToken') ? secureStorage.getItem('refreshToken') : null,
  userType: secureStorage.getItem('userType') ? secureStorage.getItem('userType') : [],
  patientSession: secureStorage.getItem('patientSession') ? secureStorage.getItem('patientSession') : null,
  patientData: secureStorage.getItem('patientData') ? secureStorage.getItem('patientData') : {},
  patientId: secureStorage.getItem('patientData') ? secureStorage.getItem('patientData').id : null,
  patientCode: secureStorage.getItem('patientData') ? secureStorage.getItem('patientData').code : null,
  coords: secureStorage.getItem('coords') ? secureStorage.getItem('coords') : { lat: '20.2961', long: "85.8245" },
  customPinCode: secureStorage.getItem('customPinCode') ? secureStorage.getItem('customPinCode') : "751009",
  pincodelocation: secureStorage.getItem('pincodelocation') ? secureStorage.getItem('pincodelocation') : "",
  address: secureStorage.getItem('address') ? secureStorage.getItem('address') : 'Bhubaneswar',
};
console.log("intialState", initialState)
const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case AUTH.REQUEST_OTP:
      return {
        ...state,
        isLoading: true,
        isError: false
      };
    case AUTH.RESPONSE_OTP:
      return {
        ...state,
        isLoading: false,
        msg: 'otp send ' + MSGCONSTANT.success,
        isError: false,
      };
    case AUTH.FAILED_OTP:
      return {
        ...state,
        isLoading: false,
        msg: MSGCONSTANT.error,
        errMsg: payload,
        isError: true
      };
    case AUTH.REQUEST_PATIENT:
      return {
        ...state,
        isLoading: true,
        isError: false
      };
    case AUTH.RESPONSE_PATIENT:
      secureStorage.setItem('patientData', payload.patient);
      secureStorage.setItem('patientSession', payload.patientSession);
      return {
        ...state,
        isLoading: false,
        patientSession: payload.patientSession,
        patientData: payload.patient,
        patientId: payload.patient.id,
        patientCode: payload.patient.code,
        isError: false,
      };
    case AUTH.FAILURE_PATIENT:
      return {
        ...state,
        isLoading: false,
        msg: MSGCONSTANT.error,
        errMsg: payload,
        isError: true
      };

    case AUTH.CODE:
      return {
        ...state,
        patientCode: payload
      }
    case AUTH.SEARCH_STRING:
      return {
        ...state,
        search: payload
      }
    case AUTH.SETOKEN:
      console.log("result token",)
      return {
        ...state,
        token: payload.access_token,
        refreshToken: payload.refresh_token,
        isLoading: true,
        isError: false
      };
    case AUTH.SETMODAL:
      console.log("function call")
      return {
        ...state,
        isLoginModal: !state.isLoginModal,
        isForgotModal: payload
      }
    case AUTH.SETMODALSIGNUP:
      console.log("function call")
      return {
        ...state,
        setModalSignup: !state.setModalSignup,
        isForgotModal: payload
      }
    case AUTH.RESPOSNE_USERTYPE:
      console.log("function call", payload)
      return {
        ...state,
        isLoading: false,
        msg: MSGCONSTANT.error,
        userType: secureStorage.setItem('userType', payload),
        errMsg: payload,
        isError: true
      }
    case AUTH.FAILURE_USERTYPE:
      return {
        ...state,
        isLoading: false,
        msg: MSGCONSTANT.error,
        errMsg: payload,
        isError: true
      };
    case AUTH.LOGOUT:
      secureStorage.removeItem('patientData');
      secureStorage.removeItem('patientSession');
      return {
        ...state,
        patientSession: {},
        patientData: {},
        patientId: null,
        patientCode: null
      }
    case AUTH.CHECKOPEN:
      return {
        ...state,
        index: payload.index,
        isOpen: payload.isOpen
      }
    case AUTH.LATLON:
      return {
        ...state,
        coords: payload
      }
    case AUTH.PINCODE:
      return {
        ...state,
        customPinCode: payload.pincode,
        pincodelocation: payload.location
      }  
    case AUTH.ADDRESS:
      return {
        ...state,
        address: payload,
      }
    default:
      return state;
  }
};



export const currentlocationReducer = (
  state = initialState, location = [],
  action
) => {
  const { type } = action;
  switch (type) {
    case CURRENTLOCATION.REQUEST_CURRENTLOCATION:
      return { ...state, loading: true, isError: false };
    case CURRENTLOCATION.SUCCESS_CURRENTLOCATION:
      return { ...state, loading: false, isError: false, location: action.payload };
    case CURRENTLOCATION.FAILED_CURRENTLOCATION:
      return { ...state, loading: false, isError: false, error: action.payload };
    default:
      return state;
  }
};



export default authReducer;