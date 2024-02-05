const express = require("express");
const route = express.Router()
const blogController = require('../controller/blogController')

route.get('/all', blogController.getAll)
route.get('/:id', blogController.singleBlog)
route.post('/create', blogController.create)
route.put('/update', blogController.updateBlog)
route.delete('/delete', blogController.deleteBlog)

module.exports = route