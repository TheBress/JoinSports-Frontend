import "./App.css";
import Login from "./pages/Login";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";



function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route component={Home} exact path="/" />
          <Route component={Login} exact path="/login" />
          <Route component={Register} exact path="/register" />
        </Switch>
      </Router>
    </>
  );
}

export default App;
