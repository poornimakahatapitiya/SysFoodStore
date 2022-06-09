import axios from 'axios';
import { useDispatch } from 'react-redux'; 
import{ ADD_TO_CART,GET_CART_ITEM,UPDATE_CART_ITEM,REMOVE_CART_ITEM,CLEAR_CART_ITEM} from './type'

export default function useCarts(){
    const token=localStorage.getItem("customerToken");
    const config={
        headers:{Authorization: `bearer ${token}`}
    };
    const dispatch=useDispatch();

    const addToCart=(data)=>{
        const result=axios.post("/carts/addToCart",data,config).then((res)=>{
            return res.data;
        }).catch((err)=>{
            return err.response.data;
        })
        return{
            type:ADD_TO_CART,
            payload:result
        }
    }


    const updateCartItem=(data)=>{
        const result=axios.put("/carts/updateCartItem",data,config).then((res)=>{
            return res.data;
        }).catch((err)=>{
            return err.response.data;
        })
        return{
            type:UPDATE_CART_ITEM,
            payload:result
        }
    }



    const removeCartItem=(productId)=>{
        const result=axios.put(`/carts/removeCartItem/${productId}`,false,config).then((res)=>{
            return res.data;
        }).catch((err)=>{
            return err.response.data;
        })
        return{
            type:REMOVE_CART_ITEM,
            payload:result
        }
    }

    const getCartItems=()=>{
        const result=axios.get("/carts",config).then(res=>{
            return res.data;
        }).catch((err)=>{
            return err.response.data
        })
        console.log(result)
        dispatch({
            type:GET_CART_ITEM,
            payload:result
        })
    }

    const clearCart=()=>{
        dispatch({
            type:CLEAR_CART_ITEM
        })
    }
    return{
        getCartItems,
        addToCart,
        updateCartItem,
        removeCartItem,
        clearCart
    }
}
