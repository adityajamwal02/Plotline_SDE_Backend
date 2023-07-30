// Main startpoint of application

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json())

require("./config/mongoose.js")(app);
require('./app/routerHandler.js')(app)

app.get('/', (req, res) => {
    res.json({
        message: 'Hi! Aditya Jamwal (SDE Backend)'
    });
});

// Open localhost:4000 on Postman to check the entries and test cases of Users, Products and Cart (with Tax including)

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Application is running on ${port}`);
});