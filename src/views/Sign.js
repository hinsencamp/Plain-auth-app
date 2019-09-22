import React from "react";
import { Pane, Heading } from "evergreen-ui";
import SignIn from "./Form/in";
import SignUp from "./Form/up";
import Form from "./Form/Form";

import "./style.scss";

function Sign(props) {
  return <div className="login">{props.children}</div>;
}

Sign.in = () => (
  <Sign>
    <Heading size={900} marginBottom={30}>
      The Roundtable (Beta)
    </Heading>
    <Form redirectPath="/">
      <SignIn />
    </Form>
  </Sign>
);
Sign.up = () => (
  <Sign>
    <Heading size={900} marginBottom={30}>
      The Roundtable (Beta)
    </Heading>
    <Form>
      <SignUp />
    </Form>
  </Sign>
);

export default Sign;
