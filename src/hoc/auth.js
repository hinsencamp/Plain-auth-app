// // listen for auth status changes

import React, { useState, useEffect, useContext } from "react";
import { Redirect, withRouter } from "react-router-dom";

import { firebaseContext } from "../context/firebase";

function Authentication(props) {
  const [forceRedirect, setForceRedirect] = useState(false);
  const firebase = useContext(firebaseContext);

  useEffect(() => {
    checkStateChange();
  }, []);

  function checkStateChange() {
    return firebase.auth.onAuthStateChanged(user => {
      if (user) {
        // allow access
        console.log("user login");
      } else {
        // not allowed.
        setForceRedirect(true);
      }
    });
  }

  return forceRedirect ? (
    <Redirect
      to={{
        pathname: "/sign-in",
        state: { referrer: props.location.pathname }
      }}
      push={true}
    />
  ) : (
    props.children
  );
}

export default withRouter(Authentication);
