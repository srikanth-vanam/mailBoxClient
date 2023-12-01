import React from "react";
import SignUP from "./components/SignUp/SignUP";
import Home from "./components/Home/Home";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import SideBar from "./components/sidebar/Sidebar";
import MailSender from "./components/mail_sender/MailSender";

function App() {
  return (
    <>
      <Route exact path="/">
        <SignUP />
      </Route>
      <Route path="/home">
        <Home />
      </Route>
      <Route path="/compose">
        <MailSender />
      </Route>

    </>
  );
}

export default App;
