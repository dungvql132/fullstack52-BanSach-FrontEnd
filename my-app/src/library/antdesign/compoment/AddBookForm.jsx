import React, { useState } from "react";
import { Form, Input, Button, DatePicker, Select, InputNumber } from "antd";
import API from "../../../callAPI";
const { Option } = Select;
let AddBookForm;

export default AddBookForm = ({sendMessage}) => {
  const [form] = Form.useForm();
  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [img, setImg] = useState("");
  const [year, setYear] = useState("");
  const [cost, setCost] = useState("");
  const [category, setCategory] = useState("horror");
  // const [date, setPassword] = useState('');
  // const user = await API.Login.getCurrentUser().data;
  // console.log(user);
  const book = {
    bookName,
    author,
    img,
    year,
    cost,
    category,
  };
  return (
    <Form
      form={form}
      layout="horizontal"
      labelAlign="left"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 16 }}
      size="large"
      onFinish={async () => {
        try {
          const user = await API.Login.getCurrentUser();
          if(user.status == 200){
            book.idProducer = user.data._id;
            book.producerName = user.data.userName;
            const result = await API.Book.addItem(book);
            result.message == 'fail'?sendMessage("fail to add book, the book is existed"):sendMessage("success to add this book");
          }
        } catch (error) {
          sendMessage("fail to add book")
          // console.log("add book error");
        }
      }}
    >
      <Form.Item
        name="bookName"
        label="book name"
        rules={[{ required: true, message: "please input your book name" }]}
      >
        <Input
          onChange={(e) => {
            setBookName(e.target.value);
          }}
        ></Input>
      </Form.Item>
      <Form.Item
        name="author"
        label="author"
        rules={[{ required: true, message: "please input your author" }]}
      >
        <Input
          onChange={(e) => {
            setAuthor(e.target.value);
          }}
        ></Input>
      </Form.Item>
      <Form.Item
        name="year"
        label="year"
        rules={[{ required: true, message: "please input your year" }]}
      >
        <InputNumber
          onChange={(e) => {
            setYear(e);
          }}
        ></InputNumber>
      </Form.Item>
      <Form.Item
        name="cost"
        label="cost"
        rules={[{ required: true, message: "please input your cost" }]}
      >
        <InputNumber
          onChange={(e) => {
            setCost(e);
          }}
        ></InputNumber>
      </Form.Item>
      <Form.Item
        name="img"
        label="Img"
        rules={[{ required: true, message: "please input your Img (link)" }]}
      >
        <Input
          onChange={(e) => {
            setImg(e.target.value);
          }}
        ></Input>
      </Form.Item>
      <Form.Item name="category" label="category">
        <Select
          defaultValue="horror"
          onChange={(e) => {
            setCategory(e);
          }}
        >
          <Option value="horror">horror</Option>
          <Option value="aventure">aventure</Option>
          <Option value="romantic">romantic</Option>
          <Option value="conmedy">conmedy</Option>
          <Option value="fantasy">fantasy</Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add
        </Button>
      </Form.Item>
    </Form>
  );
};
