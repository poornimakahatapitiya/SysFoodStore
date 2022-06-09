const express= require("express");
const router= express.Router();
const{Cart}=require('../models/Cart');
const{Product}=require('../models/Product');
const{auth}=require('../middleware/auth');
const populate={
    path:'cartDetails',
    populate:{
        path:'_product',
        model:'products',
        populate:{
            path:"_category",
            model:"categories"
        }
    }
}

router.post("/addToCart",auth,async(req,res)=>{
const customerCart=await Cart.findOne({_customerId:req.customerId});
const product= await Product.findById(req.body._productId);

const cartDetails={
    _product:req.body._productId,
    quantity:req.body.quantity,
    price:product.price,
    amount:product.price * req.body.quantity,
}

if(customerCart){
    Cart.findOneAndUpdate({
        _customerId:req.customerId,
        "cartDetails._product":req.body._productId
    },
    {
        $inc:{
            "cartDetails.$.quantity":req.body.quantity,
            "cartDetails.$.amount":product.price * req.body.quantity,
        }
    },
    {new:true}
    
    ).populate(populate)
    .exec()
    .then((data,error)=>{
        if(error)return res.status(400).json({
            status:false,
            error:error
        })
        if(data){
            return res.status(201).json({
                status:true,
                message:'Added Item to cart Successfully',
                data
            })
        }else{
            Cart.findOneAndUpdate({
                _customerId:req.customerId,

            },
            {
                $push:{
                    cartDetails:{
                        ...cartDetails
                    }
                }
            },
            {new:true}
            ).populate(populate)
            .exec()
            .then((data,error)=>{
                if(error) return res.status(400).json({status:false,error:error})
                return res.status(201).json({
                    status:true,
                    message:"Add Item to cart Successfully",
                    data
                })
            })
        }
        
})
}else{
    const newCart=new Cart({
        _customerId:req.customerId,
        cartDetails
    })
    newCart.save((error,data)=>{
        if(error) return res.status(400).json({status:false,error:error})
        return res.status(201).json({
            status:true,
            message:'Add Item to cart Successfully',
            data,
        })
    })
}
})

router.put("/updateCartItem",auth,async(req,res)=>{
    const _productId=req.body._productId;
    const quantity=req.body.quantity;
    const product=await Product.findById(_productId);
    Cart.findOneAndUpdate({
        _customerId:req.customerId,
        "cartDetails._product":_productId
    },{
        $set:{
            "cartDetails.$.quantity":quantity,
            "cartDetails.$.amount":quantity * product.price
        }
    },
    {new:true}
    ).populate(populate).exec((error,data)=>{
        if(error) return res.status(400).json({status:false,error:error})
        return res.status(200).json({
            status:true,
            message:' Item In cart updated Successfully',
            data,
        })
    })
})

router.put("/removeCartItem/:id",auth,async(req,res)=>{
    const _productId=req.params.id;
    
    Cart.findOneAndUpdate(
        {
            _customerId:req.customerId,
        
        },
        {
        $pull:{
            cartDetails:{_product:_productId}
        }
    },
    {new:true}
    ).populate(populate).exec((error,data)=>{
        if(error) return res.status(400).json({status:false,error:error})
        return res.status(201).json({
            status:true,
            message:' Item In cart removed Successfully',
            data,
        })
    })
})

router.get("/",auth,(req,res)=>{
    Cart.findOne({_customerId:req.customerId})
    .populate(populate)
    .exec((error,data)=>{
        if(error) return res.json({status:false,error:error});
        return res.status(200).json({
            status:true,
            message:"Get customer cart Succssfully",
            data,
        })
    })
}) 


module.exports=router;