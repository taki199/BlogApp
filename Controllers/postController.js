const { readUserData, AddData } = require('../Models/post'); // Importing named exports separately

module.exports = {
    getAllPosts: (req, res) => {
        const userData = readUserData("./Models/Blog.json");
        res.json(userData.blog_posts);
    },
    getPostById: (req, res) => {
        const result = req.params.id;
        console.log(`This is your requested ID: ${result}`);
        const foundPost = readUserData("./Models/Blog.json").blog_posts.find((post) => post.id == result);
        if (foundPost) {
            res.status(200).json(foundPost);
        } else {
            res.status(400).json({ error: "No Post Found With That Id" });
        }
    },
    createNewPost: (req, res) => {
        // Read the existing data from the file
  let existingData = readUserData("./Models/Blog.json");

  // Parse the existing data to get the array of posts
  let existingPosts = existingData.blog_posts;

  // Create a new post with the provided data
  const newPost = {
    id: existingPosts.length + 1, // Increment the ID based on the length of existing posts
    ...req.body // Use the request body to create the new post
  };

  // Add the new post to the array of posts
  existingPosts.push(newPost);

  // Update the data object with the updated array of posts
  existingData.blog_posts = existingPosts;

  // Write the updated data back to the file
  AddData(existingData, "./Models/Blog.json");

  // Send a response with the newly created post
  res.status(201).send(newPost);
    },
    updatePostById: (req, res) => {
        const result = req.params.id;
        const updatedPost = req.body;
        const blogPosts = readUserData('./Models/Blog.json').blog_posts;
        const index = blogPosts.findIndex(p => p.id == result);
        if (index === -1) {
            return res.status(404).json({ error: "Post Not found" });
        }
        // Update the post with the provided ID
        blogPosts[index] = { ...blogPosts[index], ...updatedPost };
    
        // Write the updated data back to the file
        const updatedData = readUserData('./Models/Blog.json');
        updatedData.blog_posts = blogPosts;
        AddData(updatedData, './Models/Blog.json');
    
        res.status(200).json(blogPosts[index]);
    },
    deletePostById: (req, res) => {
        const id = +req.params.id; // Convert ID parameter to number
        const blogPosts = readUserData("./Models/Blog.json").blog_posts;
        const postIndex = blogPosts.findIndex(post => post.id === id); // Find index of post with specified ID
        if (postIndex !== -1) {
            blogPosts.splice(postIndex, 1); // Remove post from array
            const updatedData = { blog_posts: blogPosts }; // Prepare updated data object
            AddData(updatedData, './Models/Blog.json'); // Write updated data to file
            res.status(200).json(blogPosts); // Send updated list of posts in response
        } else {
            return res.status(404).json({ error: "Post not found!" });
        }
    }
    
    
}

