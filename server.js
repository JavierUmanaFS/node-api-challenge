const express = require('express');

const server = express();

// const router 
// const router

server.use(express.json());
// server.use(cors());

server.get('/', (req, res) => {
  res.send(`<h2>Sprint challenge api working </h2>`);
});



// Logger middleware

function logger(req, res, next){
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} sent? ${req.body}`
  )
  next();
}