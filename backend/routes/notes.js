const express = require('express');
const router = express.Router();
var fetchuser = require('../middleware/fetchuser');
const notes = require('../models/notes');
const { body, validationResult } = require('express-validator');

//Route 1 : Fetch all notes of user :  GET : /api/notes/fetchallnotes : It is use to create a user
router.get('/fetchallnotes',fetchuser, async (req, res) => {
    
    const fetchNotes = await notes.find({user : req.user.id});
    res.json(fetchNotes);
})

//route 2 : Add new note using POST : /api/notes/addnote
router.post('/addnote',fetchuser,[
    body('title','Enter a valid Title of minimum length : 3').isLength({ min: 3 }),
    body('description','Enter a Description of minimum length : 5').isLength({ min: 5 })
], async (req, res) => {
    try 
    {
        const errors = validationResult(req);
        //if error comes from validation then send error and fail request
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }
        
        //this is called destructuring
        const {title, description, tag} = req.body;

        const note = new notes({
            title, description, tag, user : req.user.id
        })

        const savedNoteId = await note.save();
        res.json(savedNoteId);
        
    } catch(error)
    {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
    
})

//route 3 : update note using PUT : /api/notes/updatenote
router.put('/updatenote/:id',fetchuser, async (req, res) => {

    try {
        const {title, description, tag} = req.body;
        const updatedNote = {};
        if(title){updatedNote.title = title};
        if(description){updatedNote.description = description};
        if(tag){updatedNote.tag = tag};

        let note = await notes.findById(req.params.id);

        if(!note)
        {
        return res.status(404).send("Not Found");
        }

        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed");
        }

        note = await notes.findByIdAndUpdate(req.params.id,{$set : updatedNote}, {new : true})
        res.json({note});
    } 
    catch(error)
    {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
    

})

//route 4 : update note using Delete : /api/notes/deletenote
router.delete('/deletenote/:id',fetchuser, async (req, res) => {

    try {
        //fetch the note which has to be deleted
        let note = await notes.findById(req.params.id);

        //checking if notes exist or not
        if(!note)
        {
        return res.status(404).send("Not Found");
        }

        //comparing if user deleting notes is of himself only
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed");
        }

        note = await notes.findByIdAndDelete(req.params.id);
        res.json({"Success" : "Note has been deleted",note : note});

    }
    catch(error)
    {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
    
})
module.exports = router