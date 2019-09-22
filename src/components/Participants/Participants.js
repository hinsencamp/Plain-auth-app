import React, { useContext, useState, useEffect } from "react";
import { Pane, Heading, Text, Paragraph, Button, Avatar } from "evergreen-ui";

import "./style.scss";

function Participants(props) {
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    let newPar = Array.apply(null, Array(props.maxMembers)).map(() => {
      return {};
    });

    props.members &&
      props.members.forEach((participant, index) => {
        newPar[index] = participant;
      });

    setParticipants(newPar);
  }, [props.members]);

  return (
    <Pane display="flex">
      {participants.map((participant, index) => {
        return participant.id ? (
          <Avatar
            key={index}
            name="user"
            marginRight={5}
            size={24}
            className="avatar-icon"
          />
        ) : (
          <div key={index} className="circle" />
        );
      })}
    </Pane>
  );
}

export default Participants;
