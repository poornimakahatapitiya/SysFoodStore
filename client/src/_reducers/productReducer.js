import { PRODUCT_LIST,PRODUCT_LIST_MORE,CATEGORY_LIST,ADD_PRODUCT, ADD_CATEGORY} from "../_actions/type";
const initialState={
    productList:null,
    categoryList:null,
}
const productReducer=(state=initialState,action)=>{
    switch(action.type){
        case ADD_PRODUCT:
            return{
                productList:action.payload.data
            }
        case ADD_CATEGORY:
             return{
                categoryList:action.payload.data
                }
        case CATEGORY_LIST:
            return{
                ...state,
                categoryList:action.payload.data
            }
        case PRODUCT_LIST:
            return{
                ...state,
                productList:action.payload.data
            }
        case PRODUCT_LIST_MORE:
            return{
                ...state,
                productList:[...state.productList,...action.payload.data]
            }
            default:
                return state;
    }
}
export default productReducer;