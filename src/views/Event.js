import React, { useContext, useState, useEffect } from "react";
import {
  Pane,
  Heading,
  Text,
  Paragraph,
  Button,
  Pill,
  Dialog,
  Popover,
  Spinner,
  Badge
} from "evergreen-ui";
import { firebaseContext } from "../context/firebase";
import AddToCalendarHOC from "react-add-to-calendar-hoc";

import Participants from "../components/Participants";
import helpers from "../helpers";

function Event(props) {
  const firebase = useContext(firebaseContext);
  const [event, setEvent] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const id = props.match.params.id.split(":");
    fetchEvent(id[1], true);
  }, []);

  function renderCalButton() {
    return (
      <div title="Add to Calendar" className="addeventatc">
        Add to Calendar
        <span class="start">
          {new Date(event.Time.from.seconds * 1000).toDateString()}
        </span>
        <span class="end">
          {new Date(event.Time.to.seconds * 1000).toDateString()}
        </span>
        <span class="timezone"> Europe/Paris</span>
        <span class="title">{event.Name}</span>
        <span class="description">{event.Description}</span>
        <span class="location">{event.Location.name}</span>
      </div>
    );
  }

  function fetchEvent(id, setIndicator) {
    let eventRef = firebase.db.collection("events").doc(id);
    let getDoc = eventRef
      .get()
      .then(doc => {
        if (!doc.exists) {
          console.log("No such document!");
        } else {
          const data = doc.data();
          setEvent({ ...data, Date: helpers.timeConverter(data.Date.seconds) });
          setIndicator && setIsLoading(false);
        }
      })
      .catch(err => {
        console.log("Error getting document", err);
      });
  }

  // check if user is already attending
  function isAttending(userId) {
    return !!event.Participants.find(({ id }) => id === userId);
  }

  function attendEvent() {
    const id = props.match.params.id.split(":");
    let attendRef = firebase.db.collection("events").doc(id[1]);
    let setWithOptions = attendRef
      .update({
        Participants: [...event.Participants, { id: "foo" }]
      })
      .then(function() {
        fetchEvent(id[1], false);
      });
  }

  function declineEvent() {
    const id = props.match.params.id.split(":");
    let attendRef = firebase.db.collection("events").doc(id[1]);
    let setWithOptions = attendRef
      .update({
        Participants: event.Participants.reduce((acc, element) => {
          console.log("element, acc", element, acc);
          return element.id === "foo" ? [...acc] : [...acc, element];
        }, [])
      })
      .then(function() {
        fetchEvent(id[1], false);
      });
  }

  return (
    <Pane display="flex" alignItems="center" justifyContent="center">
      {isLoading ? (
        <Pane
          display="flex"
          alignItems="center"
          justifyContent="center"
          marginTop={200}
        >
          <Spinner />
        </Pane>
      ) : (
        <Pane
          maxWidth={600}
          display="flex"
          margin={24}
          flexDirection="column"
          elevation={2}
        >
          <Pane float="left" padding={24}>
            <Pane
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Heading size={700} marginTop={0}>
                {event.Name}
              </Heading>
              {isAttending("foo") && (
                <Paragraph>
                  <Badge color="green">attending</Badge>
                </Paragraph>
              )}
            </Pane>

            <Text color="muted">{event.Date}</Text>
            <Paragraph>
              <a target="_blank" href={event.Location.link}>
                {event.Location.name}
              </a>
            </Paragraph>

            <Paragraph size={300} marginTop="default">
              {event.Description}
            </Paragraph>
            <Paragraph alignItems="baseline" display="flex" marginTop={5}>
              Participants
              <Pill display="inline-flex" margin={8}>
                {event.Participants.length + "/" + 10}
              </Pill>
            </Paragraph>
            <Participants members={[...event.Participants]} maxMembers={10} />
          </Pane>
          <Pane background="tint2" padding={10}>
            {!isAttending("foo") ? (
              <Button
                appearance="primary"
                intent="success"
                marginRight={5}
                onClick={() => attendEvent()}
              >
                Join
              </Button>
            ) : (
              <>
                <Button
                  appearance="minimal"
                  intent="danger"
                  marginRight={5}
                  onClick={() => declineEvent()}
                >
                  Decline
                </Button>
              </>
            )}
            {/* <Button marginRight={5} appearance="minimal" intent="success">
          Invite a Friend
        </Button> */}
            {renderCalButton()}
          </Pane>
        </Pane>
      )}
    </Pane>
  );
}

export default Event;
