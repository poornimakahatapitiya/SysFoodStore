import React, { useState } from "react";
import { PageHeader, Table, Space, Typography, Image, InputNumber, message,Button } from "antd";
import{sumBy} from 'lodash'
import StripeCheckout from 'react-stripe-checkout'
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import useCarts from "../_actions/cartAcion";
import useOrders from "../_actions/orderActions";
import OrderResultModal from "../components/models/orderResultModal";
import {
  DeleteTwoTone,
  EditTwoTone,
  SaveTwoTone,
  ReloadOutlined,
  DollarOutlined,
} from "@ant-design/icons";


function Cart() {
  const navigate = useNavigate();
  const {updateCartItem,removeCartItem,clearCart}=useCarts();
  const dispatch=useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems?.cartDetails);
  const [editItems, setEditItems] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const{checkout}=useOrders();
  const auth=useSelector((state)=>state.customer.auth)
  const [showResultModal, setShowResultModal]=useState(false)

  const handleEdit = (item) => {
    setEditItems(item);
    setQuantity(item.quantity);
  };

  const handleQuantityChange = (value) => {
    setQuantity(value);
  };

  const handleReset=()=>{
      setEditItems(null);
  }
  const handleUpdateCartItem=(item)=>{
    const data={
        _productId:item?._product?._id,
        quantity,
    }
    dispatch(updateCartItem(data)).then((res)=>{
        if(res.payload.status){
            message.success(res.payload.message);
            setEditItems(null);
        }else{
            message.error(res.payload.message)
        }
    })
  }

  const handleRemove = (item) => {
      dispatch(removeCartItem(item._product._id)).then(res=>{
          if(res.payload.status){
              message.success(res.payload.message)
          }else{
            message.error(res.payload.message)
          }
         
      })
  };

   const handlePayout=(token,total)=>{
    dispatch(checkout({token,total})).then(res=>{
        if(res.payload.status){
            clearCart();
            setShowResultModal(true);
        }else{
            message.error(res.payload.message)
        }
    })
   }
  const renderCartItems = () => {
    return (
      <Table columns={columns} dataSource={cartItems} scroll={{ x: 1300 }} />
    );
  };

  const columns = [
    {
      title: "Product",
      width: 80,
      dataIndex: "_product",
      key: "name",
      render: (item) => {
        return (
          <Space direction="vertical">
            <Typography.Text strong>{item?.name}</Typography.Text>
            <Image src={item?.image} alt="image" width={80} />
          </Space>
        );
      },
      fixed: "left",
    },
    {
      title: "Price (Rs)",
      width: 100,
      dataIndex: "price",
      key: "price",
      alignItems: "right",
    },
    {
      title: "Quantity",
      width: 100,
      render: (item) => {
        if (editItems?._product?._id === item?._product?._id) {
          return (
            <InputNumber
              size="small"
              min={1}
              value={quantity}
              onChange={handleQuantityChange}
            />
          );
        }
        return <span>{item?.quantity}</span>;
      },
    },
    {
      title: "Amount (Rs)",
      width: 100,
      dataIndex: "amount",
      key: "amount",
      alignItems: "right",
    },
    {
      title: "Change order?",
      fixed: "right",
      width: 100,
      render: (item) => {
        return (
          <>
            {editItems?._product?._id === item?._product?._id ? (
              <span style={{ marginRight: 4 }}>
                <SaveTwoTone style={{ marginRight: 4, fontSize: 16 }} onClick={()=>handleUpdateCartItem(item)} />
                <ReloadOutlined
                  style={{ fontSize: 16, color: "green" }}
                  onClick={handleReset}
                />
              </span>
            ) : 
              <EditTwoTone
                style={{ marginRight: 4, fontSize: 16 }}
                twoToneColor="blue"
                onClick={() => handleEdit(item)}
              />
            }
            <DeleteTwoTone
              style={{ fontSize: 16 }}
              twoToneColor="red"
              onClick={() => handleRemove(item)}
            />
          </>
        );
      },
    },
  ];

  const renderCheckout=()=>{
      const total= sumBy(cartItems,(item)=>item.amount);
      if(cartItems?.length>0){
          return(
              <center>
                  <h2 style={{ fontWeight:'bold',color:'black'}}> Total Amount: Rs. {total} /=</h2>
                  <StripeCheckout
                  name="payment" email={auth?.data?.email}
                  description='Payement for products' amount={total * 100}
                  token={(token)=>handlePayout(token,total)}
                  stripeKey='pk_test_51Kxlf6LcLyRp9BzSmSr0r82rI74HDdNBz2OOWMHfuW8OIUNTMyZdXknwznR4Oww7KOXsJqf1A24ILU5bkpnMUmQ600FTmitz9Y'>
                      <Button type='primary' icon={<DollarOutlined/>}>Chekout</Button>
                  </StripeCheckout>
              </center>
          )
      }
  }
  return (
    <>
      <PageHeader title="Your Cart" onBack={() => navigate(-1)} />
      <div className="page-wrapper">
      {renderCartItems()}
      {renderCheckout()}
      <OrderResultModal visible={showResultModal} onCancel={()=>setShowResultModal(false)}/>
      </div>
    </>
  );
}

export default Cart;
