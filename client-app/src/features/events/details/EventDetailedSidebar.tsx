import { Segment, List, Label, Item, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { Event } from '../../../app/models/event';
import { observer } from 'mobx-react-lite';

interface Props {
    event: Event;
}

export default observer(function EventDetailedSidebar({ event: { attendees, host } }: Props) {
    if (!attendees) return null;

    const style = {
        border: '3px solid rgba(52, 110, 97, 0.5)',
        color: '#346e61', 
        backgroundColor: '#d1cdcd', 
        fontWeight: 'bold',
        fontSize: '15px'
    }

    return (
        <>
            <Segment textAlign='center' style={style} attached='top' >
                {attendees.length} {attendees.length === 1 ? 'Person' : 'People'} Going
            </Segment>
            <Segment attached style={{border: '3px solid rgba(52, 110, 97, 0.5)', borderTop:'none'}}>
                <List relaxed divided >
                    {attendees.slice().sort((a, _) => a.username == host?.username ? -1 : 1).map(attendee => (
                        <Item key={attendee.username} style={{ position: 'relative' }}>
                            {attendee.username === host?.username &&
                                <Label style={{ position: 'absolute', backgroundColor:'#fba735' }} ribbon='right' >
                                    Host
                                </Label>}
                            <Image size='tiny' src={attendee.image || '/assets/user.png'} />
                            <Item.Content verticalAlign='middle'>
                                <Item.Header as='h3'>
                                    <Link to={`/profiles/${attendee.username}`}>{attendee.displayName}</Link>
                                </Item.Header>
                                {attendee.following && 
                                    <Item.Extra style={{ color: 'orange' }}>Following</Item.Extra>}
                            </Item.Content>
                        </Item>
                    ))}
                </List>
            </Segment>
        </>
    )
})