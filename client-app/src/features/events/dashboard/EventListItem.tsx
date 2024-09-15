import { Button, Icon, Item, Label, Segment } from 'semantic-ui-react'
import { Event } from '../../../app/models/event'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import EventListItemAttendee from './EventListItemAttendee'

interface Props {
    event: Event
}

export default function EventListItem({ event }: Props) {
    let eventDesc = ''

    if (!!event.description) {
        eventDesc = event.description.slice(0, event.description.indexOf("\n"));
        eventDesc = eventDesc.length > 95 ? eventDesc.substring(0, 92) + '...' : eventDesc;
    }

    return (
        <Segment.Group>
            <Segment>
                {event.isCancelled && (
                    <Label style={{ position: 'absolute', zIndex: 1000, left: -14, top: 3, backgroundColor: '#fba735' }} ribbon content='Cancelled' />
                )}
                <Item.Group>
                    <Item>
                        {/* <Item.Image style={{marginBottom: 5}} size='tiny' circular src={event.host?.image || '/assets/user.png'} /> */}
                        <Item.Image size='medium' src={event.image || '/assets/default.png'} />
                        <Item.Content>
                            <Item.Header as={Link} to={`/events/${event.id}`}>{event.title}</Item.Header>
                            <Item.Description>
                                {"Hosted by "}
                                {event.host?.username ?
                                    <Link to={`/profiles/${event.hostUsername}`}>{event.host?.displayName}</Link>
                                    : '[deleted user]'
                                }
                            </Item.Description>
                            {event.isHost && (
                                <Item.Description>
                                    <Label basic style={{ color: '#fba735', border: '1px solid rgb(251, 167, 53)' }}>
                                        You are hosting this event
                                    </Label>
                                </Item.Description>
                            )}
                            {event.isGoing && !event.isHost && (
                                <Item.Description>
                                    <Label basic style={{ color: '#346e61', border: '1px solid rgb(52, 110, 97)' }}>
                                        You are going to this event
                                    </Label>
                                </Item.Description>
                            )}
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon style={{ color: '#fba735' }} name='clock' /> {format(event.date!, 'dd MMM yyyy h:mm aa')}
                    <Icon style={{ color: '#fba735', marginLeft: '10px' }} name='marker' /> {event.location}
                </span>
            </Segment>
            <Segment secondary>
                <EventListItemAttendee attendees={event.attendees!} event={event} />
            </Segment>
            <Segment clearing>
                {<span>{eventDesc}</span>}
                <Button as={Link} to={`/events/${event.id}`} floated='right' content='View' basic className='greenBtn' />
            </Segment>
        </Segment.Group>
    )
}