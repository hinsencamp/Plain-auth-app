import React, { useContext } from "react";
import { Popover, Button, Menu, Position, Avatar } from "evergreen-ui";
import { Link } from "react-router-dom";

import { firebaseContext } from "../../context/firebase";

import "./style.scss";

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
          <Link to="/">Logo</Link>
        </div>
        <nav>
          <ul className="nav-list">
            <li>
              <Link to="/sign-up">Sign Up</Link>
            </li>
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
