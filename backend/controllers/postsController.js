import Posts from '../models/post.js'
import asyncWrapper from '../middleware/async.js'
import mongoose from "mongoose";

 export const createPost = asyncWrapper(async (req, res) => {
     const postData = req.body
     const post  = await Posts.create({...postData, creator: req.userId, createdAt: new Date().toISOString()});
     res.status(201).json({
         status: 'success',
         data: {
             post
         }
    });
 });

export const getPosts = asyncWrapper(async (req, res) =>{
    const posts = await Posts.find().sort({createdAt:-1});
    res.status(200).json({posts})
})

export const getPost = asyncWrapper( async (req, res, next) => {
    const {id: postId} = req.params
    const post = await Posts.findOne({_id: postId})
    if(!post){
        // const error = new Error("Post not found");
        // error.status = 404;
        // return next(error)
        return res.status(404).json({message: `Post not found with ID ${postId}` })
    }
    res.status(200).json({post})
})

export const updatePost = asyncWrapper(async(req,res)=>{
    const {id:postId} = req.params
    const post = req.body
    if(!mongoose.Types.ObjectId.isValid(postId)) return res.status(404).json({message: `Post not found with ID: ${postId}`})
    const updatedPost = await Posts.findByIdAndUpdate(postId, {...post, postId}, {new: true})
    res.status(200).json({updatedPost})
    }
)

export const deletePost = asyncWrapper(async(req, res) =>{
    const {id: postId} = req.params
    const post = await Posts.findByIdAndDelete({_id:postId})
    if(!post){
        return res.status(404).json({message: `Post not found with id: ${postId}`})
    }
    res.status(200).json({message: `Post with id ${postId} deleted successfully.`})
})

export const likePost = asyncWrapper(async(req, res)=>{
    const {id} = req.params
    if(!req.userId) return res.json({message: "unauthenticated"})

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({message: `Post not found with ID: ${id}`})
    const post = await Posts.findById(id)

    const index = post.likes.findIndex((id) => id === String(req.userId));

    if(index === -1){
        post.likes.push(req.userId)

    }else{
        post.likes = post.likes.filter((id)=>id!==String(req.userId))
    }


    const updatedPost = await Posts.findByIdAndUpdate(id, post, {new:true})
    res.status(200).json({updatedPost})
})


