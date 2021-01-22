const users = require('../models/users')();

module.exports = () => {
    const getController = async (req, res) =>{
        const {user,error} = await users.get();
        if(error){
            res.status(500).json({error,});
        }
        res.json(user);
    };

    const getEmail = async (req,res) => {
        const { user, error } = await users.get(req.params.email);
        if (error) {
            res.status(500).json({error,});
        }
        res.json(user);
    };
    
    const addController = async (req,res) => {
        console.log(req.body)
        let {usertype, name, email, phone, address, key } = req.body;
     

        const { result, error } = await users.add(usertype, name, email, phone, address, key );
        if (error) {
            res.status(500).json({error,});
        }
        res.json(result);
    }

    return{
        getController,
        getEmail,
        addController
    }
}