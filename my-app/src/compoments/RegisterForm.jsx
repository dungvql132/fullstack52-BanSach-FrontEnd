import React, { useState } from "react";
import { Form, Input, Button, DatePicker, Select, Image,Row } from "antd";
import UploadImg from "./UploadImg";
import API from "../callAPI";
import styled from "styled-components"
let RegisterForm;
const { Option } = Select;

export default RegisterForm = () => {
  const [form] = Form.useForm();
  const [birthday, setBirthday] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const handleAvatar = (avatar) => {
    form.setFieldsValue({ avatar });
    setAvatarUrl(avatar);
  };

  form.setFieldsValue({
    kindPerson: "buyer",
  });
  return (
    <Form
      form={form}
      layout="horizontal"
      labelAlign="left"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      size="large"
      onFinish={async () => {
        let user = {...form.getFieldsValue(),birthday};
        console.log("user: ",user);
        const result = await API.Login.register(user);
        console.log("register ",result);
      }}
    >
      <Form.Item
        name="userName"
        label="name"
        rules={[{ required: true, message: "please input your name" }]}
      >
        <Input></Input>
      </Form.Item>
      <Form.Item
        name="email"
        label="email"
        rules={[
          { required: true, message: "please input your email" },
          { pattern: /@gmail.com$/, message: "please use gmail.com" },
        ]}
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
      <Form.Item
        name="confirmpass"
        label="confirm password"
        required
        rules={[
          () => ({
            validator(_, value) {
              if (
                form.getFieldValue("password") ==
                form.getFieldValue("confirmpass")
              ) {
                return Promise.resolve();
              } else {
                return Promise.reject(
                  new Error("please confirm your password")
                );
              }
            },
          }),
        ]}
      >
        <Input.Password></Input.Password>
      </Form.Item>
      <Form.Item
        name="phone"
        label="phone"
        rules={[{ required: true, message: "please input your phone" }]}
      >
        <Input></Input>
      </Form.Item>
      <Form.Item name="kindPerson" label="kind person">
        <Select defaultValue="buyer">
          <Option value="seller">seller</Option>
          <Option value="buyer">buyer</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="birthday"
        label="birthday"
        rules={[{ required: true, message: "please input your birthday" }]}
      >
        <DatePicker
          format="DD/MM/YYYY"
          onChange={(e) => {
            try {
              setBirthday(e.format("DD/MM/YYYY"));
            } catch (error) {
              setBirthday("");
            }
          }}
        ></DatePicker>
      </Form.Item>
      <Form.Item name="avatar" label="avatar link">
        <Input
          onChange={(e) => {
            setAvatarUrl(e.target.value);
          }}
        ></Input>
      </Form.Item>
      <Row>
        <Form.Item name="upload">
          <UploadImg handleAvatar={handleAvatar}></UploadImg>
        </Form.Item>
        <Form.Item name="upload">
          <div  className="h-28 w-28 border-2 border-collapse border-gray-700 overflow-hidden"><Image width={112} height={112} src={avatarUrl} ></Image></div>
        </Form.Item>
      </Row>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          onClick={() => {
            console.log(form.getFieldsValue());
          }}
        >
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};
