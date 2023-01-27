const mongoose = require("mongoose");

const StudentSchema = mongoose.Schema({
    fname:String,
    lname:String,
    r_num:{
        type : Number,
        unique : true
    },
    
})

module.exports = mongoose.model('StudentSchema',StudentSchema)