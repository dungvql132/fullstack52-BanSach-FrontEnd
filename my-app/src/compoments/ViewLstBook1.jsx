import React from "react";
import { ViewBook1 } from ".";
import { List, Card } from "antd";
import API from "../callAPI";
import styled from "styled-components";
import { Typography } from 'antd';
import { Link } from "react-router-dom";
import {DoubleRightOutlined} from "@ant-design/icons"

const { Title } = Typography;

const MyList = styled.div`
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
    <div >
    <Title level={3}><Link to={"/viewallbook/"+category} ><p className='text-black'>{category} <DoubleRightOutlined /></p></Link></Title>
      <div className>
        <List
        split={false}
        grid={{ gutter: 16, column:7 }}
        dataSource={lstBook}
        renderItem={item=>(
          <List.Item>
            <ViewBook1 data={item}></ViewBook1>
          </List.Item>
        )}
        >
        </List>
      </div>
    </div>
    </MyList>
  );
}
