import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react'
//import { useStore } from '../stores/store';

function NavBar() {

//const {activityStore}=useStore();


  return (
    <Menu inverted fixed='top'>
      <Container>
        <Menu.Item as = {NavLink} to='/' exact header>
          <img src="/assets/logo.png" alt="logo" style={{ marginRight: '10px' }} />
          Reactivties
        </Menu.Item>
        <Menu.Item as={NavLink} to='/Activities' name='Activities' />
        <Menu.Item>
          <Button /*onClick={()=>activityStore.openForm()} */ as={NavLink} to="/CreateActivity" positive content='Create Activities' />
        </Menu.Item>
      </Container>
    </Menu>
  );
}

export default NavBar;
