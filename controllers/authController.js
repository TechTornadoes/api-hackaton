const jwt = require('jsonwebtoken');

const db = require('../models');
const sessions = {};

module.exports.createSession = async (req, res) =>{
    const code = generateUniqueCode();
    sessions[code] = { authenticated: false };
    res.json({ code });
}

const generateUniqueCode = () => {
    return Math.random().toString(36).slice(2, 11);
}

module.exports.validateCode = async (req, res) => {
    const { code } = req.body;
    console.log(code);
    if (sessions[code]) {
        res.json({ valid: true });
        console.log('true');
    } else {
        res.json({ valid: false });
        console.log('false');
    }
}

module.exports.authenticate = async (req, res) => {
    const { code, nfcData } = req.body;
    console.log(nfcData);
    console.log(code);
    if (sessions[code]) {
        // Valider les données NFC
        if (validateNfcData(nfcData)) {
            sessions[code].authenticated = true;
            sessions[code].token = nfcData
            res.json({ authenticated: true });
        } else {
            res.json({ authenticated: false });
        }
    } else {
        res.status(404).send('Session non trouvée');
    }
}

const validateNfcData = async (nfcData) => {
    const decoded = jwt.decode(nfcData);

    if(decoded != null){
      const user = await db.User.findOne({ where: { email: decoded.email }});
      if(user != null ){
        return true
      }else {
        return false
      }
    }
}

module.exports.checkSession = async (req, res) => {
    const code = req.params.code;
    if (sessions[code]) {
        if (sessions[code].authenticated) {
            const decoded = jwt.decode(sessions[code].token);
            
            const user = await db.User.findOne({where : {email : decoded.email}})
            const newToken = jwt.sign({user: user.dataValues.id_utilisateurs}, process.env.SECRET_KEY, {expiresIn : '3h'})
            res.json({ authenticated: sessions[code].authenticated, token : newToken});
        }else{
            res.json({ authenticated: sessions[code].authenticated});
        }
        
    } else {
        res.status(404).send('Session non trouvée');
    }
}

module.exports.closeSession = async (req, res) => {
    const { code } = req.body;
    delete(sessions[code])
    res.json({ deleted : true });
}

module.exports.generateTokenTemp = async (req, res) => {
    try {
        // console.log(req.body.nfcData);
        const token = req.body.nfcData;

        const decoded = jwt.decode(token);
        // console.log(decoded);

        const user = await db.User.findOne({where : {email : decoded.email}})
        // console.log(user);
        if (user) {
            // console.log(user.dataValues.id_utilisateurs);
            const newToken = jwt.sign({user: user.dataValues.id_utilisateurs}, process.env.SECRET_KEY, {expiresIn : '3h'})
            // console.log(newToken);
            return res.json({authenticated : true, token: newToken})
        }else{
            return res.status(400).json({error : "token invalide"})
        }
    } catch (error) {
        return res.status(400).json({error})
    }
}

module.exports.validateSansCode = async (req, res) => {
    try {
        const token = req.params.token;
        const decoded = jwt.decode(token);
        console.log(decoded);

        const user = await db.User.findOne({where : {id_utilisateurs : decoded.user}})

        console.log(user);

        console.log("efsdrg");

        if (user) {
            console.log("efsdrg");
            const newToken = jwt.sign({user: user.dataValues.id_utilisateurs}, process.env.SECRET_KEY, {expiresIn : '3h'})
            console.log(newToken);
            return res.json({newToken})
        }else{
            return res.status(400).json({error : "token invalide"})
        }
    } catch (error) {
        return res.status(400).json({error})
    }

}