const express = require('express');
const connectDb = require('./config/dbConnection');

const app = express();
const dotenv = require('dotenv').config()


const port = process.env.PORT || 4200

connectDb()
app.use(express.json())
app.use('/api/properties', require('./Routes/propertyRoute'))
app.use('/api/users', require('./Routes/userRoutes'))
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})