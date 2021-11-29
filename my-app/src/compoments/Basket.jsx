// import Table from "rc-table/lib/Table";
import React from "react";
import API from "../callAPI";
import { MainContext } from "../context";
import { Table, Col, Button, Row } from "antd";
import {MinusOutlined,PlusOutlined} from "@ant-design/icons";

export default function Basket() {
  const { userBasket, setUserBasket } = React.useContext(MainContext);
  const [data, setData] = React.useState([]);
  const [isDelete, setIsDelete] = React.useState(false);
  const [selectRow, setSelectRow] = React.useState([]);
  const [amount, setAmount] = React.useState(0);
  const [idBill, setIdBill] = React.useState("");

  React.useEffect(async () => {
    callData();
  }, []);

  const callData = async () => {
    let myAmount = 0;
    let user = await API.Login.getCurrentUser();
    let myData = [];
    let myBill = await API.Bill.find({
      "idBuyer": user.data._id,
      "type": "basket",
    });
    console.log("my bill: ",myBill);
    if (myBill.data.length != 0) {
      // idBill = myBill.data[0]._id;
      setIdBill(myBill.data[0]._id);
      myData = myBill.data[0].idBooks.map((value, index) => {
        value.key = String(index + 1);
        value.count = myBill.data[0].count[index];
        myAmount += Number(myBill.data[0].count[index])*Number(value.cost);
        return value;
      });
      console.log("my data: ", myData);
      setAmount(myAmount);
      setData(myData);
    }else{
      setData([]);
      setAmount(0);
    }
  };

  const columns = [
    {
      title: "author",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "img",
      dataIndex: "img",
      render: (img) => <img src={img} alt="" />,
    },
    {
      title: "cost",
      dataIndex: "cost",
    },
    {
      title: "count",
      dataIndex: "count",
      render: (count, row) => (
        <span className="flex">
          <Button
          shape="circle"
          icon={<MinusOutlined></MinusOutlined>}
            onClick={async () => {
              if (Number(count) > 1) {
                let user = await API.Login.getCurrentUser();
                let myBill = await API.Bill.find({
                  idBuyer: user.data._id,
                  type: "basket",
                });
                console.log("giam row: ", row);
                for (let i = 0; i < myBill.data[0].idBooks.length; i++) {
                  if (myBill.data[0].idBooks[i]._id == row._id) {
                    myBill.data[0].count[i] = Number(
                      myBill.data[0].count[i] - 1
                    );
                    break;
                  }
                }
                let rerult = await API.Bill.update(
                  { _id: myBill.data[0]._id },
                  myBill.data[0]
                );
                callData();
              }
            }}
          >
          </Button>
          <h3 className="mx-4 text-xl">{count}</h3>
          <Button
          shape="circle"
          icon={<PlusOutlined/>}
            onClick={async () => {
              if (Number(count) >= 1) {
                let user = await API.Login.getCurrentUser();
                let myBill = await API.Bill.find({
                  idBuyer: user.data._id,
                  type: "basket",
                });
                console.log("tang row: ", row);
                for (let i = 0; i < myBill.data[0].idBooks.length; i++) {
                  if (myBill.data[0].idBooks[i]._id == row._id) {
                    myBill.data[0].count[i] = Number(
                      myBill.data[0].count[i] + 1
                    );
                    break;
                  }
                }
                let rerult = await API.Bill.update(
                  { _id: myBill.data[0]._id },
                  myBill.data[0]
                );
                callData();
              }
            }}
          >
          </Button>
        </span>
      ),
    },
    {
      title: "category",
      dataIndex: "category",
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
      if (JSON.stringify(selectedRows) != JSON.stringify([])) {
        setIsDelete(true);
      } else {
        setIsDelete(false);
      }
    },
  };

  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
      ></Table>
      <Row>
      <Col span={4}>
        <Button
          type=""
          disabled={!isDelete}
          onClick={async () => {
            let user = await API.Login.getCurrentUser();
            let myBill = await API.Bill.find({
              idBuyer: user.data._id,
              type: "basket",
            });
            for (let i = 0; i < selectRow.length; i++) {
              console.log("row: ", selectRow[i]._id);
              for (let j = 0; j < myBill.data[0].idBooks.length; j++) {
                console.log("delete bill: ", myBill.data[0].idBooks[j]._id);
                if (myBill.data[0].idBooks[j]._id == selectRow[i]._id) {
                  myBill.data[0].count.splice(j, 1);
                  myBill.data[0].idBooks.splice(j, 1);
                  break;
                }
              }
            }
            let rerult = await API.Bill.update(
              { _id: myBill.data[0]._id },
              myBill.data[0]
            );
            callData();
          }}
        >
          Delete
        </Button>
      </Col>
      <Col span={6} offset={6}>
        Amount:{amount}
      </Col>
      <Col span={4} offset={4}>
        <Button onClick={async ()=>{
          console.log("thanh toan");
          console.log("id bill: ",idBill);
          let update = await API.Bill.update({"_id":idBill},{"type":"amounted",cost:amount});
          console.log("update: ",update);
          await callData();
        }}>thanh toan</Button>
      </Col>
      </Row>
    </div>
  );
}
