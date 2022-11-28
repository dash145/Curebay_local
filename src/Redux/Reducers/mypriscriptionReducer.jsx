import { USER } from "../Constants/userprofileConstants";

const initialState = {
  mypriscriptionData: [],
  ePrescriptionData: [],
  isError: false,
  isLoading: false,
  msg: "",
  errMsg: "",
};

const mypriscriptionReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER.REQUEST_MYPRISCRIPTION:
    case USER.REQUEST_E_MYPRISCRIPTION:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case USER.SUCCESS_MYPRISCRIPTION:
      return {
        ...state,
        isLoading: false,
        mypriscriptionData: payload,
        isError: false,
      };
    case USER.SUCCESS_E_MYPRISCRIPTION:
      return {
        ...state,
        isLoading: false,
        ePrescriptionData: payload,
        isError: false,
      };
    case USER.FAILED_MYPRISCRIPTION:
    case USER.FAILED_E_MYPRISCRIPTION:
      return {
        ...state,
        isLoading: false,
        errMsg: payload,
        isError: true,
      };
    case USER.CLEAR_PRESCRIPTION:
      return {
        mypriscriptionData: [],
        ePrescriptionData: [],
        isError: false,
        isLoading: false,
        msg: "",
        errMsg: "",
      };
    default:
      return state;
  }
};

export default mypriscriptionReducer;
