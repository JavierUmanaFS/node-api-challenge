const express = require('express');

const db = require('../data/helpers/projectModel.js');

const router = express.Router();

router.get('/', (req, res) => {
  db.get()
  .then(data => {
    res.status(200).json(data)
  })
  .catch(() =>{
    res.status(500).json({ message: "Unable to retrieve information."})
  })
});

router.post('/', validateProject, (req, res) => {
  db.insert(req.body)
  .then(() => {
    res.status(201).json(req.body)
  })
  .catch(() =>{
    res.status(500).json({ message: "project could not be posted"})
  })
})

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const newInfo = req.body;

  db.get(id)
  .then(post =>{
    if(post) {
      db.update(id, newInfo)
      res.status(200).json({ message: "Successfully updated"})
    } else {
      res.status(400).json({ message: "Could not update information"})
    }
  })
  .catch(() => {
    res.status(500).json({ message: "Server could not save update"})
  })
})

router.delete('/:id', (req, res) => {
  const id = req.params.id;

  db.remove(id)
  .then(() => {
    res.status(200).json({ message: "Project has been successfully deleted."})
  })
  .catch(() =>{
    res.status(500).json({ message: "Project could not be deleted."})
  })
})

function validateProject(req, res, next){

  if(!req.body.name || !req.body.description){
     res.status(400).json({ message: 'Missing post information' })
  } else {
    next();
  }
}

module.exports = router;