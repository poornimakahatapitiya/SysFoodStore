import React from 'react'
import {Button,Modal,Result} from 'antd';
import {useNavigate} from 'react-router-dom'

function OrderResultModal(props) {
    const{visible,onCancel}=props
    const navigate=useNavigate();

    const handleGoBack=()=>{
        navigate('/');
    }
  return (
    <Modal
    title="Order result"
    width={700}
    visible={visible}
    onCancel={onCancel}
    footer={null}
    >
    <Result
    status='success'
    title="Successfully placed order"
    subTitle="Thank you for your order"
    extra={[
        <Button type="primary" key="console" onClick={handleGoBack}> 
        Go back to Home</Button>
           ]}/>

    </Modal>
  )
}

export default OrderResultModal