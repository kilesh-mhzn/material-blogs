import {ActionType} from "../../constants/actionType";
import * as api from "../../api/index"

export const signIn = (formData, navigate)=>async(dispatch)=>{
    try{
        const {data} = await api.signIn(formData)
        dispatch({type:ActionType.AUTH, data})
        navigate("/")
    }catch (e) {
        console.log(e)

    }
}
export const signUp = (formData, navigate)=>async(dispatch)=>{
    try{
        const {data} = await api.signUp(formData)
        dispatch({type:ActionType.AUTH, data})
        navigate("/")
    }catch (e) {
        console.log(e)

    }
}


