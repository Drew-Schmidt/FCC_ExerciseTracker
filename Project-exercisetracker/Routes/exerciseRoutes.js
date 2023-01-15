const router = require('express').Router();
const exercise = require('../Models/Exercises');
const User = require('../Models/Users');

router.route('/:_id/logs').get((req,res)=>{

  const _id = req.params._id
  let from = !req.query.from ? 0 : Date.parse(req.query.from);
  let to = !req.query.to ? Date.now(): Date.parse(req.query.to);
  let limit = req.query.limit;  
      
  User.findById(_id)
      .then(userResult => {
        
    exercise.find({userId: _id})
      .where('parsedDate').gt(from).lt(to)
      .limit(limit)
      .then(log => res.json({ 
            
        _id: _id,
        username: userResult.username,
        count: log.length,
        log: log.map((logMap) => ({
        description: logMap.description,
        duration: logMap.duration,
        date: logMap.date.toDateString(),
                             
        }))
      })) 
    })  
    .catch(err => res.json('Error: ' + err))
});

router.route('/:_id/exercises').post((req,res)=>{

  let _id = req.params._id
  let date = Date.parse(req.body.date);
  let duration = Number(req.body.duration);
  let description = req.body.description;

  if (!date){date = new Date()}
  
  const newExercise = new exercise({

        userId: _id,
        date: date,
        parsedDate: date,
        duration: duration,
        description: description,
      
  });

  User.findById(_id, (err, users) => {

    newExercise.save()
      .then(ex => res.json({
               
        _id: users._id,
        username: users.username,
        date: newExercise.date.toDateString(),
        duration: newExercise.duration,
        description:newExercise.description, 
                     
      }))
      .catch( err => res.json('Error: ' + err))
  })
});  
module.exports = router