const db = require('../db')();
const collection = 'users';
const bcrypt = require('bcrypt');
const salt = 10;

module.exports = () => {
    // get user
    const get = async (email = null) => {
        
        try{
            if(!email){

                const user = await db.get(collection);

                return {user};
            }

            const user = await db.get(collection, {email: email});
            return { user };

        }catch(err){
            console.log(err);
            return {
                error: err,
            };
        }
    };
    
    const add = async (usertype, name, email, phone , address, key) => {


        if(!usertype || !name || !email || !phone || !address || !key) {
            return {
                error: 'fill in all fields',
            };
        }

        

        try{
            const user = await db.get(collection, { email, });

            if(user.length > 0) {
                return {
                    results: 'This User exists',
                };
            }
            const hashedKey = bcrypt.hashSync(key, salt);
            const result = await db.add(collection, { usertype, name  , email , phone, address, key: hashedKey  });
            return {result};
        }catch(err){
            console.log(err);
            return {
                error: err,
            };
        }
    }
    // get key
    const getKey = async (key,email) => {
        if (!key || !email) {
            return {
                error: 'Missing key or email',
            };
        }
        try{
            const users = await db.get(collection, {email: email});
            const check = bcrypt.compareSync(supliedkey, users[0].key);
            if (!check) {
                return {
                    error: 'ERROR password',
                };
            }

            return users[0];
        }catch(err){
            console.log(err);
            return {
                error: err,
            };
        }
    }
    return{
        get,
        add,
        getKey
    }
}