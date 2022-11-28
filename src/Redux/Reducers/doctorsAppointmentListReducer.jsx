import { doc } from "../Constants/DoctorConstants";
import { USER } from "../Constants/userprofileConstants";

const initialState = {
    slotData: [],
    isError: false,
    isLoading: false,
    doctorappointmentList: [],
    postConsultation: {},
    success: false,
    msg: '',
    errMsg: ''
};


const doctorAppointmentListReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case doc.REQUEST_DOCAPPOINTMENTLIST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                success: false
            };
        case doc.SUCCESS_DOCAPPOINTMENTLIST:
            return {
                ...state,
                isLoading: false,
                slotData: payload,
                doctorappointmentList: payload,
                success: true,
                isError: false,
            };
        case doc.FAILED_DOCAPPOINTMENTLIST:
            return {
                ...state,
                isLoading: false,
                errMsg: payload,
                success: false,
                isError: true
            };

        case doc.REQUEST_POST_CONSULT:
            return {
                ...state,
                isLoading: true,
                isError: false,
                success: false
            };
        case doc.SUCCESS_POST_CONSULT:
            return {
                ...state,
                isLoading: false,
                slotData: payload,
                postConsultation: payload[0],
                success: true,
                isError: false,
            };
        case doc.FAILED_POST_CONSULT:
            return {
                ...state,
                isLoading: false,
                errMsg: payload,
                success: false,
                isError: true
            };
        case USER.CLEAR_POST_CONSULT:
                return {
                    ...state,
                    isLoading: false,
                    slotData: payload,
                    postConsultation: 0,
                    success: true,
                    isError: false,
                };
        default:
            return state;
    }
};

export default doctorAppointmentListReducer;