import { Icon, Label } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import EventListItem from './EventListItem';
import { Fragment } from 'react/jsx-runtime';
import { format } from 'date-fns';

export default observer(function EventList() {
    const { eventStore } = useStore();
    const { groupedEvents } = eventStore;

    return (
        <>
            {groupedEvents.map(([group, events]) => (
                <Fragment key={group}>
                    <Label style={{color: '#346e61'}}>                        
                        <Icon name='calendar' />
                        {group === format(new Date(), 'dd MMM yyyy') ? 'Today' : group}
                    </Label>
                    {events.map(event => (
                        <EventListItem key={event.id} event={event} />
                    ))}
                </Fragment>
            ))}
        </>
    )
})