const { name } = require('ejs')
const mongoose = require('mongoose')

let userSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    },
    notes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "note"
    }
    ]
},{
    timestamps:true
})

module.exports = mongoose.model("user",userSchema);