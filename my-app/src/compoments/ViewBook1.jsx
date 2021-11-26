import { Row, Image, Col } from "antd";
import React from "react";
import { useHistory,useLocation } from "react-router-dom";

export default function ViewBook1({ data }) {
  const history = useHistory();
  const location = useLocation();
  return (
    <div className="flex flex-col h-48 w-36 bg-indigo-300">
      <div className="w-32 mx-auto h-32">
        <Image src={data.img} width='100%' height='100%'/>
      </div>
      <div>
        {data.bookName}
      </div>
      <div>
        {data.producerName}
      </div>
      <div>
        {data.cost}
      </div>
      <div onClick={()=>{
        history.push("/viewbook/"+data._id);
      }}>
        more
      </div>
    </div>
  );
}
