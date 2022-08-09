const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema({
    user : {
        //foreign key
        type : mongoose.Schema.Types.ObjectId,
        //name of schema : copied notes from user.js 
        ref : 'user'
    },
    title : {
        type: String,
        required : true
    },
    description : {
        type: String,
        required : true
    },
    tag : {
        type: String,
        default : 'General'
    },
    date : {
        type : Date,
        default : Date.now
    }
});

module.exports = mongoose.model('notes', NotesSchema);