import express  from 'express';

const router = express.Router();
import { getBlogs, createBlog, getBlog, updateBlog } from "../../controllers/blogsController.js";


router.get("/", getBlogs)
router.get("/blog", getBlogs)
router.route("/").post(createBlog);
router.route("/:id").get(getBlog).patch(updateBlog);


export default router;
