const express = require("express")
const router = express.Router()

const {userRegister, login, userProfile} = require("../controllers/user")
const passport = require("passport")

router.post("/signup", userRegister)
router.post("/login",login)
router.get("/profile/:id",passport.authenticate("jwt", {session : false}), userProfile)

module.exports = router