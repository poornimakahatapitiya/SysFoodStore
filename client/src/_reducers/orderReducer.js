import { CHECKOUT,GET_ORDER_HISTORY } from "../_actions/type";

const initalState={
    order:null,
    orderHistory:null,
}

const orderReducer=(state=initalState,action)=>{
 switch(action.type){
     case CHECKOUT:
         return{
             order:action.payload.data
         }
    case GET_ORDER_HISTORY:
        return{
            orderHistory:action.payload.data
        }
    default:
        return state;
 }
}
export default orderReducer;