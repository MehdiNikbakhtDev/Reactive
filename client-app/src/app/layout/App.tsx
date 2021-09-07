import React, { Fragment, useEffect } from 'react';
import { Container } from 'semantic-ui-react'
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import { Route, Switch, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import TestErrors from '../../features/errors/TestError';
import { ToastContainer } from 'react-toastify';
import Notfound from '../../features/errors/Notfound';
import ServerError from '../../features/errors/ServerError';
import LoginForm from '../../features/users/LoginForm';
import { useStore } from '../stores/store';
import LoadingComponent from './LoadingComponents';
import ModalContainer from '../common/modals/ModalContainer';
function App() {
  const location = useLocation();
  const { commonStore, userStore } = useStore();
  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    }
    else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore])
  if (!commonStore.appLoaded) return <LoadingComponent content='Loading app...' />
  return (
    <>
      <ToastContainer position='bottom-right' hideProgressBar />
      <ModalContainer />
      <Route exact path='/' component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => {
          return (
            <>
              <NavBar />
              <Container style={{ marginTop: '7em' }}>
                <Switch>
                  <Route exact path='/activities' component={ActivityDashboard} />
                  <Route path='/activities/:id' component={ActivityDetails} />
                  <Route key={location.key} path={['/createActivity', '/manage/:id']} component={ActivityForm} />
                  <Route path='/errors' component={TestErrors} />
                  <Route path='/Server-error' component={ServerError} />
                  <Route path='/Server-error' component={ServerError} />
                  <Route path='/login' component={LoginForm} />
                  <Route component={Notfound} />
                </Switch>
              </Container>
            </>
          );
        }}
      />

    </>
  );
}

export default observer(App);
