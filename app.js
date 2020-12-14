const { request, response } = require('express');
const express = require('express');
const app = express();
var cors = require('cors')
const mongoose = require('mongoose');

//Rotas
const knights = require('./Routes/Knights/knights.route')

const port = process.env.PORT || 3000;

app.use(cors())
app.use(express.json());
app.use('/knights', knights)

app.use((error, request, response, next) => {
    response.status(error.status || 500).send({message: error.message});
})


mongoose
    .connect('mongodb://localhost:27017/Knights', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        app.listen(port, () => console.log('Listening server'));
    })
    .catch(console.error)
