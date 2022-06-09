const router= require('express').Router();
const {Product}= require("../models/Product");

router.post('/',(req,res)=>{
    const skip= parseInt(req.body.skip);
    const filters=req.body.filters;
    Product.find(filters).populate("_category").skip(skip).limit(8).exec().then((data,err)=>{
        if(err) return res.status(400).json({
            status:false,
            error:err
        });
        return res.status(200).json({
            status:true,
            message:'Get product successfully',
            data,
        });
    })
})

router.post('/create',(req,res)=>{
    const product=new Product(req.body);
    product.save((error,data)=>{
        if(error) return res.status(400).json({
            status:false,
            error:error
        });
        return res.status(200).json({
            status:true,
            message:'product  has been added successfully',
            data,
        });
    })
})


module.exports=router