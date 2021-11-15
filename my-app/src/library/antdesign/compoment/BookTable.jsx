import { Table } from "antd";
import Form from "rc-field-form/es/Form";
import styled from "styled-components";
import API from "../../../callAPI";
import React, { useState, useEffect } from "react";

const MyTable = styled.div`
  .ant-table-cell {
    img {
      height: 100px;
      width: 100px;
    }
  }
`;

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
    render: (year) => <img src={year} alt="" />,
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
];

const datas = [
  {
    name: "dung",
    book: "hoa",
    year: "https://avi.edu.vn/wp-content/uploads/2019/11/london-2393098.jpg",
  },
];
export default function BookTable() {
  const [datas, setDatas] = useState([]);
  useEffect(() => {
    callData();
  }, []);
  const callData = async () => {
    try {
      const myData = await API.Book.getAll();
      if (myData.status == 200) {
        setDatas(myData.data.map((value,index)=>{
          value.key = String(index+1);
          return value;
        }));
        // console.log(datas);
      }
    } catch (error) {}
  };
  return (
    <MyTable className="w-9/12 mx-auto">
      <Table  columns={columns} dataSource={datas}></Table>
    </MyTable>
  );
}
