import { QUOT } from "../Constants/QuoatationConstant";

const initialState = {
  labTests: [],
  isError: false,
  isLoading: false,
  issuccess: false,
  msg: "",
  errMsg: "",
};

const quotLabTestsReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case QUOT.REQUEST_PAT_LAB_TESTS:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case QUOT.SUCCESS_PAT_LAB_TESTS:
      return {
        ...state,
        isLoading: false,
        issuccess: true,
        labTests: payload,
        isError: false,
      };
    case QUOT.FAILED_PAT_LAB_TESTS:
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

export default quotLabTestsReducer;
