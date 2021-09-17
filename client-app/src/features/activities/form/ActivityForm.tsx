import { observer } from 'mobx-react-lite';
import React, {  useState } from 'react'
import { useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, Header,  Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponents';
import { useStore } from '../../../app/stores/store';
import { v4 as uuid } from 'uuid'
import { Formik, Form } from 'formik';
import * as Yup from 'yup'
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MySelectInput from '../../../app/common/form/MySelectInput';
import { categoryOptions } from '../../../app/common/options/categoryOptions';
import MyDateInput from '../../../app/common/form/MyDateInput';
import {  ActivityFormValues } from '../../../app/models/activity';
export default observer(function ActivityForm() {
    const history = useHistory();
    const { activityStore } = useStore();
    const { createActivity, updateActivity,
        loadActivity, loadingInitial } = activityStore;
    const { id } = useParams<{ id: string }>();
    const [activity, setActivity] = useState<ActivityFormValues>(new ActivityFormValues());
    const validationSchema = Yup.object({
        title: Yup.string().required('The activity title is requierd'),
        description: Yup.string().required('The activity description is requierd'),
        category: Yup.string().required('The activity category is requierd'),
        date: Yup.string().required('The activity date is requierd').nullable(),
        venue: Yup.string().required('The activity venue is requierd'),
        city: Yup.string().required('The activity city is requierd')
    })
    useEffect(() => {
        if (id) loadActivity(id).then(activity => setActivity(new ActivityFormValues(activity)));
    }, [id, loadActivity]);

    function handelFormSubmit(activity: ActivityFormValues) {
        if (!activity.id) {
            let newActivity = {
                ...activity,
                id: uuid()
            };
            createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`));
        }
        else {
            updateActivity(activity).then(() => history.push(`/activities/${activity.id}`));
        }

    }

    if (loadingInitial) return <LoadingComponent content='Loading Activity...' />

    return (
        <Segment clearing>
            <Header content='Activity Details' sub color='teal' />
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={activity}
                onSubmit={values => handelFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off' >
                        <MyTextInput name='title' placeholder='Title' />
                        <MyTextArea rows={3} placeholder='Description' name='description' />
                        <MySelectInput options={categoryOptions} placeholder='Category' name='category' />
                        <MyDateInput
                            placeholderText='Date'
                            name='date'
                            showTimeSelect
                            timeCaption='time'
                            dateFormat='MMMM d, yyyy h:mm aa'
                        />
                        <Header content='Location Details' sub color='teal' />
                        <MyTextInput placeholder='City' name='city' />
                        <MyTextInput placeholder='Venue' name='venue' />
                        <Button
                            disabled={isSubmitting || !dirty || !isValid}
                            loading={isSubmitting}
                            floated='right'
                            positive
                            type='submit'
                            content='Submit' />
                        <Button /*onClick={closeForm} */ as={Link} to='/activities' floated='right' type='button' content='Cancel' />

                    </Form>
                )}
            </Formik>


        </Segment>

    );




})

