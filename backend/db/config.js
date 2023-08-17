// import express from "express";
import mongoose from 'mongoose';

const connectDB = (url) =>{
    mongoose.connect(url).then(()=>{
    }).catch((err)=>{
        console.log("Error connecting to database",err);
    });
}

export default connectDB;