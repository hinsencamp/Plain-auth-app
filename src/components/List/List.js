import React, { useContext, useState, useEffect } from "react";
import { Pane, Heading, Text, Paragraph, Button } from "evergreen-ui";
import { Link } from "react-router-dom";

import helpers from "../../helpers";

import { firebaseContext } from "../../context/firebase";

function List() {
  const firebase = useContext(firebaseContext);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase.db.collection("events").onSnapshot(
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

    return function cleanup() {
      unsubscribe();
    };
  }, []);

  function renderEvents() {
    return (
      <Pane padding={30}>
        <Heading size={800} marginTop={0}>
          Upcoming Events
        </Heading>
        <ul className="event-list">
          {events.map((event, index) => {
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
                  <Paragraph size={300} marginTop="default">
                    <Link
                      style={{ textDecoration: "none" }}
                      to={`event/:${event.id}`}
                    >
                      <Text color="green">Join the event...</Text>
                    </Link>
                  </Paragraph>
                </Pane>
              </li>
            );
          })}
        </ul>
      </Pane>
    );
  }

  return <div>{renderEvents()}</div>;
}

export default List;
