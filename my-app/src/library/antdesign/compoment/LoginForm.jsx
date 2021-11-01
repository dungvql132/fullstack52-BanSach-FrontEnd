import React, { useState } from "react";
import { Form, Input, Button, DatePicker } from "antd";
import API from "../../../callAPI"
let RegisterForm;
export default RegisterForm = () => {
  const [form] = Form.useForm();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = {
    email,
    password,
  }
  return (
    <Form
      form={form}
      layout="horizontal"
      labelAlign="left"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 16 }}
      size="large"
    >
      <Form.Item
        name = "email"
        label="email"
        rules={[{required:true,message:"please input your email"}]}
      >
        <Input onChange = {(e)=>{setEmail(e.target.value)}}></Input>
      </Form.Item>
      <Form.Item
        name = "password"
        label="password"
        rules={[{required:true,message:"please input your password"}]}
      >
        <Input.Password onChange = {(e)=>{setPassword(e.target.value)}}></Input.Password>
      </Form.Item>
      <Form.Item>
        <Button type="primary" onClick={()=>{
          console.log(user);
          API.Login.signin(user);
        }}>Login</Button>
      </Form.Item>
    </Form>
  );
};