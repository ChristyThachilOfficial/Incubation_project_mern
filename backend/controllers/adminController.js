const Application = require('../models/applicationModel')
const Slot = require('../models/slotModel')
const ObjectId = require('mongoose').Types.ObjectId

module.exports = {
    adminAuth: (req, res) => {
        if (req.body.email === process.env.ADMIN_EMAIL && req.body.password === process.env.ADMIN_PASS) {
            res.json({
                email: req.body.email,
                password: req.body.password
            })
        } else {
            res.status(400);
            throw new Error('Login failed')
        }
    },
    getApplications:async (req, res) => {
        const application = await Application.find()
        
        res.json(application)
    },
    acceptApplications: async (req, res) => {

        await Application.updateOne({ _id: req.params.applicationId }, { $set: { status: "pending" } })
             res.json({status:true})
         
    },
    rejectApplications:async (req, res) => {
       await Application.updateOne({ _id: req.params.applicationId }, { $set: { status: 'rejected' } })
            res.json({status:true})
        
    },
    getSingleApplication: async (req, res) => {
        const application = await Application.findOne({ _id: req.params.applicationId })
        res.json(application)
    },
    addSlots: (req, res) => {
         Slot.create({}).then((response) => {
            console.log(response)
            res.json({
                message:"slot created"
            })
        }).catch((err) => {
            res.status(400)
            throw new Error("SLOT CREATION FAILED")
        })
    },
    getAllSlots: async(req, res) => {
        Slot.find().then((slots) => {
            
            res.json(slots)
        }).catch((err) => {
            res.status(400)
            throw new Error('unable to fetch slots')
        })
    },
    bookSlots:async (req, res) => {
        
        Slot.updateOne({ _id: req.body.id }, { $set: { applicationId: req.body.applicationId, seatNum: req.body.seatNum,isActive:true } }).then(() => {
            Application.updateOne({ _id: ObjectId(req.body.applicationId) }, { $set: { status: "approved", seatNum: req.body.seatNum } }).then(() => {
                res.json({ status: true })
            })
            
        }).catch((err) => {
            res.json(400)
            throw new Error('unable to book slot')
        })
    }


}