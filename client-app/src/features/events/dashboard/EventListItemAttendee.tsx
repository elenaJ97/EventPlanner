import { observer } from "mobx-react-lite"
import { Image, List, Popup } from "semantic-ui-react"
import { Profile } from "../../../app/models/profile"
import { Link } from "react-router-dom";
import ProfileCard from "../../users/profiles/ProfileCard";
import { Event } from "../../../app/models/event";

interface Props {
    attendees: Profile[];
    event: Event;
}

export default observer(function EventListItemAttendee({ attendees, event }: Props) {
    const styles = { 
        borderColor: '#fba735',
        borderWidth: 3
    }

    const hostStyles = { 
        borderColor: '#346e61',
        borderWidth: 3
    }    

    return (
        <List horizontal>
            {attendees.slice().sort((a, _) => a.username == event.hostUsername ? -1 : 1).map(attendee => (
                <Popup hoverable key={attendee.username} trigger={
                    <List.Item key={attendee.username} as={Link} to={`/profiles/${attendee.username}`}>
                        <Image bordered style={attendee.username == event.hostUsername ? hostStyles : attendee.following ? styles : null} size="mini" circular src={attendee.image || '/assets/user.png'} />
                    </List.Item>
                }>
                    <Popup.Content>
                        <ProfileCard profile={attendee} host={attendee.username == event.hostUsername} />
                    </Popup.Content>
                </Popup>
            ))}
        </List>
    )
})