import React, { useState,useContext } from "react";
import { Form, Input, Button } from "antd";
import API from "../callAPI";
import { MainContext } from "../context";

export default function LoginForm(){
  console.log("vao login form");
  const { setIsLogin } = useContext(MainContext);
  const [form] = Form.useForm();
  return (
    <Form
      form={form}
      layout="horizontal"
      labelAlign="left"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 16 }}
      size="large"
      onFinish={async () => {
        // console.log(user);
        let result = await API.Login.signin(form.getFieldsValue());
        if(result.status == 200){
          localStorage.setItem("token",result.token);
          setIsLogin(true);
        }
      }}
    >
      <Form.Item
        name="email"
        label="email"
        rules={[{ required: true, message: "please input your email" }]}
      >
        <Input></Input>
      </Form.Item>
      <Form.Item
        name="password"
        label="password"
        rules={[{ required: true, message: "please input your password" }]}
      >
        <Input.Password></Input.Password>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};