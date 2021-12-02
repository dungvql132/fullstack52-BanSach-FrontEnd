import './index.css';
import { RegisterPage, LoginPage, Home, ViewBook, BasketPage, BillPage, MySelfPage } from "./pages";
import { Link, Switch, BrowserRouter as Router, Route, Redirect } from "react-router-dom"
import Compoment from "./compoments"

function App() {
  return (
    <Router>
      <div>
        <Compoment.Header></Compoment.Header>
        <Switch>
          <Route exact path="/">
            <Home></Home>
          </Route>
          <Route exact path="/login">
            <LoginPage></LoginPage>
          </Route>
          <Route exact path="/register">
            <RegisterPage></RegisterPage>
          </Route>
          <Route exact path="/usertable">
            <Compoment.UserTable></Compoment.UserTable>
          </Route>
          <Route exact path="/booktable">
            <Compoment.BookTable></Compoment.BookTable>
          </Route>
          <Route exact path="/basket">
            <BasketPage></BasketPage>
          </Route>
          <Route exact path="/bill">
            <BillPage></BillPage>
          </Route>
          <Route exact path="/myself">
            <MySelfPage></MySelfPage>
          </Route>
          <Route exact path="/viewbook/:_id">
            <ViewBook></ViewBook>
          </Route>
          <Route exact path="/viewallbook/:myCategory">
            <Compoment.ViewAllBook></Compoment.ViewAllBook>
          </Route>
          <Route exact path="/viewallbook/">
            <Compoment.ViewAllBook></Compoment.ViewAllBook>
          </Route>
          <Route exact path="/forgotpass/">
            <Compoment.ForgotPass></Compoment.ForgotPass>
          </Route>
          <Route path="*">
            <h1>Not Found 404</h1>
          </Route>
        </Switch>
        <footer>
          <Compoment.Footer></Compoment.Footer>
        </footer>
      </div>
    </Router>
  );
}

export default App;
