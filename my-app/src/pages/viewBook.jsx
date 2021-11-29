import Compoment, { LoginForm } from "../compoments";
import styled from "styled-components";
import { ViewLstBook1 } from "../compoments";
import API from "../callAPI";
import { useParams } from "react-router";
import React, { useState } from "react";
import ViewBook2 from "../compoments/ViewBook2";

export default function ViewBook() {
  const [data, setData] = useState({});
  let { _id } = useParams();
  React.useEffect(async () => {
    if (_id) {
      let result = await API.Book.find({ _id });
      console.log(result);
      console.log("vao effect");
      if(result.status == 200){
          setData(result.data[0]);
      }
    }
  },[]);
  return (
    <div className="">
      <ViewBook2 data={data}></ViewBook2>
    </div>
  );
}
