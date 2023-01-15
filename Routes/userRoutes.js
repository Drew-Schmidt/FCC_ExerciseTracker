const router = require('express').Router();
let User = require('../Models/Users');
 
router.route('/')
  .get((req, res)=>{
    User.find({}, 'username _id')
        .then(User => res.json(User))
        .catch(err => res.status(400).json('Error: ' + err))
    
  })
  
  .post(function (req, res) {
    
    const nameInput = req.body.username;
    const newUser = new User({username: nameInput});
    
    newUser.save()
           .then(() => res.json(newUser))
           .catch( err => res.status(400).json('Error: ' + err))
  });
  
module.exports = router