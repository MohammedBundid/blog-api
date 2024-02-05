require("dotenv").config()
const express = require("express");
const logger = require("morgan");
const blogRoutes = require('./routes/blogRoutes')
const cors = require('cors');
const mongoose = require("mongoose");
const parser = require('body-parser')

const app = express();
const PORT = process.env.PORT || 4000

app.use(express.json())
app.use(logger('dev'));
app.use(cors({
    origin: 'https://mohbundid.onrender.com'
}))

app.use('/api/blog', blogRoutes)

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)

    } catch (error) {
        console.error(error)
    }
}

mongoose.connection.once("open", () => {
    console.log('connected to db');

    app.listen(PORT,  (req, res) => {
        console.log('app listening on port' , PORT)
    })
})

connectDb()

