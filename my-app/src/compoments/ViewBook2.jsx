import { Row, Image, Col, Button } from "antd";
import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import API from "../callAPI";
import {ShoppingCartOutlined} from "@ant-design/icons"

export default function ViewBook2({ data }) {
  const history = useHistory();
  const location = useLocation();
  return (
    <div>
      <Row>
        
        <Col span={4} offset={4}>
          <Image src={data.img} width="100%" height="100%"></Image>
        </Col>
        <Col span={14} offset={2}>
          <Row><p className='text-2xl'>{"Name: " + data.bookName}</p></Row>
          <Row><p className='text-2xl'>{"Cost: " + data.cost}</p></Row>
          <Row><p className='text-2xl'>{"Description: " + data.description}</p></Row>
          <Row>
            <button
          
            className="border-collapse border-2 border-black"
              onClick={async () => {
                console.log("bam vao buy");
                let user = await API.Login.getCurrentUser();
                console.log(user);
                if (user.status == 200) {
                  console.log("idbook: ", data._id);
                  await API.Bill.addBill(data._id);
                }
              }}
            >
              {<ShoppingCartOutlined className='text-4xl'/>}
            </button>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
