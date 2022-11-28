import { USER } from "../Constants/userprofileConstants";

const initialState = {
    MyordersData: [],
    isError: false,
    isLoading: false,
    msg: '',
    errMsg: ''
};


const MyordersReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case USER.REQUEST_MYORDERS:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case USER.SUCCESS_MYORDERS:
            return {
                ...state,
                isLoading: false,
                MyordersData: state.MyordersData.concat(payload),
                isError: false,
            };
        case USER.FAILED_MYORDERS:
            return {
                ...state,
                isLoading: false,
                errMsg: payload,
                isError: true
            };
        default:
            return state;
    }
};

export default MyordersReducer;