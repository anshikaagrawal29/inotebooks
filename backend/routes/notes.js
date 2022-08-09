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
router.get('/addnote',fetchuser,[
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

module.exports = router