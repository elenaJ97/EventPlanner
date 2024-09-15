import { Button, Header, Item, Segment, Image, Label } from 'semantic-ui-react'
import { Event } from '../../../app/models/event';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { router } from '../../../app/router/Routes';
import ModalDelete from '../../common/modals/ModalDelete';

const eventImageStyle = {
    filter: 'brightness(30%)'
};

const eventImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

interface Props {
    event: Event
}

export default observer(function EventDetailedHeader({ event }: Props) {
    const { eventStore, userStore: { user }, modalStore } = useStore();
    const { updateAttendance, loading, cancelEventToggle, deleteEvent, selectedEvent, uploadMode, setUploadMode } = eventStore;
    const [choice, setChoice] = useState('');

    function handleMakeChoice(id: string) {
        setChoice(id);
        modalStore.closeModal();
    }

    function handleUploadPhoto() {
        setUploadMode();
    }

    useEffect(() => {
        if (choice == 'Yes') {
            deleteEvent(selectedEvent!.id);
            setChoice('');
            router.navigate('/events');
        }
    }, [choice])

    return (
        <Segment.Group>
            <Segment basic attached='top' style={{ padding: '0' }}>
                {event.isCancelled && (
                    <Label style={{ position: 'absolute', zIndex: 1000, left: -14, top: 20, backgroundColor: '#fba735' }} ribbon content='Cancelled' />
                )}
                <Image src={event.image || '/assets/default.png'} fluid style={eventImageStyle} />
                <Segment style={eventImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header size='huge' content={event.title} style={{ color: 'white' }} />
                                <p>{format(event.date!, 'dd MMM yyyy')}</p>
                                <p>
                                    {"Hosted by "}
                                    {event.host?.username ?
                                        <strong><Link to={`/profiles/${event.host?.username}`}>{event.host?.displayName}</Link></strong>
                                        : '[deleted user]'
                                    }
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                {event.isHost && (
                    event.isCancelled ?
                        <Button floated='left' disabled={uploadMode} content='Re-activate Event' onClick={cancelEventToggle} loading={loading} style={{ color: '#346e61', backgroundColor: '#dedcdc', border: '1px solid rgb(52, 110, 97)' }} />
                        : <Button floated='left' disabled={uploadMode} content='Cancel Event' onClick={cancelEventToggle} loading={loading} style={{ color: '#fba735', backgroundColor: '#dedcdc', border: '1px solid rgb(251, 167, 53)' }} />
                )}
                {(user?.username === event.hostUsername || user?.role == 'Administrator') && (
                    <Button floated='left' content='Delete Event' disabled={uploadMode} onClick={() => modalStore.openModal(<ModalDelete type='event' onMakeChoice={handleMakeChoice} />)} style={{ color: '#fba735', backgroundColor: '#dedcdc', border: '1px solid rgb(251, 167, 53)' }} />
                )}
                {event.isHost ?
                    <>
                        <Button disabled={event.isCancelled} style={{ backgroundColor: '#fba735', border: '1px solid rgb(251, 167, 53)' }} onClick={handleUploadPhoto} floated='right' content={uploadMode ? 'Cancel' : 'Update photo'} />
                        <Button disabled={event.isCancelled || uploadMode} as={Link} to={`/manage/${event.id}`} style={{ backgroundColor: '#fba735', border: '1px solid rgb(251, 167, 53)' }} floated='right' content='Manage Event' />
                    </>
                    : event.isGoing ?
                        <Button loading={loading} disabled={uploadMode} onClick={updateAttendance} style={{ color: '#fba735', backgroundColor: '#dedcdc', border: '1px solid rgb(251, 167, 53)' }} content='Cancel attendance' />
                        : <Button disabled={event.isCancelled || uploadMode} loading={loading} onClick={updateAttendance} style={{ color: '#346e61', backgroundColor: '#dedcdc', border: '1px solid rgb(52, 110, 97)' }} content='Join Event' />
                }
            </Segment>
        </Segment.Group >
    )
})