import Compoment,{ForgotPass} from "../compoments";
import styled from "styled-components";
import TypePages from "./typePage";

export default function LoginPage() {
    console.log("vao trang login");
  return (
    <TypePages.NotLogin>
      <div className="max-w-xl mx-auto sm:w-10/12 p-5 h-screen">
        <ForgotPass></ForgotPass>
      </div>
    </TypePages.NotLogin>
  );
}
