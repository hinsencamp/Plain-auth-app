import React, { useContext, useState } from "react";
import { Redirect, withRouter } from "react-router-dom";
import { FormField, TextInput, Button, Pane } from "evergreen-ui";
import { firebaseContext } from "../context/firebase";

function SignIn(props) {
  const firebase = useContext(firebaseContext);
  const [userInput, setUserInput] = useState({ user: "", pw: "" });
  const [forceRedirect, setForceRedirect] = useState(false);

  function handleLogin() {
    firebase.auth
      .signInWithEmailAndPassword(userInput.user, userInput.pw)
      .then(cred => {
        console.log(cred);
        // close the signup modal & reset form
        setUserInput({});
        setForceRedirect(true);
      })
      .catch(err => {
        console.log(err);
      });
  }

  function handleRedirect(localHtml) {
    return forceRedirect ? (
      <Redirect
        to={{
          pathname: "/",
          state: { referrer: props.location.pathname }
        }}
        push={true}
      />
    ) : (
      localHtml
    );
  }

  return handleRedirect(
    <Pane display="flex" flexDirection="column" border="default" padding={16}>
      <FormField label="Login">
        <TextInput
          margin={10}
          inputheight={36}
          name="text-input-name"
          autoFocus={true}
          required
          appearance="neutral"
          type="email"
          placeholder="email"
          label="Your email-address"
          onChange={e => setUserInput({ ...userInput, user: e.target.value })}
        />
        <TextInput
          required
          margin={10}
          inputheight={36}
          appearance="neutral"
          label="Your Password"
          type="password"
          placeholder="Password"
          onChange={e => setUserInput({ ...userInput, pw: e.target.value })}
        />
      </FormField>
      <Pane>
        {/* <Button
          appearance="minimal"
          onClick={close}
          marginLeft={240}
          marginRight={8}
        >
          Cancel
        </Button> */}
        <Button
          appearance="primary"
          marginLeft={8}
          marginRight={16}
          height={24}
          intent="success"
          onClick={() => handleLogin()}
        >
          Login
        </Button>
      </Pane>
    </Pane>
  );
}

export default withRouter(SignIn);
