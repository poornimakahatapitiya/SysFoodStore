const router= require('express').Router();
const {Category}= require("../models/Category");

router.get('/',(req,res)=>{
    Category.find().exec().then((data,err)=>{
        if(err) return res.status(400).json({
            status:false,
            error:err
        });
        return res.status(200).json({
            status:true,
            message:'Get category successfully',
            data,
        });
    })
})

router.post('/create',(req,res)=>{
    const category=new Category(req.body);
    category.save((error,data)=>{
        if(error) return res.status(400).json({
            status:false,
            error:error
        });
        return res.status(200).json({
            status:true,
            message:'Category  has been added successfully',
            data,
        });
    })
})

module.exports=router