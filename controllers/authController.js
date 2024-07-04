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
            res.json({ authenticated: true });
        } else {
            res.json({ authenticated: false });
        }
    } else {
        res.status(404).send('Session non trouvée');
    }
}

const validateNfcData = (nfcData) => {
    const decoded = jwt.decode(nfcData);

    console.log('Decoded JWT:', decoded);


    return true
}

module.exports.checkSession = async (req, res) => {
    const code = req.params.code;
    if (sessions[code]) {
        res.json({ authenticated: sessions[code].authenticated });
    } else {
        res.status(404).send('Session non trouvée');
    }
}

module.exports.closeSession = async (req, res) => {
    const { code } = req.body;
    delete(sessions[code])
    res.json({ deleted : true });
}

module.exports.validateSansCode = async (req, res) => {
    try {
        const token = req.params.token;
        const decoded = jwt.decode(token);
        // console.log(decoded);

        const user = await db.User.findOne({where : {email : decoded.email}})

        // console.log(user);

        if (user) {
            // console.log(user.dataValues.id_utilisateurs);
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