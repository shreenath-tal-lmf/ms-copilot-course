// create web server 

// require express module
const express = require('express');
const app = express();

// require body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// require mongoose
const mongoose = require('mongoose');
const Comment = require('./models/Comment');

// connect to database
mongoose.connect('mongodb://localhost/comments');

// create a new comment
app.post('/comments', (req, res) => {
  console.log(req.body);
  Comment.create(req.body, (err, comment) => {
    console.log(err, comment);
    res.json(comment);
  });
});

// get all comments
app.get('/comments', (req, res) => {
  Comment.find({}, (err, comments) => {
    res.json(comments);
  });
});

// get a single comment
app.get('/comments/:id', (req, res) => {
  Comment.findById(req.params.id, (err, comment) => {
    res.json(comment);
  });
});

// update a comment
app.put('/comments/:id', (req, res) => {
  Comment.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, comment) => {
    res.json(comment);
  });
});

// delete a comment
app.delete('/comments/:id', (req, res) => {
  Comment.findByIdAndRemove(req.params.id, (err, comment) => {
    res.json(comment);
  });
});

// start server
app.listen(3000, () => {
  console.log('Comments server listening on port 3000');
});