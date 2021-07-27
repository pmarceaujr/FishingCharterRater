const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require("method-override")
const morgan = require("morgan")
const Charter = require('./models/charter')
const ejsMate = require('ejs-mate')


//create connect string for the mongoDB
// useNewUrlParser to allow users to fall back to the old parser if a bug in the new parser. 
//You should set useNewUrlParser: true unless that prevents you from connecting.
//Note that if you specify useNewUrlParser: true, you must specify a port in your connection string, like mongodb://localhost:27017/dbname
//useCreateIndex False by default. Set true to make Mongoose's default index build use createIndex() instead of ensureIndex() to avoid deprecation warnings from the MongoDB driver.
//useUnifiedTopology:False by default. Set true to opt in to using the MongoDB driver's new connection management engine. You should set this option to true, except for the unlikely case that it prevents you from maintaining a stable connection.
mongoose.connect('mongodb://localhost:27017/CharterRaterDB', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

//create a variable db and pass it the connection
//use call backs to check if the connection was successful
// when the connection is open without any errors then the callback function in the db.once is executed
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"))
db.once("open", () => {
    console.log("Connected to database.")
})

// Create a new Express Instance and call it app
const app = express();

//app.use tells express to use the code, function or whatever, on every request
app.use(express.urlencoded({ extended: true }))
app.use(morgan('tiny'))
app.use(methodOverride('_method'))


//Establish the connection to the views directory and tell the EJS engine to use (.ejs) files
//Then set the path to the view directory
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
    // res.send("Hello from Charter-Rater!")
    res.render('home');
});

app.get('/charters', async (req, res) => {
    const charters = await Charter.find({})
    res.render('charters/index', { charters })
})

app.get('/charters/new', (req, res) => {
    // res.send("Hello from Charter-Rater!")
    res.render('charters/newcharter');
});

app.post('/charters', async (req, res) => {
    // const charters = await Charter.find({})
    const charter = new Charter(req.body.charter)
    await charter.save()
    res.redirect(`charters/${charter._id}`)
})


app.get('/charters/:id', async (req, res) => {
    const charter = await Charter.findById(req.params.id)
    res.render('charters/showcharter', { charter })
})

app.get('/charters/:id/edit', async (req, res) => {
    const charter = await Charter.findById(req.params.id)
    res.render('charters/editcharter', { charter })
})

app.put('/charters/:id', async (req, res) => {
    // const charters = await Charter.find({})
    const { id } = req.params;
    const charter = await Charter.findByIdAndUpdate(id, { ...req.body.charter })
    //const charter = await Charter.findById(req.params.id)
    //await charter.save()
    res.redirect(`/charters/${charter._id}`)
})


app.delete('/charters/:id', async (req, res) => {
    const { id } = req.params;
    const charter = await Charter.findByIdAndDelete(id)
    res.redirect(`/charters/`)
})



app.listen(3060, () => {
    console.log('Serving on port 3060')
})