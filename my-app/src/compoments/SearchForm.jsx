import React, { useState,useContext } from "react";
import { Form, Input, Button,Search } from "antd";
import API from "../callAPI";
import { MainContext } from "../context";
import {
  SearchOutlined,
  AppstoreOutlined,
  HomeOutlined,
} from "@ant-design/icons";

export default function SearchForm({type}){
  console.log("vao login form");
  const { setIsLogin } = useContext(MainContext);
  const [form] = Form.useForm();
  return (
        <Input.Search prefix={<SearchOutlined />} placeholder="input search text" onSearch={()=>{
          console.log("seaching");
        }} enterButton />
  );
};
