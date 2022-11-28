import { QUOT } from "../Constants/QuoatationConstant";

const initialState = {
  prescribedDiagnosisCenters: [],
  isError: false,
  isLoading: false,
  issuccess: false,
  msg: "",
  errMsg: "",
};

const quotDiagnosisReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case QUOT.REQUEST_PRES_DIAGONSIS_CENTERS:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case QUOT.SUCCESS_PRES_DIAGONSIS_CENTERS:
      return {
        ...state,
        isLoading: false,
        issuccess: true,
        prescribedDiagnosisCenters: payload,
        isError: false,
      };
    case QUOT.FAILED_PRES_DIAGONSIS_CENTERS:
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

export default quotDiagnosisReducer;
