import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Grid, GridColumn } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponents';
import { useStore } from '../../../app/stores/store';
import ActivityDetailedChat from './ActivityDetailedChat';
import ActivityDetailedHeader from './ActivityDetailedHeader';
import ActivityDetailedInfo from './ActivityDetailedInfo';
import ActivityDetailedSidebar from './ActivityDetailedSidebar';




export default observer(function ActivityDetails() {
    const { activityStore } = useStore();
    const { selectedActivity: activity, loadActivity, loadingInitial } = activityStore;
    const { id } = useParams<{ id: string }>();
    useEffect(() => {
        if (id) loadActivity(id);
    }, [id, loadActivity]);
    if (loadingInitial || !activity) return <LoadingComponent />;
    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityDetailedHeader activity={activity} />
                <ActivityDetailedInfo activity={activity} />
                <ActivityDetailedChat />
            </Grid.Column>
            <GridColumn width={6}>
                <ActivityDetailedSidebar activity={activity}/>
            </GridColumn>
        </Grid>
        // <Card fluid>
        //     <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
        //     <Card.Content>
        //         <Card.Header> {activity.title} </Card.Header>
        //         <Card.Meta> <span >{activity.date} </span></Card.Meta>
        //         <Card.Description>{activity.description}</Card.Description>

        //     </Card.Content>
        //     <Card.Content extra>
        //         <Button.Group widths='2'>
        //             <Button /*onClick={() => openForm(activity.id)} */ basic as={Link} to={`/manage/${activity.id}`}  color='blue' content='Edit' />
        //             <Button /*onClick={cancelSelectedActivity}*/ basic  as={Link} to={`/activities`}  color='grey' content='Cancel' />
        //         </Button.Group>
        //     </Card.Content>


        // </Card>


    );

});