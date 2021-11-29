import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Table } from "antd";
import AddBookForm from "./AddBookForm";
import { useHistory, useLocation } from "react-router-dom";

export default function BillDetail({
  isModalVisible,
  setIsModalVisible,
  data,
}) {
    console.log("data vao bill detail: ",data);
  // const [isModalVisible, setIsModalVisible] = useState(false);
  const columns = [
    {
      title: "author",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "img",
      dataIndex: "img",
      render: (img) => <img src={img} alt="" className="h-28 w-28"/>,
    },
    {
      title: "cost",
      dataIndex: "cost",
    },
    {
      title: "count",
      dataIndex: "count",
    },
    {
      title: "category",
      dataIndex: "category",
    },
  ];
  return (
    <div>
      <Modal
        visible={isModalVisible}
        // onOk={()=>{handleChange(setIsModalVisible,false)}}
        onCancel={() => {
          setIsModalVisible(false);
        }}
        width={800}
      >
        <Table
          columns={columns}
          dataSource={data?data.idBooks.map((value,index)=>{
              value.key = String(index+1);
              value.count = data.count[index];
              return value;
          }):null}
        ></Table>
      </Modal>
    </div>
  );
}
