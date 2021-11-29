import { Table, Button, Row, Col } from "antd";
import Form from "rc-field-form/es/Form";
import styled from "styled-components";
import API from "../callAPI";
import React, { useState, useEffect } from "react";
import AddBook from "./AddBook";
import BillDetail from "./BillDetail";

const MyTable = styled.div`
  .ant-table-cell {
    img {
      height: 100px;
      width: 100px;
    }
  }
`;

export default function BillTable() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dataRow, setDataRow] = useState(null);
  const [datas, setDatas] = useState([]);

  const handleRefresh = () => {
    callData();
  };
  useEffect(async () => {
    await callData();
  }, []);

  const callData = async () => {
    try {
      let user = await API.Login.getCurrentUser();
      const myData = await API.Bill.find({
        idBuyer: user.data._id,
        type: "amounted",
      });
      if (myData.status == 200) {
        setDatas(
          myData.data.map((value, index) => {
            value.key = String(index + 1);
            return value;
          })
        );
        console.log("datas: ", myData);
      }
    } catch (error) {}
  };

  const columns = [
    {
      title: "id",
      dataIndex: "_id",
    },
    {
      title: "pay date",
      dataIndex: "payDate",
    },
    {
      title: "cost",
      dataIndex: "cost",
    },
    {
      title: "action",
      dataIndex: "action",
      render: (_, row) => (
        <p
          onClick={() => {
            console.log("row ", row);
            setIsModalVisible(true);
            setDataRow(row);
          }}
        >
          more
        </p>
      ),
    },
  ];

  return (
    <MyTable className="w-9/12 mx-auto">
      <Table columns={columns} dataSource={datas}></Table>
      <BillDetail
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        data={dataRow}
      ></BillDetail>
    </MyTable>
  );
}
