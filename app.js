//Using express - Libraries  
const express = require('express');
const app = (module.exports = express());
const bp = require('body-parser');
const users = require('./controllers/users')();
const usersModel = require('./models/users')();
const bookings = require('./controllers/bookings')();
const items = require('./controllers/items')();
const cors = require('cors');

//define hostname and port
const hostname = '0.0.0.0';
const port = process.env.PORT || 3001;

// Authentication
app.use(bp.json());

//Allow acess
app.use(cors());

//Routes
app.get('/',(req,res) => {
    res.statusCode = 200;
    res.setHeader('Content-type','text/plain');
    res.end('Hello World');
})

// Routes for Users
app.get('/users', users.getController);
app.get('/users/:email', users.getEmail);
app.post('/users', users.addController);

//Routes for Bookings
app.get('/bookings', bookings.getController);
app.get('/bookings/:licensenumber', bookings.getBooking);
app.post('/bookings', bookings.addController);
app.post('/bookings/updateStatus', bookings.updateStatus);


// Routes for Items
app.get('/items', items.getController);
app.get('/items/:item', items.getItem);
app.post('/items', items.addController);


// Error
app.use((req,res) => {
    res.status(404).json({
        error: 404,
        message: 'Route not found '
    });
})

//listen
app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}`);
})