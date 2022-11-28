import { USER } from "../Constants/userprofileConstants";

const initialState = {
    patientwalletinfoData: [],
    isError: false,
    isLoading: false,
    msg: '',
    errMsg: '',
    walletTransactiondetails:[],
};


const patientwalletinfoReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case USER.REQUEST_WALLET:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case USER.SUCCESS_WALLET:
            return {
                ...state,
                isLoading: false,
                patientwalletinfoData : payload,
                isError: false,              
            };
        case USER.SUCCESS_WALLET_TRANS:
            return {
                ...state,
                isLoading: false,
                walletTransactiondetails : payload,
                isError: false,
            }
        case USER.FAILED_WALLET :
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

export default patientwalletinfoReducer;