const { jwtDecode } = require('jwt-decode');
const jwt = require('jsonwebtoken');
const db = require('../models');
var _ = require('lodash');
const Session = db.Sessions;
const sessions = {};

module.exports.createSession = async (req, res) =>{
    const code = generateUniqueCode();
    req.session.regenerate(function (err) {
        if (err) next(err);
        req.session.uniqueCode = code;
        req.session.authenticated= false;

        req.session.save(function (err) {
            if (err) return next(err);
        console.log(req.sessionID)
          })
          req.session.reload((err)=>{
            console.log(err)
          });
});
    const session = await Session.create({idSession :req.sessionID,code:code });

    res.json({ code,authenticated: false });
}

const generateUniqueCode = () => {
    return Math.random().toString(36).slice(2, 11);
}

module.exports.validateCode = async (req, res) => {
    const { code } = req.body;
    const ishere  = await Session.findOne({where:{code:code }});
    console.log("here",ishere)
    if(ishere === null){
        res.json({ valid: false });
    }
     else {
        res.json({ valid: true });
    } 
}

module.exports.sessionClose = async (req, res) => {
/*     const { code } = req.body;
    console.log(req.session.uniqueCode);
     if (sessions[code]) {
        res.json({ valid: true });
    } else {
        res.json({ valid: false });
    }  */
}

module.exports.authenticate = async (req, res) => {
    const { code, nfcData } = req.body;
    const ishere  = await Session.findOne({where:{code:code }});
    if(ishere === null){
       return res.status(404).send('Code non trouvée');
    }else {
        // Valider les données NFC
        const valdiate = await validateNfcData(nfcData);
        //console.log(valdiate)
        if (valdiate.code == 1 ) {
        const idUser = valdiate.data.id      
        req.session.regenerate(function (err) {
            if (err) next(err);
            req.session.uniqueCode = code;
            req.session.authenticated= true;
    
            req.session.save(function (err) {
                if (err) return next(err);
              })
    });
    await Session.update(
        { idSession: req.sessionID,id_user:idUser },
        {
          where: {
            code: code,
          },
        },
      );
         let jwtSecretKey = "gfg_jwt_secret_key"; 
         let data = {
             time: Date(),
             userId:idUser ,
         }
     
         return res.json({ tocken: jwt.sign(data, jwtSecretKey),userID:valdiate.data.id});
        } else  {
        return res.status(404).json({ authenticated: false });
        }
    }
}

const validateNfcData = async (nfcData) => {
    const decoded = jwtDecode(nfcData);
    if(decoded != null){
      const user = await db.User.findOne({ where: { email: decoded.email }});
      if(user != null ){
        return {code: 1 ,data :user};
      }else {
        return {code :-1 , data: null};
      }
    }
    

    return true
}

module.exports.checkSession = async (req, res) => {
    const code = req.params.code;
    const sessionDB = await Session.findOne({ where: { code: code } })
    if (sessionDB === null) {
        console.log('Not found!');
      } else {
        //console.log(sessionDB.idSession)
          req.sessionStore.all(async (err, session)=>{ 
            console.log(session)
            const arr =  _.values(session);
           // console.log(arr)
            const sessionFound  = _.filter(arr,{"uniqueCode":sessionDB.code,"authenticated":true})
             if (sessionFound != null && sessionFound.length>0 ) {
                const user = await db.User.findOne({ where: { id: sessionDB.id_user }});
                console.log()
                let jwtSecretKey = "gfg_jwt_secret_key"; 
                let data = {
                    time: Date(),
                    userId:user.id ,
                }
                 res.json({ tocken: jwt.sign(data, jwtSecretKey),userID:user.id,authenticated: true });
             } else {
                 //res.status(404).send('Session non autoriser');
                 res.json({ authenticated: false });
            } 
        }); 

      }
}