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
    <div style={{width: '90%' , margin : '0 auto'}}>
      <div>
        <Slide easing="ease">
          <div className="each-slide">
            <img
              src={`https://salt.tikicdn.com/cache/w1080/ts/banner/7a/d9/40/73a49c3cb3ef82977720075e504ec413.png.webp`}
              className="w-full"
              style={{height:"450px"}}
            ></img>
          </div>
          <div className="each-slide">
            <img
              src={`https://salt.tikicdn.com/cache/w1080/ts/banner/a1/96/69/e7c515696abe7d198764b60fbc7d2dad.png.webp`}
              className="w-full"
              style={{height:"450px"}}
            ></img>
          </div>
          <div className="each-slide">
            <img
              src={`https://salt.tikicdn.com/cache/w1080/ts/banner/5d/be/84/8775d96ec344c29e15cba1cd3d9345b4.png.webp`}
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
