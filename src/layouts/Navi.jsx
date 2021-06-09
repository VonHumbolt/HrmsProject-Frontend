import React from "react";
import { Container, Icon, Menu, Button } from "semantic-ui-react";

export default function Navi() {
  return (
    <div>
      <Menu stackable inverted>
        <Container>
          <Menu.Item>
            <Icon name="chart line" />
            HRMS
          </Menu.Item>

          <Menu.Item name="features">Jobs</Menu.Item>

          <Menu.Item name="testimonials">Employers</Menu.Item>

          <Menu.Item name="testimonials">Resumes</Menu.Item>

          <Menu.Item position="right" name="sign-in">Sign up</Menu.Item>
          <Menu.Item  name="register">Register</Menu.Item>
        </Container>
      </Menu>
    </div>
  );
}
