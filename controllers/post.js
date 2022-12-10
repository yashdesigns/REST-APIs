
const Post = require("../models/post")

exports.createPost = async (req, res) => {

    try {
        const { title, desc, image } = req.body
        const userId = req.user._id

        if (!title) {
            return res.status(400).json({
                msg: "title cant be empty"
            })
        }

        if (!desc) {
            return res.status(400).json({
                msg: "description cant be empty"
            })
        }

        let newPost = await new Post({
            title,
            desc,
            image,
            createdBy: userId
        }).save()

        return res.status(201).json({
            success: true,
            msg: "Post created",
            data: newPost
        })
    } catch (error) {
        return res.json({
            msg: "Internal server error"
        })
    }



}

exports.getAllPost = async (req, res) => {
    try {
        let allPosts = await Post.find();
        return res.json({
            success: true,
            data: allPosts
        })
    } catch (error) {
        return res.json({
            msg: "Server error"
        })
    }
}

exports.getOnePost = async (req, res) => {
    try {

        let postId = req.params.postid
        let post = await Post.findById({ _id: postId })
        if (!post) {
            return res.json({
                msg: "Post not found"
            })
        }
        return res.json({
            success: true,
            data: post
        })


    } catch (error) {
        return res.json({
            msg: "Server error"
        })
    }
}

exports.editPost = async (req, res) => {
    try {
        let userId = req.user._id
        let postId = req.params.postid

        let postToBeEdit = await Post.findById({ _id: postId })
        if (!postToBeEdit) {
            return res.json({
                msg: "Post not found"
            })
        }


        if (userId != postToBeEdit.createdBy.toString()) {
            return res.json({
                msg: "You are not authorized to edit this post"
            })
        }

        let { title, desc, image } = req.body

        let post = await Post.updateOne({ _id: postId }, {
            $set: {
                title: title ? title : postToBeEdit.title,
                desc: desc ? desc : postToBeEdit.desc,
                image: image ? image : postToBeEdit.image
            }
        }, { new: true })


        return res.json({
            msg: "Updated successfully",
            data: post
        })

    } catch (error) {
        console.log(error)
        return res.json({
            msg: "server error"
        })
    }

}

exports.deletePost = async (req, res) => {
    try {
        let userId = req.user._id
        let postId = req.params.postid


        let postToBeDelete = await Post.findById({ _id: postId })
        if (!postToBeDelete) {
            return res.json({
                msg: "Post not found"
            })
        }

        if (userId != postToBeDelete.createdBy.toString()) {
            return res.json({
                msg: "Not authorized to delete post"
            })
        }

        await Post.deleteOne({ _id: postId })

        return res.json({
            success: true,
            msg: "Post deleted successfully from db"
        })


    } catch (error) {
        console.log(error)
        return res.json({
            msg: "Server error"
        })
    }

}