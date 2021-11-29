import { Row, Image, Col } from "antd";
import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Card } from "antd";
import { DoubleRightOutlined } from "@ant-design/icons";
const { Meta } = Card;

export default function ViewBook1({ data }) {
  const history = useHistory();
  const location = useLocation();
  return (
      <Card
        onClick={() => {
          history.push("/viewbook/" + data._id);
        }}
        hoverable
        style={{ width: "200px", height: "300px" }}
        cover={
          <img
            alt="example"
            src={data.img}
            style={{ width: "180px", height: "200px" }}
          />
        }
      >
        <Meta title={data.bookName} description={"cost: " + data.cost} />
      </Card>
  );
}
