const express = require("express");
const User = require("../model/user.mode");
const config= require("../connection/confing");
const jwt = require("jsonwebtoken");
const middleware=require("../middleware");
const router = express.Router();

router.route("/:username").get(middleware.checkToken, async (req, res) => {
    try {
        const result = await User.findOne({ username: req.params.username }).exec();

        if (!result) {
            return res.status(404).json({ msg: "User not found" });
        }

        return res.json({
            data: result,  
            username: req.params.username
        });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
});

// router.route("/login").post((req,res)=>{
//     User.findOne({username:req.body.username},
//        (err,result)=>{
//         if(err)res.status(500).json({msg:err});
//         if(result==null){
//             res.status(403).json("Username incorrect");
//         }
//         if(result.password===req.body.password){
//             res.json("ok")
//         }else{
//             res.status(403).json("password is not correct");
//         } 
//        } 
//         );
// });

// router.route("/login").post((req, res) => {
//     User.findOne({ username: req.body.username })
//         .then(result => {
//             if (!result) {
//                 return res.status(403).json("Username incorrect");
//             }
//             if (result.password === req.body.password) {
//                let token= jwt.sign({username:req.body.password},
//                   config.key,{
//                     expiresIn: "24",
//                   }  
//                     );
//                  res.json({
//                     token:token,
//                     msg:"succexx"
//                  })

//                 res.json("ok sab thik hai");
//             } else {
//                 res.status(403).json("Password is not correct");
//             }
//         })
//         .catch(err => {
//             res.status(500).json({ msg: err.message });
//         });
// });


router.route("/login").post((req, res) => {
    User.findOne({ username: req.body.username })
        .then(result => {
            if (!result) {
                return res.status(403).json("Username incorrect");
            }
            if (result.password === req.body.password) {
                let token = jwt.sign({ username: req.body.password }, config.key, {
                    expiresIn: "24",
                });
                return res.json({
                    token: token,
                    msg: "success"
                });
            } else {
                return res.status(403).json("Password is not correct");
            }
        })
        .catch(err => {
            return res.status(500).json({ msg: err.message });
        });
});




router.route("/register").post(middleware.checkToken,(req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
    });
    user.save().then(() => {
        console.log('User registered')
        res.status(200).json("ok");
    })
    .catch((err) => {
        Error.captureStackTrace(err);
        res.status(403).json({msg: err});
    });
    // Remove this line: res.json("registerd")
});

router.route("/update/:username").patch(middleware.checkToken,async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            { username: req.params.username },
            { $set: { password: req.body.password } },
            { new: true } // Return the updated document
        );

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        const msg = {
            msg: "Password successfully updated",
            username: req.params.username,
        };
        return res.json(msg);
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
});

router.route("/delete/:username").delete(middleware.checkToken,async (req, res) => {
    try {
        const user = await User.findOneAndDelete({ username: req.params.username });

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        const msg = {
            msg: "Username deleted",
            username: req.params.username,
        };
        return res.json(msg);
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
});

module.exports=router;
