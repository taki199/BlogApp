const express = require('express');
const router = express.Router();
const { readUserData, AddData } = require('../Models/post'); // Importing named exports separately

const Controller =require('../Controllers/postController')

//get all  Blog Posts:
router.get("/posts", Controller.getAllPosts)
//get Blog Post by Id:

router.get('/posts/:id', Controller.getPostById)
//Create a new Blog post :
router.post("/posts", Controller.createNewPost)

//update Blog Post:
router.put('/posts/:id', Controller.updatePostById);
//Delete  Blog Post:
router.delete('/posts/:id',Controller.deletePostById);

module.exports = router;
