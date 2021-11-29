import React, { useContext, useEffect, useState } from "react";
import { MainContext } from "../context";
import { Row, Col, Menu, Button, Dropdown } from "antd";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useHistory, useLocation } from "react-router-dom";

import {
  SearchOutlined,
  AppstoreOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import SearchForm from "./SearchForm";
import API from "../callAPI";

const MyHeader = styled.div``;

export default function Header() {
  const [user, setUser] = useState({});
  const [menu, setMenu] = useState(
    <Menu mode="horizontal">
      <Menu.Item key="8" icon={<HomeOutlined />}>
        <Link to="/myself">information</Link>
        <hr></hr>
      </Menu.Item>
      <Menu.Item key="9" icon={<HomeOutlined />}>
        <Button
          onClick={() => {
            setIsLogin(false);
            localStorage.removeItem("token");
            console.log("bam vao dang xuat ", isLogin);
          }}
        >
          log out
        </Button>
      </Menu.Item>
    </Menu>
  );
  const history = useHistory();
  // const [form] = Form.useForm();
  const location = useLocation();
  const { isLogin, setIsLogin, getCurrentUser } = useContext(MainContext);
  useEffect(async () => {
    setUser(await API.Login.getCurrentUser());
  }, [isLogin]);
  return (
    <div>
      <MyHeader className={"h-24"}>
        <Row className={"h-full"}>
          <Col
            span={6}
            className={"h-full"}
            onClick={() => {
              // ve trang home
              history.push("/");
            }}
          >
            <a className="flex align-middle text-center">
              <img
                src={`https://i.ibb.co/kD3ZHjy/book-with-home-study-logo-design-vector-icon-symbol-graphic-illustration-2-EP7-G0-A.jpg`}
                className="h-full w-1/2"
              ></img>
              <p className="mt-7 text-4xl text-black">HOME</p>
            </a>
          </Col>
          <Col span={10} offset={8}>
            <Row className={"h-1/2"}>
              <Col span={10}>
                <SearchForm></SearchForm>
              </Col>
              {!isLogin ? (
                <Col span={12} offset={2}>
                  <Menu mode="horizontal">
                    <Menu.Item key="6" icon={<HomeOutlined />}>
                      <Link to="/login">Login</Link>
                      <hr></hr>
                    </Menu.Item>
                    <Menu.Item key="7" icon={<HomeOutlined />}>
                      <Link to="/register">Register</Link>
                    </Menu.Item>
                  </Menu>
                </Col>
              ) : (
                <Col span={12} offset={2}>
                  <Dropdown overlay={menu} trigger={["click"]}>
                    <a
                      className="ant-dropdown-link"
                      onClick={(e) => e.preventDefault()}
                    >
                      <img
                        src={user.data ? user.data.avatar : null}
                        className="h-11 w-11 rounded-full"
                      ></img>
                    </a>
                  </Dropdown>
                </Col>
              )}
            </Row>
            <Row>
              <Menu
                // onClick={this.handleClick} selectedKeys={[current]}
                className="w-full"
                mode="horizontal"
              >
                {isLogin && (user.data ? user.data.kindPerson:null) == "admin" ? (
                  <Menu.Item key="1" icon={<HomeOutlined />}>
                    <Link to="/usertable">usertable</Link>
                  </Menu.Item>
                ) : null}
                <Menu.Item key="2" icon={<AppstoreOutlined />}>
                  <Link to="/booktable">booktable</Link>
                </Menu.Item>
                <Menu.Item key="3">
                  <Link to="/basket">basket</Link>
                </Menu.Item>
                <Menu.Item key="4">
                  <Link to="/bill">bill</Link>
                </Menu.Item>
              </Menu>
            </Row>
          </Col>
        </Row>
      </MyHeader>
    </div>
  );
}
