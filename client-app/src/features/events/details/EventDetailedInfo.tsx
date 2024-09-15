import { Segment, Grid, Icon } from 'semantic-ui-react'
import { Event } from '../../../app/models/event';
import { format } from 'date-fns';

interface Props {
    event: Event
}

export default function EventDetailedInfo({ event }: Props) {
    return (
        <Segment.Group>
            <Segment attached='top'>
                <Grid>
                    <Grid.Column width={1}>
                        <Icon size='large' name='info' style={{color: '#346e61'}}/>
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <p style={{ whiteSpace: 'pre-wrap'}}>{event.description}</p>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={1}>
                        <Icon name='calendar' size='large' style={{color: '#346e61'}} />
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <span >
                            {format(event.date!, 'dd MMMM yyyy h:mm aa')}
                        </span>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={1}>
                        <Icon name='marker' size='large' style={{color: '#346e61'}} />
                    </Grid.Column>
                    <Grid.Column width={11}>
                        <span>{event.location}</span>
                    </Grid.Column>
                </Grid>
            </Segment>
        </Segment.Group>
    )
}