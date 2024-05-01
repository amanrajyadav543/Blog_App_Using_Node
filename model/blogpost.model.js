const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
    username: String,
    title: String,
    body: String,
    coverImage: {
        type: String,
        default: ""
    },
    like: Number,
    share: Number,
    Comment: Number
});

module.exports = mongoose.model("BlogPost", BlogPostSchema);
