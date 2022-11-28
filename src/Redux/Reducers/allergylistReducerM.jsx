import { HEALTHRECORD } from "../Constants/Helthrecordconstants";


const initialState = {
    allergyData: [],
    isError: false,
    isLoading: false,
    msg: '',
    errMsg: ''
};


const allergylistReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case HEALTHRECORD.REQUEST_ALLERGYLIST:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case HEALTHRECORD.SUCCESS_ALLERGYLIST:
            return {
                ...state,
                isLoading: false,
                allergyData : payload,
                isError: false,              
            };
        case HEALTHRECORD.FAILED_ALLERGYLIST:
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

export default allergylistReducer;