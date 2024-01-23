// Create web server

// Imports
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const Comment = require('./models/comment');

// Create web server
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/comments');
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB connection established successfully');
});

// Create routes
const router = express.Router();
router.route('/').get((req, res) => {
    Comment.find((err, comments) => {
        if (err) {
            console.log(err);
        } else {
            res.json(comments);
        }
    });
});

router.route('/add').post((req,
