import './index.css';
import { RegisterPage, LoginPage, Home, ViewBook } from "./pages";
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
          <Route exact path="/viewbook/:_id">
            <ViewBook></ViewBook>
          </Route>
          <Route path="*">
            <h1>Not Found 404</h1>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
