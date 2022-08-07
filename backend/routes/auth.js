const express = require('express');
const user1 = require('../models/user');
const router = express.Router();
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const JWT_SESSION = "anshikaagrawal2@";

//Create a user using POST : /api/auth/createUser : It is use to create a user
//api uri,validations, sending request
//Adding bcrypt js to add hashing into password
router.post('/createUser',[
    body('name','Enter a valid name of minimum length : 3').isLength({ min: 3 }),
    body('email', 'Enter a valid email address').isEmail(),
    body('password','Enter a valid password of minimum length : 5').isLength({ min: 5 })
], async (req, res) => {
    //doing validation as mentioned above on the req
    const errors = validationResult(req);
    //if error comes from validation then send error and fail request
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try
    {
        //creating hashed password using bcrypt 
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password,salt);
        //Checking in db using findone that email with this email passed in body exists or not
        let user = await user1.findOne({email: req.body.email});
        //if exist return error
        if(user)
        {
            return res.status(400).json({error : 'User with this email address already exist'});
        }
            //else create a user in db
            user = await user1.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email
        })
        //coming in response
        //we create a token using jwt authentication and return token to user
        //we sign using unique id 
        const data = {
                user : {
                    id : user.id
                }
        }

        var authToken = jwt.sign(data, JWT_SESSION);
        res.json(authToken);
    }
    catch(error)
    {
        console.log(error.message);
        res.status(500).json({error : 'Internal Server Error'});
    }
    
    
})

module.exports = router