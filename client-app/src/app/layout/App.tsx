import React, { Fragment, useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react'
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import { v4 as uuid } from 'uuid';

import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import agent from '../api/agent';
import { resolveProjectReferencePath } from 'typescript';
import LoadingComponent from './LoadingComponents';
function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmmitting] = useState(false);
  useEffect(() => {
    agent.Activities.list().then(response => {
      let activities: Activity[] = [];
      response.forEach(activity => {
        activity.date = activity.date.split('T')[0];
        activities.push(activity);
      });
      setActivities(activities);
      setLoading(false);
    })

  }, []);



  function handleSectedActivity(id: string) {
    setSelectedActivity(activities.find(x => x.id === id));

  }

  function handleCancelSectedActivity() {
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id?: string) {
    id ? handleSectedActivity(id) : handleCancelSectedActivity();
    setEditMode(true);
  }
  function handleFormClose() {
    setEditMode(false);
  }
  function handleCreateOrEditActivity(activity: Activity) {
    setSubmmitting(true);
    if (activity.id) {
      agent.Activities.update(activity).then(() => {
        setActivities([...activities.filter(x => x.id !== activity.id), activity]);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmmitting(false);

      });
    }
    else {
      activity.id = uuid();
      agent.Activities.create(activity).then(() => {
        setActivities([...activities, activity]);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmmitting(false);

      });
    }
    // activity.id
    //   ? setActivities([...activities.filter(x => x.id !== activity.id), activity])
    //   : setActivities([...activities, { ...activity, id: uuid() }]);
    // setEditMode(false);
    // setSelectedActivity(activity);
  }
  function handleDeleteActivity(id: string) {
    setSubmmitting (true);
    agent.Activities.delete(id).then(()=>{
      setActivities([...activities.filter(x => x.id !== id)]);
      setSubmmitting (false);

    });

  }
  if (loading) return (<LoadingComponent content='Loading app' />)
  else
    return (
      <Fragment>
        <NavBar openForm={handleFormOpen} />
        <Container style={{ marginTop: '7em' }}>
          <ActivityDashboard
            activities={activities}
            selectedActivity={selectedActivity}
            selectActivity={handleSectedActivity}
            cancelSelectActivity={handleCancelSectedActivity}
            editMode={editMode}
            openForm={handleFormOpen}
            closeForm={handleFormClose}
            createOrEdit={handleCreateOrEditActivity}
            deleteActivity={handleDeleteActivity}
            submitting={submitting}
          />
        </Container>
      </Fragment>
    );
}

export default App;
