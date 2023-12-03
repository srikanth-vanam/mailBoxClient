import React from "react";
import SignUP from "./components/SignUp/SignUP";
import Home from "./components/Home/Home";
import { Route, useParams } from "react-router-dom/cjs/react-router-dom.min";
import MailSender from "./components/mail_sender/MailSender";
import MailViewer from "./components/inbox/MailView";

function App() {
  // const { itemId } = useParams();
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
      <Route path={`/mailView/:itemId`}>
        <MailViewer />
      </Route>

    </>
  );
}

export default App;
