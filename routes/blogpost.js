const express= require("express");
const router=express.Router();
const BlogPost=require("../model/blogpost.model");
const middleware=require("../middleware");
const multer = require("multer");

const storage =multer.diskStorage({
    destination:(req, file,cb)=>{
        cb(null, "./upload");
    },
    filename:(req, file, cb)=>{
        cb(null, req.params.id + ".jpg");
    },
});
const upload =multer({
    storage:storage,
    limits:{
        fileSize:1024*1024*8,
    },
});
router.route("/add/cover/Image/:id").patch(middleware.checkToken,upload.single("img"),(req,res)=>{
    BlogPost.findByIdAndUpdate({_id:req.params.id},{
        $set:{
            coverImage:req.file.path,
        },

    },
       {new: true},
       (err, result)=>{
        if(err)return res.json(err);
        return res.json(result);
       }
    )//fgnfgjnjnvjgitgit
})

router.route("/Add").post(middleware.checkToken,(req, res)=>{
    const blogpost=BlogPost({
        username:req.decoded.username,
        title:req.body.title,
        body:req.body.body
    });
    blogpost.save().then((result)=>{
        res.json({data:result}).catch((err)=>{
            console.log(err),res.json({err:err}); 
        });
    });
});

router.route("getOwnBlog").get(middleware.checkToken,(req, res)=>{
  BlogPost.find({username:req.decoded.username}, (err, result)=>{
    if(err)return res.json(err);
    return res.json({data:result});
  });
});

router.route("/getOtherBlog").get(middleware.checkToken, (req, res)=>{
    BlogPost.find(
        {username:{$ne:req.decoded.username}},
        (err, result)=>{
            if(err)return res.json(err);
            return res.json({data:result});
        }
    );
});
router.route("/delete/:id").delete(middleware.checkToken, (req,res)=>{
    BlogPost.findOneAndDelete(
        {
            $and:[{username:req.decoded.username},{_id:req.params.id,}]
            
        },
        (err, result)=>{
            if(err)return res.json(err);
            else if(result){
                console.log(result);
                return res.json("Blog deleted");
            }
            return res.json("Blog not deleted");
        }
    );
});

module.exports= router;

///check