const passport = require("passport");
const local = require("passport-local") 
const { User } = require("../models/User"); 
const { createHash, isValidPassword } = require("../utils/encriptarPassword");
const {createLogger} = require("../utils/logWinston")
const logger = createLogger('PROD')

const LocalStrategy = local.Strategy

const initializePassport = () => {
    passport.use(
        "register",
        new LocalStrategy(
          { passReqToCallback: true },
          async (req, username, password, done) => {
            try{
            let user = await User.findOne({ email:username })
              if (user) {
                //Si el usuario ya existe no lo guarda
                logger.log('warn', `El usuario ${username} ya se encuentra registrado`)
                return done(null, false);
              }
              //Se crea el objeto a guardar
              const newUser = {
                username: req.body.name,
                password: createHash(password),
                email: username
              }
              try {
                let result = await User.create(newUser)
                return done(null, result)
              } catch (error) {
                logger.log('error', `Error al crear el Usuario`)
                return done(error);
              }
            
            }catch(err){
                done(err);
            }
        })
    )


    passport.use(
        'login',
        new LocalStrategy(
            async (username,password,done) => {
                 try {
                    let user = await User.findOne({ email:username});
                    if (!user){
                        logger.log('error', `El usuario ${username} no existe!`)
                        return done(null, false,{message:'No existe'})
                    } 
                    if (!isValidPassword(user,password)) {
                        logger.log('error', `El password es invalido!`)
                        return done(null, false,{message:'Invalid password'})
                    }
                    return done(null, user)
                } catch (error) {
                    done(error);
                }
            }
        )
    )
    passport.serializeUser((user,done) => {
        done(null,user._id)
    })

    passport.deserializeUser((id,done) => {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    })
}

module.exports = {
    initializePassport
}