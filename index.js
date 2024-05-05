const express = require("express");
const userRoute = require("./routes/user");
const db = require('./connection/db');
const app = express();
const profileRouter=require("./routes/profile");
const blogRoute=require("./routes/blogpost");

const PORT = process.env.PORT || 5000;


// Default route
app.route("/").get((req, res) => res.json("Your first Aarushi Yadav jhagha gorakhpur  Lucky yadav "));


//middleware
app.use(express.json());
app.use("/user", userRoute);
app.use("/profile", profileRouter);
app.use("/blogPost",blogRoute);
// Start the server

app.listen(PORT, () => console.log(`Your server is running on port ${PORT}`));
