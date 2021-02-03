//Using express - Libraries  
const express = require('express');
const app = (module.exports = express());
const bp = require('body-parser');
const users = require('./controllers/users')();
//const usersModel = require('./models/users')();
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
app.get('/users', users.getController); // get all users
app.get('/users/:email', users.getEmail); // get user by email
app.post('/users', users.addController);
app.post('/users/staff', users.getStaff); // add user

//Routes for Bookings
app.get('/bookings', bookings.getController); // get all bookings
app.get('/bookings/:licensenumber', bookings.getBooking); // get booking by license number
app.post('/bookings', bookings.addController); // add booking
app.post('/bookings/updateStatus', bookings.updateStatus); // update booking status


// Routes for Items
app.get('/items', items.getController); // get all items
app.get('/items/:item', items.getItem); // get item buy item name
app.post('/items', items.addController);// add item


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