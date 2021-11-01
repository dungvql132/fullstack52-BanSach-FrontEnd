import React, { useState } from "react";
import { Form, Input, Button, DatePicker } from "antd";
import API from "../../../callAPI"
let RegisterForm;
export default RegisterForm = () => {
  const [form] = Form.useForm();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [userName, setUserName] = useState('');
  const [phone, setPhone] = useState('');
  const [birthday, setBirthday] = useState('');
  const user = {
    email,
    password,
    userName,
    phone,
    birthday
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
        name = "name"
        label="name"
        rules={[{required:true,message:"please input your name"}]}
      >
        <Input onChange = {(e)=>{setUserName(e.target.value)}}></Input>
      </Form.Item>
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
      <Form.Item
        name = "confirmpass"
        label="confirm password"
        required
        rules={[()=>({validator(_,value){
          if(password == confirmPass){
            return Promise.resolve();
          }else{
            return Promise.reject(new Error("please confirm your password"))
          }
        }})]}
      >
        <Input.Password onChange = {(e)=>{setConfirmPass(e.target.value)}}></Input.Password>
      </Form.Item>
      <Form.Item
        name = "phone"
        label="phone number"
        rules={[{required:true,message:"please input your phone"}]}
      >
        <Input onChange = {(e)=>{setPhone(e.target.value)}}></Input>
      </Form.Item>
      <Form.Item
        name="birthday"
        label="birthday"
        rules={[{required:true,message:"please input your birthday"}]}
      >
        <DatePicker format="DD/MM/YYYY" onChange= {(e)=>{
          try {
            setBirthday(e.format("DD/MM/YYYY"));
          } catch (error) {  
            setBirthday("");
          }
        }}></DatePicker>
      </Form.Item>
      <Form.Item>
        <Button type="primary" onClick={()=>{
          console.log(user);
          API.Login.register(user);
        }}>Register</Button>
      </Form.Item>
    </Form>
  );
};