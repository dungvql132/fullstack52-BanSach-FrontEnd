import React, { useState } from "react";
import { Form, Input, Button, Row, Select, InputNumber, Image, Col } from "antd";
import UploadImg from "./UploadImg";
import API from "../callAPI";
const { Option } = Select;
let AddBookForm;

export default AddBookForm = ({ sendMessage, data, handleRefresh}) => {
  const [form] = Form.useForm();
  const [avatarUrl, setAvatarUrl] = useState("");
  const handleAvatar = (avatar) => {
    form.setFieldsValue({ img: avatar });
    setAvatarUrl(avatar);
  };
  React.useEffect(()=>{
    if(data){
      form.setFieldsValue(data);
    }else{
      form.resetFields();
      form.setFieldsValue({
        category: "horror",
      });
    }
  },[data])
  // const [date, setPassword] = useState('');
  // const user = await API.Login.getCurrentUser().data;
  // console.log(user);

  return (
    <Form
      form={form}
      layout="horizontal"
      labelAlign="left"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 16 }}
      size="large"
      onFinish={async () => {
        if (data) {
          try {
            let result = await API.Book.update({_id:data._id},{...form.getFieldsValue()});
            if(result.status == 200){
              sendMessage("success to update this book");
              handleRefresh();
            }else{
              sendMessage("fail to update book")
            }
          } catch (error) {
            sendMessage("fail to update book")
          }
        } else {
          try {
            const user = await API.Login.getCurrentUser();
            if (user.status == 200) {
              let book = { ...form.getFieldsValue() };
              book.idProducer = user.data._id;
              book.producerName = user.data.userName;
              const result = await API.Book.addItem(book);
              result.message == "fail"
                ? sendMessage("fail to add book, the book is existed")
                : sendMessage("success to add this book");
              console.log("book: ", book);
              handleRefresh();
            }
          } catch (error) {
            sendMessage("fail to add book");
          }
        }
      }}
    >
      <Form.Item
        name="bookName"
        label="book name"
        rules={[{ required: true, message: "please input your book name" }]}
      >
        <Input></Input>
      </Form.Item>
      <Form.Item
        name="author"
        label="author"
        rules={[{ required: true, message: "please input your author" }]}
      >
        <Input></Input>
      </Form.Item>
      <Form.Item
        name="description"
        label="description"
        rules={[{ required: true, message: "please input your author" }]}
      >
        <Input.TextArea></Input.TextArea>
      </Form.Item>
      <Form.Item
        name="year"
        label="year"
        rules={[{ required: true, message: "please input your year" }]}
      >
        <InputNumber></InputNumber>
      </Form.Item>
      <Form.Item
        name="cost"
        label="cost"
        rules={[{ required: true, message: "please input your cost" }]}
      >
        <InputNumber></InputNumber>
      </Form.Item>
      <Form.Item
        name="img"
        label="Img"
        rules={[{ required: true, message: "please input your Img (link)" }]}
      >
        <Input onChange={(e)=>{
          setAvatarUrl(e.target.value);
        }}></Input>
      </Form.Item>
      <Form.Item name="category" label="category">
        <Select defaultValue="horror">
          <Option value="horror">horror</Option>
          <Option value="aventure">aventure</Option>
          <Option value="romantic">romantic</Option>
          <Option value="conmedy">conmedy</Option>
          <Option value="fantasy">fantasy</Option>
        </Select>
      </Form.Item>
      <Row>
        <Form.Item name="upload">
          <UploadImg handleAvatar={handleAvatar}></UploadImg>
        </Form.Item>
        <Form.Item name="previewimg">
          <div className="h-28 w-28 border-2 border-collapse border-gray-700 overflow-hidden">
            <Image width={112} height={112} src={avatarUrl}></Image>
          </div>
        </Form.Item>
      </Row>
      <Row>
        <Button type="primary" htmlType="submit" className="ml-4">
          Submit
        </Button>
        <Col span={4}></Col>
        <Button type="primary" htmlType="submit" onClick={()=>{
          form.resetFields();
        }}>
          reset
        </Button>
      </Row>
    </Form>
  );
};
