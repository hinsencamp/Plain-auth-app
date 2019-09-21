import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import { FirebaseProvider } from "./context/firebase";
import Dashboard from "./components/Dashboard";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Navbar from "./components/NavBar";

import Authentication from "./hoc/auth";

function Home(props) {
  return (
    <div>
      <Navbar />
      {props.children}
    </div>
  );
}

function App() {
  return (
    <FirebaseProvider>
      <Router>
        <Switch>
          <Route path="/sign-in" component={SignIn} />
          <Route path="/sign-up" component={SignUp} />
          <Authentication>
            <Home>
              <Route
                component={({ match }) => (
                  <Route path="/" component={Dashboard} />
                )}
              />
            </Home>
          </Authentication>
        </Switch>
      </Router>
    </FirebaseProvider>
  );
}

export default App;
