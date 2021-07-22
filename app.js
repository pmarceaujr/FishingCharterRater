const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const Charter = require('./models/charter')

//create connect string for the mongoDB
mongoose.connect('mongodb://localhost:27017/CharterRaterDB', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"))
db.once("open", () => {
    console.log("Connected to database.")
})



const app = express();


//Establish the connection to the views directory and tell the EJS engine to use (.ejs) files
//Then set the path to the view directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))


app.get('/', (req, res) => {
    // res.send("Hello from Charter-Rater!")
    res.render('home');
});

app.get('/makecharter', async (req, res) => {
    const camp = new Charter({ name: "Ronnie's on the Lake", description: "Free fishing for me!" })
    await camp.save();
    res.send(camp)
})

app.listen(3060, () => {
    console.log('Serving on port 3060')
})