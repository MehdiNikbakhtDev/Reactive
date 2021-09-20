import React from 'react'
import { Link } from 'react-router-dom';
import { Button, Icon, Item, ItemGroup, Label, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import { format } from 'date-fns'
import ActivityListItemAttendee from './ActivityListItemAttendee';
interface Props {
    activity: Activity
}

export default function ActivityListItem({ activity }: Props) {

    return (
        <Segment.Group>
            <Segment>
                {activity.isCancelled  &&
                <Label attached='top' color='red' content='Cancelled' style={{textAlign:'center'}}/>
                }
                <ItemGroup>
                    <Item>
                        <Item.Image style={{ marginBottom: 3 }} size='tiny' circular src={activity.host?.image || '/assets/user.png'}/>
                        <Item.Content  >
                            <Item.Header as={Link} to={`/activities/${activity.id}`}>
                                {activity.title}
                            </Item.Header>
                            <Item.Description>Hosted by <Link to={`profiles/${activity.hostUsername}`}>{activity.host?.displayName}</Link></Item.Description>
                            {activity.isHost && (
                                <Item.Description>
                                    <Label basic color='orange'>
                                        You are hosting this activity
                                    </Label>
                                </Item.Description>
                            )}
                             {activity.isGoing && !activity.isHost && (
                                <Item.Description>
                                    <Label basic color='green'>
                                        You are going to this activity
                                    </Label>
                                </Item.Description>
                            )}
                            
                        </Item.Content>
                    </Item>
                </ItemGroup>
            </Segment>
            <Segment>
                <span>
                    <Icon name='clock' />{format(activity.date!, 'dd MMM yyyy h:mm aa')}
                    <Icon name='marker' />{activity.venue}
                </span>
            </Segment>
            <Segment secondary>
                <ActivityListItemAttendee attendees={activity.attendees!} />
            </Segment>
            <Segment clearing>
                <span>
                    {activity.description}
                </span>
                <Button
                    as={Link}
                    to={`/activities/${activity.id}`}
                    color='teal'
                    floated='right'
                    content='View'
                />
            </Segment>
        </Segment.Group>


        // <Item key={activity.id}>
        //     <Item.Content>
        //         <Item.Header as='a' > {activity.title} </Item.Header>
        //         <Item.Meta>{activity.date}</Item.Meta>
        //         <Item.Description>
        //             <div>{activity.description}</div>
        //             <div>{activity.city} , {activity.venue} </div>
        //         </Item.Description>
        //         <Item.Extra>
        //             <Button /*onClick={() => { activityStore.selectActivity(activity.id) }} */ as={Link} to={`/activities/${activity.id}`} floated='right' content='View' color='blue' />
        //             <Button
        //                 name={activity.id}
        //                 loading={loading && target === activity.id}
        //                 onClick={(e) => { handleActivityDelete(e, activity.id) }}
        //                 floated='right'
        //                 content='Delete'
        //                 color='red' />
        //             <Label basic content={activity.category} />

        //         </Item.Extra>

        //     </Item.Content>
        // </Item>


    );


}