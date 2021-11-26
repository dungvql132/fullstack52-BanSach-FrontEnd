import Compoment,{LoginForm} from "../compoments";
import styled from "styled-components";
import { ViewLstBook1 } from "../compoments";

export default function Home() {
  
  return (
      <div className="">
          <div>home page</div>
        <ViewLstBook1 category="horror"></ViewLstBook1>
      </div>
  );
}
