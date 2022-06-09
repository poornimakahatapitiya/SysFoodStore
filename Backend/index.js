const express =require('express');
const bodyParser= require('body-parser');
require('dotenv').config();
const cors=require('cors');
const db=require('./database/db')

const app =express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

app.get("/",(_req,res)=>{
    res.send("connected succesfully");
});

app.use("/customers",require("./Routes/CustomerRoute"));
app.use("/categories",require("./Routes/categoryRoute"));
app.use("/products",require("./Routes/productsRoute"));
app.use("/carts",require("./Routes/cartRoute"));
app.use("/orders",require("./Routes/orderRoute"));
const PORT=process.env.PORT || 4000;
app.listen(PORT)