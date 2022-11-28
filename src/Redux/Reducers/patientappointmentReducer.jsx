
import { spe } from "../Constants/SpecialityConstants";

const initialState = {
    savePatientAppointment: {},
    isError: false,
    isLoading: false,
    msg: '',
    errMsg: ''
};


const patientappointmentReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case spe.REQUEST_SPELIST:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case spe.SUCCESS_SPELIST:
            return {
                ...state,
                isLoading: false,
               userData : payload,
                isError: false,
                msg:'successfully booked appointment'              
            };
        case spe.FAILED_SPELIST:
            return {
                ...state,
                isLoading: false,
                errMsg: payload,
                isError: true,
                msg:'booking appointment failed' 

            };
        default:
            return state;
    }
};

export default patientappointmentReducer;