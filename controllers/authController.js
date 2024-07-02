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
    if (sessions[code]) {
        res.json({ valid: true });
    } else {
        res.json({ valid: false });
    }
}

module.exports.authenticate = async (req, res) => {
    const { code, nfcData } = req.body;
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