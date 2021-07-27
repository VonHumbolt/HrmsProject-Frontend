import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { Container, Icon, Menu } from "semantic-ui-react";
import SignedOut from "./SignedOut";
import SignedIn from "./SignedIn";
import FavoriteJobAdverts from "./FavoriteJobAdverts";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserInfo } from "../store/actions/actions";

export default function Navi() {

  const user =  useSelector(state => state.user)

  const dispatch = useDispatch()

  const history = useHistory();

  function handleSignIn() {
    history.push("/login")
  }

  function handleSignOut() {
    dispatch(deleteUserInfo(user.userInfo))
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
            {user.userInfo.userId !== undefined ? <SignedIn signedOut={handleSignOut} /> : <SignedOut signedIn={handleSignIn} /> }
            {user.userInfo.userId !== undefined ? <FavoriteJobAdverts/>: null }

            
          </Menu.Menu>
  
        </Container>
      </Menu>
    </div>
  );
}
