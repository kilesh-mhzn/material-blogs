import * as api from "../../api"
import {ActionType} from "../../constants/actionType";

//Action creators

export const getPosts = () => async (dispatch) => {
    try{
        const {data} = await api.fetchPosts()
        dispatch({type: ActionType.FETCH_ALL, payload: data})
    }catch(e){
        console.log(e)
    }     
}

export const createPost = (post) => async(dispatch) =>{
    try{
        const {data} = await api.createPost(post);
        dispatch({type:ActionType.CREATE_POST, payload:data})
    }
    catch (e) {
        console.log(e)
    }
}

export const updatePost = (id, post) =>async (dispatch)=>{
    try{
        const {data} = await api.updatePost(id, post);
        dispatch({type:ActionType.UPDATE_POST, payload:data})
    }
    catch (e) {
        console.log(e)
    }

}

export const deletePost = (id) => async(dispatch)=>{
    try{
        await api.deletePost(id);
        dispatch({type: ActionType.DELETE_POST, payload:id})

    }catch (e) {
        console.log(e)
    }
}

export const likePost = (id) => async(dispatch)=>{
    try{
        const {data} = await api.likePost(id);
        dispatch({type: ActionType.LIKE_POST, payload:data})

    }catch (e) {
        console.log(e)
    }
}
