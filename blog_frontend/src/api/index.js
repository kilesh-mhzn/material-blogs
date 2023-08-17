import axios from "axios";

    // const API = axios.create({baseURL:"http://localhost:5000"})
const API = axios.create({baseURL:"https://meroblogapp.herokuapp.com"})

API.interceptors.request.use((req)=>{
    if(localStorage.getItem("profile")){
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req
})

export const fetchPosts = () => API.get("/api/posts")
export const createPost =(newPost)=> API.post("/api/posts", newPost);
export const deletePost =(id)=> API.delete(`${"/api/posts"}/${id}`);
export const updatePost = (id, updatedPost) => API.patch(`/api/posts/${id}`, updatedPost)
export const likePost = (id) => API.patch(`/api/posts/${id}/likePost`)

export const signIn = (formData)=>API.post("/api/user/signin", formData)
export const signUp = (formData)=>API.post("/api/user/signup", formData)