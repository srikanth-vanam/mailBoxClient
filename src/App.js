import React from "react";
import SignUP from "./components/SignUp/SignUP";
import Home from "./components/Home/Home";
import { Route } from "react-router-dom/cjs/react-router-dom.min";

function App() {
  return (
    <>
      <Route exact path="/">
        <SignUP />
      </Route>
      <Route path="/home">
        <Home />
      </Route>
    </>
  );
}

export default App;
