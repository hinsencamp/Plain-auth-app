import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import { FirebaseProvider } from "./context/firebase";
import Navbar from "./components/NavBar";

import Sign from "./views/Sign";
import Dashboard from "./views/Dashboard";
import Event from "./views/Event";

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
                  <>
                    <Route exact path="/" component={Dashboard}></Route>
                    <Route path="/event/:id" component={Event} />
                  </>
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
