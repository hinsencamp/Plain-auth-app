import React, { useContext, useState, Children, cloneElement } from "react";
import { Redirect, withRouter } from "react-router-dom";
// import { FormField, TextInput, Button, Pane } from "evergreen-ui";
import { firebaseContext } from "../../context/firebase";

function RedirectComponent(props) {
  return props.forceRedirect && props.redirectPath ? (
    <Redirect
      to={{
        pathname: props.redirectPath,
        state: { referrer: props.location.pathname }
      }}
      push={true}
    />
  ) : (
    props.children
  );
}

const HandleRedirect = withRouter(RedirectComponent);

function Form(props) {
  const firebase = useContext(firebaseContext);
  const [userInput, setUserInput] = useState({ user: "", pw: "" });
  const [forceRedirect, setForceRedirect] = useState(false);

  function handleLogIn() {
    firebase.auth
      .signInWithEmailAndPassword(userInput.user, userInput.pw)
      .then(cred => {
        setUserInput({});
        setForceRedirect(true);
      })
      .catch(err => {
        console.log(err);
      });
  }

  function handleSignUp() {
    firebase.auth
      .createUserWithEmailAndPassword(userInput.user, userInput.pw)
      .then(cred => {
        return firebase.db
          .collection("users")
          .doc(cred.user.uid)
          .set({
            bio: signupForm["signup-bio"].value
          });
      })
      .then(() => {
        setUserInput({});
        setForceRedirect(true);
      })
      .catch(err => {
        console.log(err);
      });
  }

  function childrenWithMethods() {
    return Children.map(props.children, (child, idx) => {
      return cloneElement(child, {
        handleLogIn,
        handleSignUp,
        userInput,
        setUserInput,
        forceRedirect
      });
    });
  }

  return (
    <HandleRedirect
      forceRedirect={forceRedirect}
      redirectPath={props.redirectPath}
    >
      {childrenWithMethods()}
    </HandleRedirect>
  );
}

export default Form;
