const db = require('../models');
const User = db.User;

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getUserByID = async (req, res) => {
  try {
    const idUser = req.params.idUser;
    const users = await User.findOne({id:idUser });
    if(users)
    res.json(users);
    else res.status(404).send("user non trouvée")
  } catch (error) {
    res.status(500).send(error.message);
  }
}
