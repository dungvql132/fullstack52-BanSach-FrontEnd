import './index.css';
import { RegisterPage, LoginPage } from "./pages";
import { Link, Switch, BrowserRouter as Router, Route, Redirect } from "react-router-dom"
import { AddBook,BookTable } from "./library/antdesign/compoment"

function App() {
  return (
    <Router>
      <div>
        <Link to="/login" style={{ marginRight: "10px" }}>login</Link>
        <Link to="/register" style={{ marginRight: "10px" }}>register</Link>
        <Link to="/addbook" style={{ marginRight: "10px" }}>addbook</Link>
        <Link to="/booktable" style={{ marginRight: "10px" }}>booktable</Link>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/login">
            <LoginPage></LoginPage>
          </Route>
          <Route exact path="/register">
            <RegisterPage></RegisterPage>
          </Route>
          <Route exact path="/addbook">
            <AddBook></AddBook>
          </Route>
          <Route exact path="/booktable">
            <BookTable></BookTable>
          </Route>
          <Route path="*">
            <h1>Not Found 404</h1>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
function Home() {
  return <h1>Home</h1>
}

export default App;
