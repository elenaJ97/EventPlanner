import { observer } from "mobx-react-lite";
import Calendar from "react-calendar";
import { Header, Menu } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function EventFilters() {
    const {eventStore: {predicate, setPredicate}} = useStore();

    return (
        <>
            <Menu vertical size='large' style={{ width: '100%', marginTop:40 }} >
                <Header icon='filter' attached content='Filters' style={{color: '#346e61'}}/>
                <Menu.Item content='All Events' active={predicate.has('all')} onClick={() => setPredicate('all', 'true')} />
                <Menu.Item content="I'm going" active={predicate.has('isGoing')} onClick={() => setPredicate('isGoing', 'true')} />
                <Menu.Item content="I'm hosting" active={predicate.has('isHost')} onClick={() => setPredicate('isHost', 'true')} />
            </Menu>
            <Header />
            <Calendar onChange={(date) => setPredicate('startDate', date as Date)} value={predicate.get('startDate') || new Date()} />
        </>
    )
})