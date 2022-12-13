
const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();

const app = express()
const cervezas = require('./routes/cervezas')
const users = require('./routes/users')
const computer = require('./routes/computer');

const login=require('./routes/login');

// DATABASE CONNECTION
async function connectAtlas(){
    await dbConnection()
}
connectAtlas()
//MIDDLEWARE
app.use(express.json())

//ROUTES
app.use('/computers', computer)
app.use('/cervezas', cervezas)
app.use('/users', users)
app.use('/auth/login', login)


app.listen(process.env.PORT)