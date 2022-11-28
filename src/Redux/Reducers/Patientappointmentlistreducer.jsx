import { pat } from "../Constants/patientConstants";

const initialState = {
    appointmentlistData: [],
    isError: false,
    isLoading: false,
    msg: '',
    errMsg: ''
};


const PatientAppointmentlistReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case pat.REQUEST_PATIENTAPPOINTMENTLIST:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case pat.SUCCESS_PATIENTAPPOINTMENTLIST:
            return {
                ...state,
                isLoading: false,
                appointmentlistData : payload,
                isError: false,              
            };
        case pat.FAILED_PATIENTAPPOINTMENTLIST:
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

export default PatientAppointmentlistReducer;