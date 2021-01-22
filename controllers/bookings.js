const bookings = require('../models/bookings')();

module.exports = () => {
    const getController = async (req, res) =>{
        const { booking , error } = await bookings.get();

        if (error) {
            res.status(500).json({error,});
        }
        res.json(booking);
        
    };

    const getBooking = async (req,res) => {
        const { booking, error } = await bookings.get(req.params.licensenumber);
        if (error) {
            res.status(500).json({error,});
        }
        res.json(booking);
    };
    
    const addController = async (req,res) => {
        let {status, mechanic, iduser, service, vehiclemake, vehiclemodel, enginetype,licensenumber, date, comments} = req.body;
        
        const { result, error } = await bookings.add(status, mechanic, iduser, service, vehiclemake, vehiclemodel, enginetype,licensenumber, date, comments);
        if (error) {
            res.status(500).json({error,});
        }
        
        res.json(result);
    }

    return{
        getController,
        getBooking,
        addController
    }
}