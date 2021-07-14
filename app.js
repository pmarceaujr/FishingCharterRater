const express = require('express');
const app = express();



app.get('/', (req, res) => {
    res.send("Hello from Charter-Rater!")
});


app.listen(3060, () => {
    console.log('Serving on port 3060')
})