
const mongoose = require('mongoose')

// const connection = mongoose.createConnection('mongodb://127.0.0.1:27017/blog').on('open', ()=>{
//     console.log("connection succesfull");
// }).on('error', ()=>{
//     console.log('nahi hua connection');
// })
// module.exports= connection


const connection = mongoose.createConnection('mongodb+srv://bit20it37:mongo@cluster0.unnf0uu.mongodb.net/').on('open', ()=>{
    console.log("connection succesfull");
}).on('error', ()=>{
    console.log('nahi hua connection');
})
module.exports= connection