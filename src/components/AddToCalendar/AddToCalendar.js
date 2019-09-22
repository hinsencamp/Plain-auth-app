// http: //carlsednaoui.github.io/add-to-calendar-buttons/generator/generator.html

import React, { useContext, useState, useEffect } from "react";
import { Pane, Heading, Text, Paragraph, Button } from "evergreen-ui";

function Dialog(props) {
  return (
    <Pane>
      <Dialog
        isShown={props.isShown}
        title="Success intent"
        intent="sucess"
        onCloseComplete={() => props.setIsOpen(false)}
        confirmLabel="Attending Roundtable"
      >
        Roundtable
      </Dialog>
      {/* Attend */}
      {/* <Button onClick={() => props.setIsOpen(true)}>Show Dialog</Button> */}
    </Pane>
  );
}

function AddToGoogle(props) {
  const params = {
    text: "",
    DTSTART: "20291231T210000Z",
    DTEND: "20300101T205900Z",
    details: "",
    location: ""
  };

  // encode for queryString

  const queryString = `https://www.google.com/calendar/render?action=TEMPLATE&amp;text=${
    params.text
  };dates=${params.DTSTART / params.DTEND}&amp;details=${
    params.details
  }&amp;location=${params.location};sprop=&amp;sprop=name:`;

  return (
    <Button>
      <a target="_blank" href={queryString}>
        Google Calendar
      </a>
    </Button>
  );
}

export default AddToGoogle;

function addToIcal() {
  const params = {
    DTSTART: "20291231T210000Z",
    DTEND: "20300101T205900Z",
    SUMMARY: "",
    DESCRIPTION: "",
    LOCATION: ""
  };

  const queryString = `data:text/calendar;charset=utf8,BEGIN:VCALENDAR
    VERSION:2.0
    BEGIN:VEVENT
    URL:https://carlsednaoui.github.io/add-to-calendar-buttons/generator/generator.html
    DTSTART:${params.DTSTART}
    DTEND:${params.DTEND}
    SUMMARY:${params.SUMMARY}
    DESCRIPTION:${params.DESCRIPTION}
    LOCATION:${params.LOCATION}
    END:VEVENT
    END:VCALENDAR"`;

  return (
    <Button>
      <a target="_blank" href={queryString}>
        iCal / OutLook Calendar
      </a>
    </Button>
  );
}
