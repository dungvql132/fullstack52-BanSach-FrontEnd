import { Table, Button, Row, Col } from "antd";
import Form from "rc-field-form/es/Form";
import styled from "styled-components";
import API from "../callAPI";
import React, { useState, useEffect } from "react";
import AddBook from "./AddBook";
import UpdateUser from "./UpdateUser";

const MyTable = styled.div`
  .ant-table-cell {
    img {
      height: 100px;
      width: 100px;
    }
  }
`;

export default function UserTable() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dataRow, setDataRow] = useState(null);
  const [datas, setDatas] = useState([]);
  const [isDelete, setIsDelete] = useState(false);
  const [selectRow, setSelectRow] = useState([]);

  const handleRefresh = () => {
    callData();
  };
  useEffect(() => {
    callData();
  }, []);
  const callData = async () => {
    try {
      const myData = await API.User.getAll();
      if (myData.status == 200) {
        setDatas(
          myData.data.map((value, index) => {
            value.key = String(index + 1);
            return value;
          })
        );
        // console.log(datas);
      }
    } catch (error) {}
  };

  const columns = [
    {
      title: "email",
      dataIndex: "email",
    },
    {
      title: "userName",
      dataIndex: "userName",
    },
    {
      title: "avatar",
      dataIndex: "avatar",
      render: (img) => <img src={img} alt="" />,
    },
    {
      title: "birthday",
      dataIndex: "birthday",
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
          edit
        </p>
      ),
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
      setSelectRow(selectedRows);
      if(JSON.stringify(selectedRows) != JSON.stringify([])){
        setIsDelete(true);
      }else{
        setIsDelete(false);
      }
    },
  };

  return (
    <MyTable className="w-9/12 mx-auto">
      <Table
        columns={columns}
        dataSource={datas}
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
      ></Table>
      <Row>
        <Col span={4}>
          <Button
            onClick={(e) => {
              setIsModalVisible(true);
              setDataRow(null);
            }}
          >
            {"add book"}
          </Button>
        </Col>
        <Col span={4} offset={4}>
          <Button type="" disabled={!isDelete} onClick={async ()=>{
            for(let i = 0;i<selectRow.length;i++){
              console.log(selectRow[i]);
              try {
                let result = await API.User.deleteUser({"_id":selectRow[i]._id});
                console.log(result);
              } catch (error) {
                console.log("xoa that bai");
              }
            }
            await callData();
          }}>Delete</Button>
        </Col>
      </Row>
      <UpdateUser
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        data={dataRow}
        handleRefresh={handleRefresh}
      ></UpdateUser>
    </MyTable>
  );
}
