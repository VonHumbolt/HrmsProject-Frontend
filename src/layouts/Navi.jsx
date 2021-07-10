import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Container, Icon, Menu } from "semantic-ui-react";
import SignedOut from "./SignedOut";
import SignedIn from "./SignedIn";
import FavoriteJobAdverts from "./FavoriteJobAdverts";

export default function Navi() {

  const [isAuthenticated, setIsAuthenticated] = useState(false)

  function handleSignIn() {
    setIsAuthenticated(true)
  }

  function handleSignOut() {
    setIsAuthenticated(false)
  }
  return (
    <div>
      <Menu stackable inverted>
        <Container>
          <Menu.Item>
            <Icon name="chart line" />
            HRMS
          </Menu.Item>

          <Menu.Item as={NavLink} to="/jobAdverts" name="features">Jobs</Menu.Item>

          <Menu.Item as={NavLink} to="/employers" name="testimonials">Employers</Menu.Item>

          <Menu.Item as={NavLink} to="/resumes" name="testimonials">Resumes</Menu.Item>

          <Menu.Menu position="right">
            {isAuthenticated ? <SignedIn signedOut={handleSignOut} /> : <SignedOut signedIn={handleSignIn} /> }
            {isAuthenticated ? <FavoriteJobAdverts/>: null }

            
          </Menu.Menu>
  
        </Container>
      </Menu>
    </div>
  );
}
