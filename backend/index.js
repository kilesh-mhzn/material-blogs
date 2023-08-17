// const express = require('express');
// const connectDB = require('./db/config')

import express from 'express'
import bodyParser from "body-parser";
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./db/config.js"
import Blogs from "./routes/api/blogs.js"
import Posts from "./routes/api/posts.js"
import userRoutes from "./routes/api/users.js"

dotenv.config();



const app = express();

app.use(bodyParser.json({limit:"30mb", extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb", extended: true}))
app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}));

// app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World to the blog!");
});


app.use("/api/blogs", Blogs);
app.use("/api/posts", Posts);
app.use("/api/user", userRoutes);


const start = async()=>{
  try{
    await connectDB(process.env.DB_URI);
    app.listen(process.env.PORT, () => {
      console.log(`Server started on port ${process.env.PORT}`);
    });
    console.log("Connected to MongoDB");
  }catch(err){
    console.log(err);
  }
}

start();

