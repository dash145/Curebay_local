import { QUOT } from "../Constants/QuoatationConstant";

const initialState = {
  prescribedPharmaCenters: [],
  isError: false,
  isLoading: false,
  issuccess: false,
  msg: "",
  errMsg: "",
};

const quotPharmaReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case QUOT.REQUEST_PHARMA_CENTERS:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case QUOT.SUCCESS_PHARMA_CENTERS:
      return {
        ...state,
        isLoading: false,
        issuccess: true,
        prescribedPharmaCenters: payload,
        isError: false,
      };
    case QUOT.FAILED_PHARMA_CENTERS:
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

export default quotPharmaReducer;
