import Compoment, { LoginForm, ViewBook1 } from "../compoments";
import styled from "styled-components";
import { ViewLstBook1 } from "../compoments";
import {Image} from "antd"
import { CATEGORY } from "../constaint";
import { Menu } from 'antd';
import { MailOutlined, AppstoreOutlined, HomeOutlined } from '@ant-design/icons';
import { Slide } from "react-slideshow-image";
const { SubMenu } = Menu;

export default function Home() {
  return (
    <div className="">
      <div>
        <Slide easing="ease">
          <div className="each-slide">
            <img
              src={`https://www.elle.vn/wp-content/uploads/2017/07/25/hinh-anh-dep-1.jpg`}
              className="w-full"
              style={{height:"450px"}}
            ></img>
          </div>
          <div className="each-slide">
            <img
              src={`https://www.elle.vn/wp-content/uploads/2017/07/25/hinh-anh-dep-1.jpg`}
              className="w-full"
              style={{height:"450px"}}
            ></img>
          </div>
          <div className="each-slide">
            <img
              src={`https://www.elle.vn/wp-content/uploads/2017/07/25/hinh-anh-dep-1.jpg`}
              className="w-full"
              style={{height:"450px"}}
            ></img>
          </div>
        </Slide>
      </div>
      {CATEGORY.map((value)=>{
        return <ViewLstBook1 category={value}></ViewLstBook1>
      })}
    </div>
  );
  // return(
  //   <Menu 
  //   // onClick={this.handleClick} selectedKeys={[current]} 
  //   mode="horizontal">
  //     <Menu.Item key="mail" icon={ <HomeOutlined />}>
  //       Navigation One
  //     </Menu.Item>
  //     <Menu.Item key="app" disabled={false} icon={<AppstoreOutlined />}>
  //       Navigation Two
  //     </Menu.Item>
  //     <Menu.Item key="alipay">
  //       <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
  //         Navigation Four - Link
  //       </a>
  //     </Menu.Item>
  //   </Menu>
  // );
}
