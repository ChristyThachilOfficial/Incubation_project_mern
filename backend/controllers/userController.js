const User = require('../models/userModel')
const Application = require('../models/applicationModel')
const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateTokens');
const { use } = require('../routes/users');

const registerUser = async (req, res) => {
    const { name, email, password, rePassword } = req.body;

    const userExists = await User.findOne({ email })
    
    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }
    
    const user = await User.create({
        name,
        email,
        password,
        rePassword
    })

    if (user) {
        res.status(201).json({
            _id:user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token:generateToken(user._id)
           
        })
    } else {
        res.status(400)
        throw new Error('Error occured')
    }

   
}

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    let user =await  User.findOne({ email })
    
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(400);
        throw new Error('Login failed')
    }
})

const incubationRegister =async (req,res) => {
    const { name,
        address,
        city,
        stateC,
        email,
        phoneNum,
        companyName,
        companyBackground,
        companyProducts,
        facingProblem,
        revenueModel,
        marketSize,
        incubationType,
        businessProposal,
        userId
    } = req.body

    const application = await Application.create({
        name,
        address,
        city,
        stateC,
        email,
        phoneNum,
        companyName,
        companyBackground,
        companyProducts,
        facingProblem,
        revenueModel,
        marketSize,
        incubationType,
        businessProposal,
        userId
    }).then(() => {
        res.json({
            message:'application created'
        })
    }).catch((err) => {
        console.log('the error is ',err)
        res.status(400)
        throw new Error('Application submission failed')
    })
}

const applicationList = async (req, res) => {
    
    const application = await Application.find({ userId: req.params.userId })
    
    if (application.length >= 1) {
        res.json(application)
    } else {
        res.json([{ 
            message:'no applications found'
        }])
    }

}

const deleteApplication =async (req, res) => {
    await Application.deleteOne({ _id: req.params.applicationId })
    res.json({status:true})
}

module.exports = {registerUser , authUser ,incubationRegister,applicationList, deleteApplication}