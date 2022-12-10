const StrategyJWT = require("passport-jwt").Strategy
//its a module which helps to authenticate end point with jwt token data 
const ExtractJWT = require("passport-jwt").ExtractJwt

//import keys from keys.js, its the same used in generating token from jwt in login function 
const keys = require("./keys")
//const keys = "thisissecrety"

const  User = require("../models/user")

const options = {}

options.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken()
options.secretOrKey = keys.secretKey

module.exports = (passport) => {
passport.use(
    new StrategyJWT(options, async(jwt_payload, done) => {
      const user = await User.findById(jwt_payload._id)
      if(user){
        return done(null, user)
      }else {
        console.log("Error in user auth")
      }
    })
)
}