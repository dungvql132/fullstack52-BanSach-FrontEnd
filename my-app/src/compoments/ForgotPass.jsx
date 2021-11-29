import React, { useState, useContext } from "react";
import { Form, Input, Button } from "antd";
import API from "../callAPI";
import { MainContext } from "../context";



export default function ForgotPass() {
  console.log("vao login form");
  const { setIsLogin } = useContext(MainContext);
  const [form] = Form.useForm();
  return (
    <div className="m-auto my-6 w-3/6">
      <Form
        form={form}
        layout="horizontal"
        labelAlign="left"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        size="large"
        onFinish={async () => {
          // console.log(user);
          let result = await API.User.find({
            ...form.getFieldsValue(),
          });
          if (result.status == 200 && result.data.length != 0) {
            console.log("nguoi quen mat khau: ", result);
            console.log("email: ",form.getFieldValue("email"));
            let changepass = await API.Login.forgetpass({
                "email":form.getFieldValue("email")
            })
            console.log("doi mat khau: ",changepass);
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
        <Form.Item>
          <Button type="primary" htmlType="submit">
            send to email
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
