import axios from 'axios'
import { useDispatch } from 'react-redux'
import { PRODUCT_LIST,PRODUCT_LIST_MORE,CATEGORY_LIST,ADD_PRODUCT,ADD_CATEGORY } from './type'

export default function useProducts(){
    const dispatch=useDispatch();
    const getProductList=(query)=>{
        const result=axios.post('/products',query).then((res)=>{
            return res.data
        }).catch((err)=>{
            return err.response.data;
        })
        if(query.loadMore){
            dispatch({
                type:PRODUCT_LIST_MORE,
                payload:result
            })
        }else{
            dispatch({
                type:PRODUCT_LIST,
                payload:result,
            })
        }
        
    }
    const getCategoryList=()=>{
        const result=axios.get('/categories').then((res)=>{
            return res.data
        }).catch((err)=>{
            return err.response.data;
        })
        dispatch({
                type:CATEGORY_LIST,
                payload:result,
            })
        
        
    }
    const addProduct=()=>{
        const result=axios.post('/products/create').then((res)=>{
            return res.data
        }).catch((err)=>{
            return err.response.data;
        })
        dispatch({
            type:ADD_PRODUCT,
            payload:result,
        })
    }
    const addCategory=()=>{
        const result=axios.post('/categories/create').then((res)=>{
            return res.data
        }).catch((err)=>{
            return err.response.data;
        })
        dispatch({
            type:ADD_PRODUCT,
            payload:result,
        })
    }
    return{
        getProductList,
        getCategoryList,
        addProduct,
        addCategory,
    };
}
