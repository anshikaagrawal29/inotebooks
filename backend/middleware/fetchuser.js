var jwt = require('jsonwebtoken');
const JWT_SESSION = "anshikaagrawal2@";

//when we write next so next part will run, it mean that route function will run
const fetchuser = (req, res, next) =>
{   
    //get the user from the jwt token and add id to request object
    const token = req.header('auth-token');
    if(!token)
    {
        res.status(401).send({error : "Access Denied!!"})
    }
   try 
   {
        const data = jwt.verify(token, JWT_SESSION);
        //this user we have set it in the auth.js route 1 and 2
        //same we are appending it in request
        req.user = data.user;
        next();
   } 
   catch (error) {
    res.status(401).send({error : "Access Denied!!"})
   }
}

module.exports = fetchuser;