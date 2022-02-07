const express = require("express");
const mongoose = require('mongoose');
const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const messageRoutes = require('./routes/message');
const articleRoutes = require('./routes/article');
const { serve } = require("swagger-ui-express");
const authArticle = require('./routes/authArticle');
const cookieParser = require('cookie-parser');


const dbURI = 'mongodb+srv://Yannick_23:<Yannick23>@cluster0.gjlhj.mongodb.net/node_auth';
mongoose.connect("mongodb://localhost:27017/acmedb", { useNewUrlParser: true })
.then(() => {
    console.log('Successfully connected to Mongoose !');
})
.catch((error) => {
    console.log('Unable to connect to Mongoose !');
    console.error(error);
})



const options = {
    definition: {
        openapi: "3.0.0",
    },
    info: {
        title: "Message API",
        version: "1.0.0",
        description: "A simple express message API"
    },
    servers: [
        {
            url:"http:localhost:8000/"
        }
    ],
    apis: ["./routes/*.js"]
}
const specs = swaggerJsDoc(options)

const app = express()
app.use(express.json());
app.use('/api/message',messageRoutes);
app.use('/api/post',articleRoutes);
app.use(cookieParser());


app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs))
app.use('/api/authArticle', authArticle);

//cookies
app.get('/api/set-cookies', (req, res) => {
    
    // res.setHeader('set-Cookie', 'newUser=false');

    res.cookie('newUser', false);
    res.cookie('isEmployee', true, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });

    res.send('you got the cookies!')

});

app.get('/api/read-cookies', (req, res) => {

    const cookies = req.cookies;
    console.log(cookies.newUser);

    res.json(cookies);

})


module.exports = app;