const mongoose = require('mongoose');
const Charter = require('../models/charter')
const cities = require('./fishingCities')
const { places, descriptors } = require('./names')


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

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Charter.deleteMany({});
    for (let i = 0; i < 100; i++) {
        const random37 = Math.floor(Math.random() * 37)
        const price = Math.floor(Math.random() * 600 + 25)
        const charter = new Charter({
            location: `${cities[random37].city}, ${cities[random37].state}`,
            name: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/483251',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae sit quaerat amet corrupti saepe fugiat cum ab laboriosam rem repudiandae consequuntur quibusdam praesentium dolorum, provident eaque doloremque quos officia tenetur.',
            price: price
        })
        console.log(`${sample(descriptors)} ${sample(places)}`)
        await charter.save();
    }
    //const c = new Charter({ name: 'Purple Test' })

}

seedDB().then(() => {
    mongoose.connection.close()
})


console.log("DB Seeded")