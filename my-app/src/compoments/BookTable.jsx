import { Table, Button, Row, Col } from "antd";
import Form from "rc-field-form/es/Form";
import styled from "styled-components";
import API from "../callAPI";
import React, { useState, useEffect } from "react";
import AddBook from "./AddBook";
import SearchForm from "./SearchForm";

const MyTable = styled.div`
  .ant-table-cell {
    img {
      height: 100px;
      width: 100px;
    }
  }
`;

export default function BookTable() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dataRow, setDataRow] = useState(null);
  const [datas, setDatas] = useState([]);
  const [isDelete, setIsDelete] = useState(false);
  const [selectRow, setSelectRow] = useState([]);
  const [searchText, setSearchText] = useState('');

  const handleRefresh = () => {
    callData();
  };
  useEffect(async () => {
    await callData();
  }, []);

  const handleSearch = async()=>{
    const user = await API.Login.getCurrentUser();
    let myData = await API.Book.find({
      "idProducer":user.data._id
    });
    let newData = myData.data.filter((value)=>{
      return value.bookName.indexOf(searchText)!= -1;
    })
    console.log("searchText: ",searchText);
    console.log("new data search: ",newData);
    setDatas(newData);
  }

  const callData = async () => {
    try {
      const user = await API.Login.getCurrentUser();
      let myData;
      if(user.data.kindPerson == "admin"){
        myData = await API.Book.getAll();
      }else{
        myData = await API.Book.find({
          "idProducer":user.data._id
        });
      }
      if (myData.status == 200) {
        setDatas(
          myData.data.map((value, index) => {
            value.key = String(index + 1);
            return value;
          })
        );
        console.log("datas: ",myData);
      }
    } catch (error) {}
  };

  const columns = [
    {
      title: "book name",
      dataIndex: "bookName",
    },
    {
      title: "author",
      dataIndex: "author",
    },
    {
      title: "img",
      dataIndex: "img",
      render: (img) => <img src={img} alt="" />,
    },
    {
      title: "year",
      dataIndex: "year",
    },
    {
      title: "cost",
      dataIndex: "cost",
    },
    {
      title: "category",
      dataIndex: "category",
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
      <div className='my-6'>
      <SearchForm handleSearch={handleSearch} setSearchText={setSearchText}></SearchForm>
      </div>
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
                let result = await API.Book.deleteBook({...selectRow[i]});
                console.log(result);
              } catch (error) {
                console.log("xoa that bai");
              }
            }
            await callData();
          }}>Delete</Button>
        </Col>
      </Row>
      <AddBook
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        data={dataRow}
        handleRefresh={handleRefresh}
      ></AddBook>
    </MyTable>
  );
}
