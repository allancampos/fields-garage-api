const db = require('../db')();
const ObjectID = require('mongodb').ObjectID;
const collection = 'bookings';

module.exports = () => {
    
    const get = async (licensenumber = null) => {
        try{
            if(!licensenumber){

                const booking  = await db.get(collection);
    
                return {booking};
            }
    
            const booking = await db.get(collection, {licensenumber});
            return {booking};
        }catch(err){
            return {
                error: err,
            };
        }
    }

    const add = async (status = 'booked', mechanic = 'Patrick', iduser = 'TODO log user', service, vehiclemake, vehiclemodel, enginetype,licensenumber, date, comments) => {
        if(!status || !mechanic || !iduser || !service || !vehiclemake || !vehiclemodel || !enginetype || !licensenumber || !date || !comments) {
            return {
                error: 'fill in all fields',
            };
        }
        try{
            const license = await db.get(collection, {
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

    const status = async (_id, status) => {
        if(!_id || !status) {
            return {
                error: 'fill in all fields',
            };
        }
        
        const pipeline = [
            { _id },
            { $set: { status } },
        ];
        try {
            const results = await db.update(collection, pipeline);
            return {results};
        } catch (err) {
            return {
                error: err,
            };
        }
    };

    return{
        get,
        add,
        status
    }
}