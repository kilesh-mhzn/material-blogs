import {ActionType} from "../../constants/actionType";

export default (posts = [], action ) =>{
    switch(action.type){
        case ActionType.FETCH_ALL:
            return action.payload.posts
        case ActionType.CREATE_POST:
            return [action.payload.data.post, ...posts];
        case ActionType.UPDATE_POST:
        case ActionType.LIKE_POST:
            console.log(action.payload.updatedPost)
            return posts.map((post)=>post._id === action.payload.updatedPost._id?action.payload.updatedPost:post)
        case ActionType.DELETE_POST:
            return posts.filter((post)=>(post._id!==action.payload))
        default:
            return posts
    }
}