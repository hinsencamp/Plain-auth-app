import React, { useContext, useState } from "react";
import {
  FormField,
  TextInput,
  Heading,
  Button,
  Pane,
  TextInputField
} from "evergreen-ui";

function SignIn(props) {
  return (
    <Pane
      display="flex"
      borderRadius={3}
      flexDirection="column"
      border="default"
      width={440}
    >
      <Heading size={600} flex={1} padding={16}>
        Login
      </Heading>
      <FormField
        display="flex"
        flexDirection="column"
        padding={32}
        flex={1}
        label=""
      >
        <TextInputField
          required
          margin={10}
          inputheight={36}
          name="text-input-name"
          autoFocus={true}
          appearance="neutral"
          type="email"
          label="Email-Address"
          onChange={e =>
            props.setUserInput({ ...props.userInput, user: e.target.value })
          }
        />
        <TextInputField
          required
          margin={10}
          inputheight={36}
          appearance="neutral"
          label="Password"
          type="password"
          onChange={e =>
            props.setUserInput({ ...props.userInput, pw: e.target.value })
          }
        />
      </FormField>
      <Pane background="tint2" padding={10}>
        <Button
          appearance="primary"
          marginLeft={8}
          marginRight={16}
          intent="success"
          onClick={() => props.handleLogIn()}
        >
          Login
        </Button>
      </Pane>
    </Pane>
  );
}

export default SignIn;
