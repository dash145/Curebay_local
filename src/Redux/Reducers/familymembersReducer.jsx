import { USER } from "../Constants/userprofileConstants";

const initialState = {
    FamilymembersData: [],
    isError: false,
    isLoading: false,
    msg: '',
    errMsg: ''
};


const FamilymembersReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case USER.REQUEST_FAMILYMEMBERS:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case USER.SUCCESS_FAMILYMEMBERS:
            return {
                ...state,
                isLoading: false,
                FamilymembersData : payload,
                isError: false,              
            };
        case USER.FAILED_FAMILYMEMBERS:
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

export default FamilymembersReducer;