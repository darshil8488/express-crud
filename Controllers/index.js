const Student = require('../Student');

// create student 
function createNote(req,res){
    if(req.body.content){
        return res.status(400).json({
            message: "invalid data"
        })
    }

    const student = new Student({
        fname: req.body.fname,
        lname: req.body.lname,
        r_num: req.body.r_num
    })
    student.save().then(function(data){
        res.json(data);
    }).catch(function(err){
        console.log("error");
        res.status(500).json({
            message : err.message || "some error"
        })
    })
}

function findAllNotes(req,res){
    Student.find().then(function(data){
        res.json(data);
    }).catch(function(err){
        console.log("error");
        res.status(500).json({
            message : err.message || "some error"
        })
    })
}

function findNote(req,res){
    Student.findById(req.params.id).then(function(data){
        if(!data){
            return res.status(400).json({
                message: "Not Found This id"+req.params.id
            })
        }else{
            res.json(data);
        }
    }).catch(function(err){
        console.log("error");
        res.status(500).json({
            message : err.message || "some error"
        })
    })
}

function updateNote(req,res){
    const filter = {'fname' : req.body.fname};

    const NewData = {
        fname : req.body.fname,
        lname : req.body.lname,
        r_num : req.body.r_num,
    }
    
    Student.findOneAndUpdate(filter,NewData,{upsert:true}).then(function(data){
        return res.json(NewData)
    }).catch(function(err){
        console.log("error");
        res.status(500).json({
            message : err.message || "some error"
        })
    })
}


function deleteNote(req,res){
    Student.findByIdAndDelete(req.params.id).then(function(data){
        if(!data){
            return res.status(404).json({
                message: "not found is : "+ req.params.id
            })
        }
        res.json({
            message : "delete is "+req.params.id
        })
    })
}

module.exports= {
    createNote,
    findAllNotes,
    findNote,
    updateNote,
    deleteNote
}