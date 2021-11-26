import React, { useState,useEffect } from "react";
import { Modal, Button, Form } from "antd";
import AddBookForm from "./AddBookForm"; 
import { useHistory,useLocation } from "react-router-dom";

export default function AddBook({ isModalVisible, setIsModalVisible, data, handleRefresh}) {
  // const [isModalVisible, setIsModalVisible] = useState(false);
  const [message, setMessage] = useState("");


  const history = useHistory();
  const location = useLocation();
  const handleChange = (setState, value) => {
    setState(value);
  };
  useEffect(() => {
    console.log("vao effect");
    setTimeout(()=>{
      setMessage("");
    },5000)
  }, [message])
  const sendMessage = (str)=>{
    setMessage(str);
  }

  return (
    <div>
      <Modal
        visible={isModalVisible}
        // onOk={()=>{handleChange(setIsModalVisible,false)}}
        onCancel={() => {
          setIsModalVisible(false);
        }}
        width = {800}
        footer={[
          message==""?null:<p>{message}</p>
        ]}
      >
        <AddBookForm sendMessage={sendMessage} data={data} handleRefresh={handleRefresh}></AddBookForm>
      </Modal>
    </div>
  );
}
