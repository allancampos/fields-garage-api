const db = require('../db')();
const collection = 'items';

module.exports = () => {
    
    const get = async (item = null) => {
        try{
            if(!item){

                const itemName  = await db.get(collection);
    
                return {itemName};
            }
    
            const itemName = await db.get(collection, {item});
            return {itemName};
        }catch(err){
            return {
                error: err,
            };
        }
    }

    const add = async (itemtype, item, cost) => {
        if(!itemtype || !item || !cost) {
            return {
                error: 'fill in all fields',
            };
        }
        try{
            const itemName = await db.get(COLLECTION, {
                item: item,
            });
            if (itemName.length > 0) {
                return {
                    result: 'This item exists',
                };
            }
            const result = await db.add(collection, { itemtype : itemtype, item: item, cost: cost });
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