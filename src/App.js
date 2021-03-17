import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import { FirebaseProvider } from "./context/firebase";
import Dashboard from "./views/Dashboard";
import Navbar from "./components/NavBar";

import Sign from "./views/Sign";

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
          <Route path="/sign-in" component={Sign.in} />
          <Route path="/sign-up" component={Sign.up} />
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
