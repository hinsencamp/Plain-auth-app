import React, { useContext, useState, useEffect } from "react";
import { Pane, Heading, Text, Paragraph, Button, Spinner } from "evergreen-ui";
import { firebaseContext } from "../context/firebase";

import Participants from "../components/Participants";
import helpers from "../helpers";

function Event(props) {
  const firebase = useContext(firebaseContext);
  const [event, setEvent] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // check if user is already attending
  function isAttending() {
    //
  }

  function attendEvent() {
    const id = props.match.params.id.split(":");
    let attendRef = firebase.db.collection("events").doc(id[1]);
    let setWithOptions = attendRef.update({
      Participants: [...event.Participants, { id: "foo" }]
      // get user details: name, id
    });
  }

  function declineEvent() {
    // must have attended Event before.
    //
  }

  useEffect(() => {
    const id = props.match.params.id.split(":");
    let eventRef = firebase.db.collection("events").doc(id[1]);
    let getDoc = eventRef
      .get()
      .then(doc => {
        if (!doc.exists) {
          console.log("No such document!");
        } else {
          const data = doc.data();
          setEvent({ ...data, Date: helpers.timeConverter(data.Date.seconds) });
          setIsLoading(false);
        }
      })
      .catch(err => {
        console.log("Error getting document", err);
      });
  }, []);

  return isLoading ? (
    <Pane
      display="flex"
      alignItems="center"
      justifyContent="center"
      marginTop={200}
    >
      <Spinner />
    </Pane>
  ) : (
    <Pane display="flex" margin={24} flexDirection="column" elevation={1}>
      <Pane float="left" padding={24}>
        <Heading size={700} marginTop={0}>
          {event.Name}
        </Heading>
        <Text color="muted">{event.Date}</Text>
        <Paragraph size={300} marginTop="default">
          {event.Description}
        </Paragraph>
        <Paragraph>Participants</Paragraph>
        <Participants members={[...event.Participants]} maxMembers={10} />
      </Pane>
      <Pane background="tint2" padding={10}>
        <Button onClick={() => attendEvent()}>Join</Button>
        <Button>Decline</Button>
        <Button>invite a Friend</Button>
      </Pane>
    </Pane>
  );
}

export default Event;
