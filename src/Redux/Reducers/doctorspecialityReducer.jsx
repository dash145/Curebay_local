
import { spe } from "../Constants/SpecialityConstants";

const initialState = {
    doctspecialityData: [],
    isError: false,
    isLoading: false,
    msg: '',
    errMsg: ''
};


const doctorspecialitylistReducer = (state = initialState, action) => {
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
                doctspecialityData : payload,
                isError: false,
                msg:'successfully got doctors speciality'              
            };
        case spe.FAILED_SPELIST:
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

export default doctorspecialitylistReducer;