import mongoose from 'mongoose';

const Blog = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const Blogs = mongoose.model("Blog", Blog);

export default Blogs