const express = require("express")
const { createPost, getAllPost, getOnePost, editPost, deletePost } = require("../controllers/post")
const router = express.Router()
const passport = require("passport")

router.post("/post", passport.authenticate("jwt", { session: false }), createPost)
router.get('/all', getAllPost)
router.get("/post/:postid", getOnePost)
router.put("/edit/:postid", passport.authenticate("jwt", { session: false }), editPost)
router.delete("/delete/:postid", passport.authenticate("jwt", { session: false }), deletePost)

module.exports = router