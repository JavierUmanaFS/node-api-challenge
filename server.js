const express = require('express');

const server = express();

const projectRouter = require('./projects/projectRouter.js'); 
// const router

server.use(express.json());
// server.use(cors());

server.get('/', (req, res) => {
  res.send(`<h2>Sprint challenge api working </h2>`);
});

server.use('/api/projects', logger, projectRouter);

// Logger middleware

function logger(req, res, next){
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} sent? ${req.body}`
  )
  next();
}

module.exports = server;