import React, { useState,useEffect } from 'react'
import { useSelector } from 'react-redux';
import {Button,Row,Col,Input, InputNumber,Slider,Typography,Select} from 'antd'
import {CloseCircleOutlined,SearchOutlined} from '@ant-design/icons'
import useProducts from '../../_actions/productActions';


const{Text}=Typography;

function ProductFilters(props) {
    const {initialFilters,onSearch,onClear}=props;
    const[ filters,setFilters]=useState(initialFilters);
    const[keyword,setkeyword]=useState(null);
    const {getCategoryList} =useProducts();
    const categoryList=useSelector((state)=>state.product.categoryList);
    
    const hanldeKeywordChange=(e)=>{
        const value=e.target.value;
        setkeyword(value);
        setFilters({
            ...filters,
            name:{$regex :value, $options:'i'}
        })
    }

    const handleSelectCategory=(value)=>{
        setFilters({
            ...filters,
            _category:value
        })
    }
    const handlePriceFromChange =(value)=>{
        const price={...filters.price};
        price.$gte=value;
        setFilters({
            ...filters,
            price
        })
    }
    const handlePriceToChange =(value)=>{
        const price={...filters.price};
        price.$lte=value;
        setFilters({
            ...filters,
            price
        })
    }

    const handleSearch=()=>{
        onSearch(filters);
    }
    const handleClearSearch=()=>{
        setkeyword(null);
        setFilters(initialFilters);
        onClear();
    }
    useEffect(()=>{
        getCategoryList()
    },[])
  return (
    <Row gutter={[8,8]} style={{padding:10}}>
        <Col xs={24} sm={12} md={12} lg={5} xl={5}  xxl={5}>
            <Input placeholder='Enter keyword' value={keyword} onChange={hanldeKeywordChange}/>
        </Col>
        <Col xs={24} sm={12} md={12} lg={3} xl={3}  xxl={3}>
            <Select placeholder="Select Category" style={{width:'100%'}} value={filters._category} onChange={handleSelectCategory}>
                {categoryList?.map((category)=>(
                    <Select.Option value={category._id}>{category.name}</Select.Option>
                ))}
            </Select>
        </Col>
        <Col xs={24} sm={12} md={12} lg={6} xl={5}  xxl={5}>
            <Row gutter={3} align="middle">
                <Col span={8}>
                    <Text>Price From</Text>
                </Col>     
                <Col span={5}>
                    <InputNumber min={10} max={5000} value={filters.price.$gte} onChange={handlePriceFromChange}/>
                </Col>
            </Row>
            
        </Col>
         <Col xs={24} sm={12} md={12} lg={6} xl={6}  xxl={6}>
            <Row gutter={3} align="middle">
                <Col span={5}>
                    <Text>Price To</Text>
                </Col>
                <Col span={4}>
                    <InputNumber min={10} max={5000} value={filters.price.$lte} onChange={handlePriceToChange}/>
                </Col>
            </Row>
        </Col>

        <Col xs={24} sm={12} md={12} lg={5} xl={5} xxl={5}>
            <Button type='primary' icon={<SearchOutlined/>} onClick={handleSearch} style={{width:'45%', marginRight:10}}> Search</Button>
            <Button type='default' icon={<CloseCircleOutlined/>} onClick={handleClearSearch} style={{width:'45%'}}> Clear</Button>

        </Col>
    </Row>
    
  )
}

export default ProductFilters