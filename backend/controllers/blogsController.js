import Blogs from '../models/blog.js'
import asyncWrapper from '../middleware/async.js'


 export const createBlog = asyncWrapper(async (req, res) => {
     const blog  = await Blogs.create(req.body);
     res.status(201).json({
         status: 'success',
         data: {
             blog
         }
    });
 });

export const getBlogs = asyncWrapper(async (req, res) =>{
    const blogs = await Blogs.find().sort({createdAt:-1});
    res.status(200).json({ blogs })
})

export const getBlog = asyncWrapper( async (req, res, next) => {
    const {id: blogId} = req.params
    const blog = await Blogs.findOne({_id: blogId})
    if(!blog){
        const error = new Error("Blog not found");
        error.status = 404;
        return next(error)
        return res.status(404).json({message: `Blog not found with ID ${blogId}` })
    }
    res.status(200).json({blog})
})

export const updateBlog = asyncWrapper(async(req,res,next)=>{
    const {id:blogId} = req.params
    const {title, content} = req.body
    const blog = await Blogs.findOneAndUpdate({_id: blogId}, {title, content}, {new: true, runValidators: true})
    if(!blog){
        return res.status(404).json({message: `Blog not found with ID: ${blogId}`})
    }
    res.status(200).json({blog})
    }
)

export const deleteBlog = asyncWrapper(async(req, res) =>{
    const {id: blogId} = req.params
    const blog = await Blogs.findOneAndDelete({_id:blogId})
    if(!blog){
        return res.status(404).json({message: `Blog not found with id: ${blogId}`})
    }
    res.status(200).json({message: `Blog with id ${blogId} deleted successfully.`})
})



