import { doc } from "../Constants/DoctorConstants";

const initialState = {
    isError: false,
    isLoading: false,
    success: false,
    msg: '',
    errMsg: ''
};


const DoctorAppointmentReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case doc.REQUEST_DOCAPPOINTMENT:
            return {
                ...state,
                isLoading: true,
                isError: false,
                success: false
            };
        case doc.SUCCESS_DOCAPPOINTMENT:
            return {
                ...state,
                isLoading: false,
                success: true,
                isError: false,
                msg: ''
            };
        case doc.FAILED_DOCAPPOINTMENT:
            return {
                ...state,
                isLoading: false,
                errMsg: payload,
                success: false,
                isError: true
            };

        case doc.REQUEST_REMOVE: {
            return {
                isError: false,
                isLoading: false,
                success: false,
                msg: '',
                errMsg: ''
            }
        }
        default:
            return state;
    }
};

export default DoctorAppointmentReducer;