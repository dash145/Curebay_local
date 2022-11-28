import { hos } from "../Constants/Hospitalpageconstants";


const initialState = {
    procedurelistData: [],
    isError: false,
    isLoading: false,
    msg: '',
    errMsg: ''
};


const procedurelistReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case hos.REQUEST_PROCEDURELIST:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case hos.SUCCESS_PROCEDURELIST:
            return {
                ...state,
                isLoading: false,
                procedurelistData : payload,
                isError: false,              
            };
        case hos.FAILED_PROCEDURELIST:
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

export default procedurelistReducer;