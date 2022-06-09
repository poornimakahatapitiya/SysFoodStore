import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useProducts from '../_actions/productActions'
import { Carousel, Row, Col, Card, Space,Typography, message } from 'antd'
import{EyeOutlined,ShoppingCartOutlined,DownOutlined} from  "@ant-design/icons"
import fresh from '../assets/images/fersh.png'
import meat from '../assets/images/meat.png'
import meatanother from '../assets/images/meat2.png'
import vegetables from '../assets/images/vegetables.png'
import slide1 from '../assets/images/slide1.jpg'
import sale from '../assets/images/sale.png'
import ProductDetailsModal from '../components/models/ProductDetailsModal'
import ProductFilters from '../components/filters/ProductFilters'
import useCarts from '../_actions/cartAcion'

const contentStyle = {
    width: '100%',
    color: 'black',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79'
}
const {Text}= Typography;

const initialQuery={
     skip:0,
     filters:{price:{$gte:10,$lte:5000}}
}

function Home() {
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.product.productList)
    const { getProductList } = useProducts();
    const{addToCart}=useCarts();
    const[selectedProduct,setSelectedProduct]=useState(null);
    const[showModal,setShowModal]=useState(false);
    const[query,setQuery]=useState(initialQuery);

    const handleShowProductDetails=(item)=>{
        setSelectedProduct(item);
        setShowModal(true);
    }

    const handleCancel=()=>{
        setShowModal(false);
    }

    const handleLoadMore=()=>{
        const newQuery={
            ...query,
            skip:query.skip+8,
            loadMore:true,
        }
        setQuery(newQuery);
        getProductList(newQuery);
    }

    const handleSearchProduct=(filters)=>{
        const newQuery={
            skip:0,
            filters,
        }
        setQuery(newQuery);
        getProductList(newQuery);
    }
const handleClearSearchProducts=()=>{
    setQuery(initialQuery);
    getProductList(initialQuery);
}

const handleAddToCart=(item)=>{
const data={
    _productId:item._id,
    quantity:1
}
dispatch(addToCart(data)).then((res)=>{
    if(res.payload.status){
        message.success(res.payload.message);
    }else{
        message.error("User needs to be logged in to add to cart")
    }
})
}

    useEffect(() => {
        getProductList(query)
    }, [])

    const renderFilters=()=>{
        return(
            <ProductFilters onSearch={handleSearchProduct} onClear={handleClearSearchProducts} initialFilters={initialQuery.filters}/>
        )
    }
    const renderSlider = () => {
        return (
            <Carousel autoplay>
               
                <div>
                    <img src={meat} style={contentStyle} />
                </div>
                <div>
                    <img src={slide1} style={contentStyle} />
                </div>
                <div>
                    <img src={fresh} style={contentStyle} />
                </div>
                <div>
                    <img src={meatanother} style={contentStyle} />
                </div>
                <div>
                    <img src={sale} style={contentStyle} />
                </div>


            </Carousel>
        )
    }
    const renderProductList = () => {
        return (
            <Row gutter={[12, 12]} style={{ padding: 10 }}>
                {productList?.map((item, index) => (

                    <Col key={index} xs={24} sm={12} lg={6} xl={6} xxl={6}>
                        <Card
                            hoverable
                            cover={
                                <img
                                    alt="example"
                                    src={item.image}
                                />
                            }
                            actions={[
                                <EyeOutlined key="view" style={{color:'black', fontSize:18}} onClick={()=>handleShowProductDetails(item)} />,
                                <ShoppingCartOutlined key="cart"  style={{color:'red',fontSize:18}} onClick={()=>handleAddToCart(item)}/>,
                            ]}
                        >
                            <Space direction='vertical'>
                                <Text strong onClick={()=>handleShowProductDetails(item)}>{item?.name}</Text>
                                <Text type='secondary'>{item?._category?.name}</Text>
                                <Text type='success'> Rs. {item?.price} /=</Text>
                            </Space>
                        </Card>
                    </Col>
                ))}</Row>

        )
    }
    return (
        <div>
            {renderSlider()}
            {renderFilters()}
            {renderProductList()}
            <div className='product-load-more'>{query?.skip<=productList?.length ? (
                <>
                 <DownOutlined onClick={handleLoadMore}/>
                 <p>Load More</p>   
                </>
            ):(
                <p>No More products</p>
            )}
            </div>
            <ProductDetailsModal visible={showModal} product={selectedProduct} onCancel={handleCancel}/>
        </div>
    )
}

export default Home