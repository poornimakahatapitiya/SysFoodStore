import React, { useEffect } from 'react'
import{PageHeader,Table} from 'antd'
import moment from 'moment'
import{useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux';
import useOrders from '../_actions/orderActions';

function OrderHistory() {
    const navigate= useNavigate();
    const{getOrderHistory}=useOrders();
    const orderHistory=useSelector((state)=>state.order?.orderHistory);

    const renderOrderList =()=>{
        return(
            <Table columns={columns} dataSource={orderHistory} rowKey='_id' expandable={{expandedRowRender}}/>
        )
    }

        const columns=[
            {title:'ID',dataIndex:'_id',key:'_id'},
            {title:'Date',dataIndex:'orderDate',key:'orderDate',align:'center',
            render:(value)=>{
               const formatDate=moment(value).format('DD-MM-YYYY');
               return formatDate;

           }
        },
        {title:'Total Amount(Rs.)',dataIndex:'totalAmount',key:'totalAMount',align:'right'},
        ]

        const expandedRowRender=(record)=>{
            const columns=[
                {
                    title:'Product', dataIndex:"_product",key:"_product",render:(item)=>{
                        return item?.name
                    }
                },
                {
                    title:'Price (Rs.)', dataIndex:"price",key:"price", align:'right'
                },
                {
                    title:'Quantity', dataIndex:"quantity",key:"quantity", align:'right'
                },
                {
                    title:'Amount (Rs.)', dataIndex:"amount",key:"amount", align:'right'
                }
            ];
            return(
                <Table columns={columns} dataSource={record?.orderDetails} pagination={false}/>
            )
        }
    useEffect(()=>{
        getOrderHistory()
    },[])
  return (
    <>
        <PageHeader title="Your Order History" onBack={() => navigate(-1)} />
        <div className='page-wrapper'>{renderOrderList()}</div>
      
    </>
  )
}

export default OrderHistory