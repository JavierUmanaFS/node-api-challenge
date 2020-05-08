const express = require('express');

const server = express();

const cors = require('cors');

const projectRouter = require('./projects/projectRouter.js'); 
const actionRouter = require('./actions/actionRouter.js');

server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
  res.send(`<h2>Sprint challenge api working </h2>`);
});

server.use('/api/projects', logger, projectRouter);
server.use('/api/actions', logger, actionRouter);

// Logger middleware

function logger(req, res, next){
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} sent? ${req.body}`
  )
  next();
}

module.exports = server;