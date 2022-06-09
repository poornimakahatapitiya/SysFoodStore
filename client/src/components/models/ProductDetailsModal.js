import React ,{useState}from 'react'
import {Button,Row,Col,Image,InputNumber,Modal,Space,Typography,message} from 'antd'
import {ShoppingCartOutlined} from '@ant-design/icons'
import useCarts from '../../_actions/cartAcion';
import { useDispatch } from 'react-redux';

const{Title,Text}=Typography;
function ProductDetailsModal(props) {
    const {product,visible,onCancel}=props;
    const[quantity,setQuantity]= useState(1);
    
    const dispatch=useDispatch();
    const{addToCart}=useCarts();

    const handleChangeQuantity=(value)=>{
        setQuantity(value);
    };

  

    const handleAddToCart=()=>{
        const data={
            _productId:product?._id,
            quantity,
           price:product?.price,
        }
        dispatch(addToCart(data)).then((res)=>{
            if(res.payload.status){
                message.success(res.payload.message);
                setQuantity(1);
            }else{
                message.error("User needs to be logged into add to cart")
            }
        })
        }
  return (
    <Modal title={product?.name} width={700} visible={visible} onCancel={onCancel} footer={null}>
        <Row gutter={12}>
            <Col xs={24} sm={12} md={12} lg={12}>
                <Image src={product?.image}/>
            </Col>
            <Col xs={24} sm={12} md={12} lg>
                <Space direction='vertical'>
                    <Title level={5}>{product?.name}</Title>
                    <Text type='secondary'>{product?._category?.name}</Text>
                    <Text type='success'> Rs.{product?.price} /=</Text>
                    
                    <Text italic>{product?.description}</Text>
                    <Space direction='horizontal'>
                        <InputNumber min={1} value={quantity} onChange={handleChangeQuantity}/>
                        <Button type="primary " icon={<ShoppingCartOutlined style={{fontSize:18}}/>} onClick= {()=>handleAddToCart()}>Add To Cart</Button>
                    </Space>
                    <Text type='danger'> Total Amount : Rs.{product?.price*quantity} /=</Text>
                </Space>
            </Col> 
        </Row>
    </Modal>
  )
}

export default ProductDetailsModal