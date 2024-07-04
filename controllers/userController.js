const db = require('../models');

module.exports.getUser = async (req, res) => {
  const id = req.userId
  console.log(id);
    try {
      
        const user = await db.User.findOne({where : {id_utilisateurs : id}})
        res.json({user})
    } catch (error) {
        res.status(400).json({error})
    }
};