import "./App.css";
import Login from "./pages/Login";
import { Switch, Route, BrowserRouter as Router,Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";




function App() {


  return (
    <>
      <Router>
        <Switch>
          <Route component={Home} exact path="/" />
          <Route component={Login} exact path="/login" />
          <Route component={Register} exact path="/register" />
          <Route component={ForgotPassword} exact path="/forgotPassword" />
          <Route component={Profile} exact path="/profile" />
          <Redirect to="/" />
        </Switch>
      </Router>
    </>
  );
}

export default App;
