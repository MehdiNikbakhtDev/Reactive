import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button, Container, Menu, Image, Dropdown } from 'semantic-ui-react'
import { useStore } from '../stores/store';
//import { useStore } from '../stores/store';

export default observer(function NavBar() {
  const { userStore: { user, logout } } = useStore();

  //const {activityStore}=useStore();


  return (
    <Menu inverted fixed='top'>
      <Container>
        <Menu.Item as={NavLink} to='/' exact header>
          <img src="/assets/logo.png" alt="logo" style={{ marginRight: '10px' }} />
          Reactivties
        </Menu.Item>
        <Menu.Item as={NavLink} to='/Activities' name='Activities' />
        <Menu.Item as={NavLink} to='/Errors' name='Errors' />
        <Menu.Item>
          <Button as={NavLink} to="/CreateActivity" positive content='Create Activities' />
        </Menu.Item>
        <Menu.Item
          position='right'>
          <Image src={user?.image || '/assets/user.png'} avatar spaced='right' />
          <Dropdown pointing='top left' text={user?.displayName}>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to={`/profiles/${user?.username}`} text='MyProfile' icon='user' />
              <Dropdown.Item onClick={logout} text='Logout' icon='power' />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
      </Container>
    </Menu>
  );
})