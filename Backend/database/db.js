const mongoose= require('mongoose');
var mongoURL= `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@foodapp.095fe.mongodb.net/foodApp`

mongoose.connect(mongoURL,{useUnifiedTopology:true, useNewUrlParser:true})

var db=mongoose.connection

db.on('connected',()=>{
 console.log('Mongo db Connected Successfully')
})
db.on('Error',()=>{
    console.log('Mongo db Connection failed')
})
