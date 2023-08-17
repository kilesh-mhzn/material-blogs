import asyncWrapper from "../middleware/async.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

import User from "../models/user.js"

export const signIn = asyncWrapper(async (req, res)=>{

    const {email, password} = req.body;
    try{
        const existingUser = await User.findOne({email})
        if(!existingUser) return res.status(404).json({message:"User does not Exist"})

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
        if(!isPasswordCorrect) return res.status(400).json({message: "Invalid Credentials"})

        const token = jwt.sign({email:existingUser.email, id: existingUser._id}, 'test',{expiresIn: "1h"})
        res.status(200).json({result: existingUser, token})

    }catch (e) {
        res.status(500).json({message:"something went Wrong."});
    }

})

export const signUp = asyncWrapper(async (req, res)=>{
    const {email, password, confirmPassword, firstName, lastName} = req.body
    try{
        const existingUser = await User.findOne({email})

        if(existingUser) return res.status(404).json({message:"User already exists"})

        if(password !==confirmPassword) return res.status(400).json({message: "Password do not match."})

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create(   {email, password:hashedPassword, name: `${firstName} ${lastName}`})

        const token = jwt.sign({email: result.email, id:result._id}, "test", {expiresIn: "1h"});

        res.status(200).json({result, token})

    }catch (e) {
        res.status(500).json({message: "Something went Wrong"})
    }

})

// export const signInGoogle = asyncWrapper(async (req, res)=>{
//     const {email} = req.body
//     try{
//         const existingUser = await User.findOne({email})
//     }
// })
