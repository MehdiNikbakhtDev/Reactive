import React from 'react';
import { Button, Container, Menu } from 'semantic-ui-react'
interface Props {
  openForm: () => void
}
function NavBar({ openForm }: Props) {




  return (
    <Menu inverted fixed='top'>
      <Container>
        <Menu.Item header>
          <img src="/assets/logo.png" alt="logo" style={{ marginRight: '10px' }} />
          Reactivties
        </Menu.Item>
        <Menu.Item name='Activities' />
        <Menu.Item>
          <Button onClick={openForm} positive content='Create Activities' />
        </Menu.Item>
      </Container>
    </Menu>
  );
}

export default NavBar;
