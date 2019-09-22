import React, { useContext } from "react";
import {
  Popover,
  Pane,
  Text,
  Menu,
  Button,
  Position,
  Avatar
} from "evergreen-ui";
import { Link } from "react-router-dom";

import { firebaseContext } from "../../context/firebase";

import "./style.scss";

function InviteMember() {
  return (
    <Popover
      position={Position.BOTTOM_LEFT}
      content={
        <Pane
          padding={20}
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          <Text>
            To invite someone to the roundtable you can share your private
            invitation link:
          </Text>
          {/* Links can finally added when URL is known */}
        </Pane>
      }
    >
      <Button marginRight={16} appearance="minimal" intent="success">
        Invite a Member
      </Button>
    </Popover>
  );
}

function UserDropDown() {
  const firebase = useContext(firebaseContext);
  return (
    <Popover
      position={Position.BOTTOM_LEFT}
      content={
        <Menu>
          <Menu.Group>
            {/* <Menu.Item onSelect={() => toaster.notify("Share")}>
              Share...
            </Menu.Item>
            <Menu.Item onSelect={() => toaster.notify("Move")}>
              Move...
            </Menu.Item>
            <Menu.Item
              onSelect={() => toaster.notify("Rename")}
              secondaryText="⌘R"
            >
              Rename...
            </Menu.Item> */}
          </Menu.Group>
          <Menu.Divider />
          <Menu.Group>
            <Menu.Item onSelect={() => firebase.auth.signOut()} intent="danger">
              Logout
            </Menu.Item>
          </Menu.Group>
        </Menu>
      }
    >
      <Avatar name="user" size={30} className="avatar-icon" />
    </Popover>
  );
}

function NavBar() {
  return (
    <section className="navigation">
      <div className="nav-container">
        <div className="brand">
          <Link to="/">The Roundtable (Beta)</Link>
        </div>
        <nav>
          <ul className="nav-list">
            <li>{/* <Link to="/sign-up">Sign Up</Link> */}</li>
            {/* <li>
              <InviteMember></InviteMember>
            </li> */}
            <li className="avatar">
              <UserDropDown></UserDropDown>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  );
}

export default NavBar;
