import React, { useContext, useEffect } from "react";
import { MainContext } from "../context";
import { Row, Col } from "antd";
import styled from "styled-components";
import { Link } from "react-router-dom"
import { useHistory,useLocation } from "react-router-dom";

const MyHeader = styled.div`
`

export default function Header() {
  const history = useHistory();
  const location = useLocation();
  const { isLogin, setIsLogin, getCurrentUser } = useContext(MainContext);
  useEffect(()=>{
    console.log("vao useeffect");
  },[isLogin])
  return (
    <MyHeader className={"bg-indigo-100 h-24"}>
      <Row className={"h-full"}>
        <Col span={6} className={"h-full"} onClick={()=>{
          // ve trang home
          history.push("/")
        }}>
          <img src="https://salt.tikicdn.com/ts/product/f3/50/19/1cd0a90da83d843a95df35c7ba49e380.jpg" alt="" className={"h-full w-full"}/>
        </Col>
        <Col span={12} offset={6}>
          <Row className={"h-1/2"}>
            <Col span={12}>
              <input></input>
            </Col>
            {!isLogin ? 
            <Col span={12}>
              <div>
                <Link to="/login">Login/</Link>
                <Link to="/register">Register</Link>
              </div>
            </Col> :
            <Col span={12}>
            <div onClick={()=>{
              setIsLogin(false);
              localStorage.removeItem("token");
              console.log("bam vao dang xuat ",isLogin);
              
            }}>
              dang xuat
            </div>
          </Col>}
          </Row>
          <Row className={"h-1/2"}>
            <Col span={4}><Link to="/usertable">usertable</Link></Col>
            <Col span={4}><Link to="/booktable">booktable</Link></Col>
            <Col span={4}><Link to="/addbook">addbook</Link></Col>
            <Col span={4}><Link to="/addbook">addbook</Link></Col>
            <Col span={4}><Link to="/addbook">addbook</Link></Col>
            <Col span={4}><Link to="/addbook">addbook</Link></Col>
          </Row>
        </Col>
      </Row>
    </MyHeader>
  );
}
