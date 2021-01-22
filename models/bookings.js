const db = require('../db')();
const ObjectID = require('mongodb').ObjectID;
const collection = 'bookings';

module.exports = () => {
    
    const get = async (licensenumber = null) => {
        try{
            if(!licensenumber){

                const bookings  = await db.get(collection);
    
                return {bookings };
            }
    
            const bookings = await db.get(collection, {licensenumber});
            return {bookings};
        }catch(err){
            return {
                error: err,
            };
        }
    }

    const add = async (status, mechanic, iduser, service, vehiclemake, vehiclemodel, enginetype,licensenumber, date, comments) => {
        if(!status || !mechanic || !iduser || !service || !vehiclemake || !vehiclemodel || !enginetype || !licensenumber || !date || !comments) {
            return {
                error: 'fill in all fields',
            };
        }
        try{
            const lincese = await db.get(COLLECTION, {
                licensenumber: licensenumber,
            });
            if (license.length > 0) {
                return {
                    result: 'This booking exists',
                };
            }
            const result = await db.add(collection, { status : status, mechanic: mechanic, iduser: iduser, service: service,
            vehiclemake: vehiclemake, vehiclemodel: vehiclemodel, enginetype: enginetype, licensenumber: licensenumber, date: date, comments: comments });
            return {result};
        }catch(err){
            return{
                error: err,
            }
        }
    }

    return{
        get,
        add
    }
}