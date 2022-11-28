import { doc } from "../Constants/DoctorConstants";

const initialState = {
    slotData: [],
    isError: false,
    isLoading: false,
    success : false,
    msg: '',
    errMsg: ''
};


const doctorslotsReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case doc.REQUEST_DOCSLOTS:
            return {
                ...state,
                isLoading: true,
                isError: false,
                success : false
            };
        case doc.SUCCESS_DOCSLOTS:
            return {
                ...state,
                isLoading: false,
                slotData : payload,
                success : true,
                isError: false,              
            };
        case doc.FAILED_DOCSLOTS:
            return {
                ...state,
                isLoading: false,
                errMsg: payload,
                success : false,
                isError: true
            };
        default:
            return state;
    }
};

export default doctorslotsReducer;