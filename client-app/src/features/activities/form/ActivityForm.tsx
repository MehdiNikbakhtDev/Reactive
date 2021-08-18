import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useState } from 'react'
import { useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, Form, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponents';
import { useStore } from '../../../app/stores/store';
import { v4 as uuid } from 'uuid'

export default observer(function ActivityForm() {
    const history = useHistory();
    const { activityStore } = useStore();
    const { createActivity, updateActivity,
        loading, loadActivity, loadingInitial } = activityStore;
    const { id } = useParams<{ id: string }>();
    const [activity, setActivity] = useState({
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    });
    useEffect(() => {
        if (id) loadActivity(id).then(activity => setActivity(activity!));
    }, [id, loadActivity]);

    function handelSubmit() {
        if(activity.id.length === 0 ){
        let newActivity={
            ...activity,
            id: uuid()
        };
        createActivity(newActivity).then(()=> history.push(`/activities/${newActivity.id}`));
        }
        else{
            updateActivity(activity).then(()=>history.push(`/activities/${activity.id}`));
        }

    }
    function handleInputChenge(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setActivity({ ...activity, [name]: value });
    }
    if (loadingInitial) return <LoadingComponent content='Loading Activity...' />

    return (
        <Segment clearing>
            <Form onSubmit={handelSubmit} autoComplete='off' >
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleInputChenge} />
                <Form.Input placeholder='Description' value={activity.description} name='description' onChange={handleInputChenge} />
                <Form.Input placeholder='Category' value={activity.category} name='category' onChange={handleInputChenge} />
                <Form.Input type='date' placeholder='Date' value={activity.date} name='date' onChange={handleInputChenge} />
                <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleInputChenge} />
                <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handleInputChenge} />
                <Button loading={loading} floated='right' positive type='submit' content='Submit' />
                <Button /*onClick={closeForm} */ as={Link}  to='/activities' floated='right' type='button' content='Cancel' />

            </Form>

        </Segment>

    );




})

