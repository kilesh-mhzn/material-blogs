import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    name: {
        type: String,
    },
    message:{
        type:String,
        required: true
    },
    creator:{
        type:String,
    },
    tags:{
        type:[String]
    },
    selectedFile:{
        type:String
    },
    likes:{
        type:[String],
        default: []
    },
    createdAt:{
        type:Date,
        default: new Date()
    }
})

const Posts = mongoose.model("Posts", postSchema)
export default Posts