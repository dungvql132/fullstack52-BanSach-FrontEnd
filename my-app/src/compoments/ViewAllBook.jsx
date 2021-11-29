import React from "react";
import { Menu, Col, List, Avatar, Row } from "antd";
import API from "../callAPI";
import { Link, useParams } from "react-router-dom";
import { CATEGORY } from "../constaint";

export default function ViewAllBook() {
  let { myCategory } = useParams();
  const [data, setData] = React.useState([]);
  const [category, setCategory] = React.useState("all");
  React.useEffect(async () => {
    if (myCategory) {
      setCategory(myCategory);
    }
    console.log("category: ", category);
    await callData(myCategory);
  }, []);

  const callData = async (picked) => {
    let allBook;
    console.log("luc tim: ", category);
    if (picked) {
      if (picked == "all") {
        allBook = await API.Book.getAll();
      } else {
        console.log("luc tim: ", picked);
        allBook = await API.Book.find({
          category: picked,
        });
      }
    } else {
      if (category == "all") {
        allBook = await API.Book.getAll();
      } else {
        console.log("luc tim: ", category);
        allBook = await API.Book.find({
          category: category,
        });
      }
    }
    let myData = allBook.data.map((value) => {
      let oneObj = {
        title: value.bookName,
        avatar: value.img,
        description: value.description,
        content: value.category,
      };
      return oneObj;
    });
    setData(myData);
  };
  return (
    <Row>
      <Col span={4}>
        <Menu mode="vertical">
          <Menu.Item
            key={"" + 100 + "abc"}
            onClick={async () => {
              setCategory("all");
              setTimeout(async () => {
                await callData("all");
              }, 500);
            }}
          >
            <p>{"all"}</p>
          </Menu.Item>
          {CATEGORY.map((value, index) => {
            return (
              <Menu.Item
                key={"" + index + "abc"}
                onClick={async () => {
                  setCategory(value);
                  setTimeout(async () => {
                    await callData(value);
                  }, 500);
                }}
              >
                <p>{value}</p>
              </Menu.Item>
            );
          })}
        </Menu>
      </Col>
      <Col span={16} offset={2}>
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 3,
          }}
          dataSource={data}
          renderItem={(item) => (
            <List.Item
              key={item.title}
              extra={<img className="h-52 w-44" alt="logo" src={item.avatar} />}
            >
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={<a href={item.href}>{item.title}</a>}
                description={item.description}
              />
              {item.content}
            </List.Item>
          )}
        />
      </Col>
    </Row>
  );
}
