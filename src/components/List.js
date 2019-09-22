import React, { useContext, useState, useEffect } from "react";
import { Pane, Heading, Text, Paragraph, Button } from "evergreen-ui";
import { Link } from "react-router-dom";

import helpers from "../helpers";

import { firebaseContext } from "../context/firebase";

function List() {
  const firebase = useContext(firebaseContext);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    console.log("fetch data");
    firebase.db.collection("events").onSnapshot(
      snapshot => {
        const events = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            ...data,
            id: doc.id,
            Date: helpers.timeConverter(data.Date.seconds)
          };
        });
        setEvents(events);
      },
      err => console.log(err.message)
    );
  }, []);

  function renderEvents() {
    return (
      <ul>
        {events.map((event, index) => {
          console.log(event);
          return (
            <li key={index}>
              <Pane
                elevation={1}
                float="left"
                margin={24}
                padding={24}
                display="flex"
                flexDirection="column"
              >
                <Heading size={700} marginTop={0}>
                  {event.Name}
                </Heading>
                <Text color="muted">{event.Date}</Text>
                <Paragraph size={300} marginTop="default">
                  {event.Description}
                </Paragraph>

                <Link to={`event/:${event.id}`}>...join</Link>
              </Pane>
            </li>
          );
        })}
      </ul>
    );
  }

  return <div>{renderEvents()}</div>;
}

export default List;

// // listen for auth status changes
// auth.onAuthStateChanged(user => {
//   if (user) {
//     user.getIdTokenResult().then(idTokenResult => {
//       user.admin = idTokenResult.claims.admin;
//       setupUI(user);
//     });
//     db.collection("guides").onSnapshot(
//       snapshot => {
//         setupGuides(snapshot.docs);
//       },
//       err => console.log(err.message)
//     );
//   } else {
//     setupUI();
//     setupGuides([]);
//   }
// });

// // create new guide
// const createForm = document.querySelector("#create-form");
// createForm.addEventListener("submit", e => {
//   e.preventDefault();
//   db.collection("guides")
//     .add({
//       title: createForm.title.value,
//       content: createForm.content.value
//     })
//     .then(() => {
//       // close the create modal & reset form
//       const modal = document.querySelector("#modal-create");
//       M.Modal.getInstance(modal).close();
//       createForm.reset();
//     })
//     .catch(err => {
//       console.log(err.message);
//     });
// });
