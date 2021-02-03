const items = require('../models/items')();

module.exports = () => {
    const getController = async (req, res) =>{
        const { item , error } = await items.get();

        if (error) {
            res.status(500).json({error,});
        }
        res.json(item);
        
    };

    const getItem = async (req,res) => {
        const { item, error } = await items.get(req.params.item);
        if (error) {
            res.status(500).json({error,});
        }
        res.json(item);
    };
    
    const addController = async (req,res) => {
        let {itemtype, item, cost} = req.body;
        
        const { result, error } = await items.add(itemtype, item, cost);
        if (error) {
            res.status(500).json({error,});
        }
        
        res.json(result);
    }

    return{
        getController,
        getItem,
        addController
    }
}