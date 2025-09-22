const { name } = require('ejs')
const mongoose = require('mongoose')

let noteSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
}, {
    timestamps: true
})


module.exports = mongoose.model("note",noteSchema);
