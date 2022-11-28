import { QUOT } from "../Constants/QuoatationConstant";

const initialState = {
  drugPrescriptionData: [],
  isError: false,
  isLoading: false,
  issuccess: false,
  msg: "",
  errMsg: "",
};

const quotDrugreducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case QUOT.REQUEST_DRUG_PRES_LIST:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case QUOT.SUCCESS_DRUG_PRES_LIST:
      return {
        ...state,
        isLoading: false,
        issuccess: true,
        drugPrescriptionData: payload,
        isError: false,
      };
    case QUOT.FAILED_DRUG_PRES_LIST:
      return {
        ...state,
        isLoading: false,
        errMsg: payload,
        isError: true,
      };
    case QUOT.CLEAR_MSG:
      return initialState;
    default:
      return state;
  }
};

export default quotDrugreducer;
