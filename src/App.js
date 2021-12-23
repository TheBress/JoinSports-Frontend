import "./App.css";
import Login from "./pages/Login";
import {
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import CreateAd from "./pages/CreateAd";
import YourAds from "./pages/MyAds";
import MyCalendar from "./pages/MyCalendar";
import AllAds from "./pages/AllAds";
import AdData from "./pages/AdData";
import UsersProfiles from "./pages/UsersProfiles";

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
          <Route component={CreateAd} exact path="/createad" />
          <Route component={YourAds} exact path="/yourads" />
          <Route component={MyCalendar} exact path="/mycalendar" />
          <Route component={AllAds} exact path="/allads" />
          <Route component={AdData} exact path="/ad/:id" />
          <Route component={UsersProfiles} exact path="/user/:id" />

          <Redirect to="/" />
        </Switch>
      </Router>
    </>
  );
}

export default App;
