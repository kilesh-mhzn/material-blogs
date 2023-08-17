import {ActionType} from "../../constants/actionType";

const AuthReducer = (state={authData:null}, action) =>{
    switch(action.type){
        case ActionType.AUTH:
            localStorage.setItem('profile', JSON.stringify({...action?.data}))
            return {...state, authData: action?.data};

        case ActionType.LOGOUT:
            localStorage.clear();
            return {...state, authData: null}
        default:
            return state;
    }
}
export default AuthReducer