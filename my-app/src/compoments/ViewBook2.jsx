import { Row, Image, Col } from "antd";
import React from "react";
import { useHistory,useLocation } from "react-router-dom";

export default function ViewBook2({ data }) {
  const history = useHistory();
  const location = useLocation();
  return (
    <div className="flex flex-col h-48 w-36 bg-indigo-300">
      <div className="w-48 mx-auto h-48">
        <Image src={data.img} width="100%" height="100%"></Image>
      </div>
      <div className="flex flex-col">
        <div>{data.bookName}</div>
        <div>{data.cost}</div>
        <div>{data.year}</div>
        <button onClick={() => {}}>buy</button>
      </div>
    </div>
  );
}
