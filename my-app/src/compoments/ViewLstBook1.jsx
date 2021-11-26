import React from "react";
import { ViewBook1 } from ".";
import { List, Card } from "antd";
import API from "../callAPI";
import styled from "styled-components";

const MyList = styled.div`
  .ant-list.ant-spin-nested-loading.ant-spin-container.ant-row{
    overflow-x: auto;
  }
  .ant-list{
    overflow-x: auto;
    height: 340px;
    width: auto;
  }
`

export default function ViewLstBook1({ category }) {
  const [lstBook, setLstBook] = React.useState([]);
  React.useEffect(async () => {
    let myLstBook = await API.Book.find({ category });
    console.log(myLstBook);
    setLstBook(myLstBook.data);
  }, []);
  return (
    <MyList>
    <div>
      <div>{category}</div>
      <div className>
        <List
        split={false}
        grid={{ gutter: 16 }}
        dataSource={lstBook}
        renderItem={item=>(
          <List.Item>
            <Card title={item.bookName}><ViewBook1 data={item}></ViewBook1></Card>
          </List.Item>
        )}
        >
        </List>
      </div>
    </div>
    </MyList>
  );
}
