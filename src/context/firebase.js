import React, { createContext } from "react";
import PropTypes from "prop-types";

import * as firebase from "firebase";

import firebaseConfig from "../../firebase-config.json";

const Context = createContext();

function withFirebase(Component) {
  function WithFirebase(props) {
    return (
      <Context.Consumer>
        {firebase => <Component {...props} firebase={firebase} />}
      </Context.Consumer>
    );
  }
  withFirebase.WrappedComponent = Component;

  withFirebase.displayName = `WithFirebase(${Component.displayName ||
    Component.name ||
    "Component"})`;

  return WithFirebase;
}

class FireBase {
  constructor(config) {
    this.app = firebase.initializeApp(config);
    this.auth = firebase.auth();
    this.db = firebase.firestore();
    this.functions = firebase.functions();
  }
}

function FirebaseProvider(props) {
  const firebaseClass = new FireBase(firebaseConfig);
  return (
    <Context.Provider
      value={{
        auth: firebaseClass.auth,
        db: firebaseClass.db,
        functions: firebaseClass.functions
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

FirebaseProvider.propTypes = {
  children: PropTypes.object
};

const firebaseContext = Context;

export { FirebaseProvider, withFirebase, firebaseContext };
