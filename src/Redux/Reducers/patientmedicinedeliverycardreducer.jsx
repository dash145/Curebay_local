import { pat } from "../Constants/patientConstants";

const initialState = {
    PatientmedicinedeliveryData: [],
    isError: false,
    isLoading: false,
    msg: '',
    errMsg: ''
};


const Patientmedicinedeliverycard = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case pat.REQUEST_PATIENTMEDICINEDELIVERYLIST:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case pat.SUCCESS_PATIENTMEDICINEDELIVERYLIST:
            return {
                ...state,
                isLoading: false,
                PatientmedicinedeliveryData : payload,
                isError: false,              
            };
        case pat.FAILED_PATIENTMEDICINEDELIVERYLIST:
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

export default Patientmedicinedeliverycard;