import React from "react";

import SignIn from "./Form/in";
import SignUp from "./Form/up";
import Form from "./Form/Form";

import "./style.scss";

function Sign(props) {
  return <div className="login">{props.children}</div>;
}

Sign.in = () => (
  <Sign>
    <Form redirectPath="/">
      <SignIn />
    </Form>
  </Sign>
);
Sign.up = () => (
  <Sign>
    <Form>
      <SignUp />
    </Form>
  </Sign>
);

export default Sign;
