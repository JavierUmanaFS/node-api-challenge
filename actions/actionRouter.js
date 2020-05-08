const express = require('express');

const db = require('../data/helpers/actionModel.js');
const projectDb = require('../data/helpers/projectModel');

const router = express.Router();

router.get('/', (req, res) => {
  db.get()
  .then(data => {
    res.status(200).json(data)
  })
  .catch(() => {
    res.status(500).json({ message: "Unable to retrieve information."})
  })
})

router.get('/:id', (req, res) => {
  projectDb.getProjectActions(req.params.id)
  .then(data =>{ 
    res.status(200).json(data)
  })
  .catch(() =>{
    res.status(500).json({ message: 'Could not GET ID actions'})
  })
})

router.post('/:id', validateActionId, (req, res) => {
    db.insert(req.body)
    .then(newInfo =>{
      res.status(201).json(newInfo)
    })
    .catch(() => {
      console.log(req.body)
      res.status(500).json({ message: "Post could not be made" })
    })
  })

router.delete('/:id', (req, res) => {
  db.remove(req.params.id)
  .then(() => {
    res.status(200).json({ message: "Successfully deleted."})
  })
  .catch(() => {
    res.status(500).json({ message: "Unable to delete"})
  })
})

router.put('/:id', (req, res) =>{
  db.update(req.params.id, req.body)
  .then(action =>{ 
    res.status(200).json({ message: 'Success', action})
  })
  .catch(() => {
    res.status(500).json({ message: "There was an error while updating this action"})
  })
})



function validateActionId(req, res, next){
  db.get(req.params.id)
  .then(action => {
    if(action.project_id == req.params.id){
      next();
    } else {
      // console.log(action.project_id, req.params.id)
      res.status(400).json({ message: "Please provide project_id"})
    }
  })
  .catch(() =>{
    res.status(500).json({ message: "Could not validate action"})
  })
}

module.exports = router;