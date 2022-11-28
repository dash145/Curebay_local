import { USER } from "../Constants/userprofileConstants";

const initialState = {
    fileName: '',
    isError: false,
    isLoading: false,
    msg: '',
    errMsg: '',
};


const priscriptionUploadReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case USER.REQUEST_UPLOADPRESCRIPTION:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case USER.SUCCESS_UPLOADPRESCRIPTION:
            const data = action.data
            return {
                ...state,
                isLoading: false,
                fileName: payload,
                isEPrescription: data?.isEPrescription ?? false,
                visitData: data?.data,
                isError: false,
            };
        case USER.FAILED_UPLOADPRESCRIPTION:
            return {
                ...state,
                isLoading: false,
                errMsg: payload,
                isError: true
            };
        case USER.CLEAR_PRESCRIPTION:
            return {
                fileName: '',
                isError: false,
                isLoading: false,
                isEPrescription: false,
                visitData: null,
                msg: '',
                errMsg: '',
            }
        default:
            return state;
    }
};

export default priscriptionUploadReducer;