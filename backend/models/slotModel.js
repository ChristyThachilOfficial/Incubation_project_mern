const mongoose = require('mongoose')

const slotSchema = mongoose.Schema({
    applicationId: {
        type: String,
        default : null
    },
    seatNum: {
        type: Number,
       default:null 
    },
    isActive: {
        type: Boolean,
        default:false
    }
})

const Slot = mongoose.model('Slot', slotSchema)


module.exports = Slot