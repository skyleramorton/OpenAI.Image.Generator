const path = require('path');
const express = require('express');
const dotenv = require('dotenv').config();
const port = 1337;

const app = express();

//enable body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//set static folder
app.use(express.static(path.join(__dirname, '../frontend/public')));

app.use('/openai', require('./routes/openaiRoutes.js'));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
