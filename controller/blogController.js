const blogPost = require("../model/blogModel")
const mongoose = require("mongoose")

const getAll = async (req, res) => {
    try {
        const blogPosts = await blogPost.find({}).sort({ createdAt: -1});
        res.status(200).json(blogPosts);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}
const singleBlog = async (req, res) => {
    try {
        const{id} = req.params

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error: "no such blog"})
        }

        const blog = await blogPost.findById(id)

        if(!blog){
            return res.status(404).json({error: "no such blog"})
        }

        res.status(200).json(blog)
      } catch (error) {
        // Handle any errors that might occur during the database query
        console.error('Error fetching blog post:', error);
        throw error; // You can handle the error based on your application's needs
      }
}

const create = async (req, res) => {
    const { title, body } = req.body;

    try {
        // Create a new blog post
        const newBlogPost = new blogPost({
            title,
            body
        });

        // Save the blog post to the database
        const savedBlogPost = await newBlogPost.save();

        console.log('Blog post created:', savedBlogPost);
        res.status(201).json(savedBlogPost);
    } catch (error) {
        console.error('Error creating blog post:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const updateBlog = () => {

}

const deleteBlog = () => {

}

module.exports = {
    getAll,
    singleBlog,
    create,
    updateBlog,
    deleteBlog
}