import { Grid, Loader } from 'semantic-ui-react'
import EventList from './EventList';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import EventFilters from './EventFilter';
import { PagingParams } from '../../../app/models/pagination';
import InfiniteScroll from 'react-infinite-scroller';
import EventListItemPlaceholder from './EventListItemPlaceholder';

export default observer(function EventDashboard() {
    const { eventStore, userStore } = useStore();
    const { loadEvents, eventRegistry, setPagingParams, pagination } = eventStore;
    const [loadingNext, setLoadingNext] = useState(false);

    function handleGetNext() {
        setLoadingNext(true);
        setPagingParams(new PagingParams(pagination!.currentPage + 1));
        loadEvents().then(() => setLoadingNext(false));
    }

    useEffect(() => {
        if (eventRegistry.size <= 1) loadEvents();
    }, [loadEvents, eventRegistry.size]);

    useEffect(() => {
        if (userStore.user)
            userStore.loadUserProfile(userStore.user?.username);
    }, [userStore.user, userStore.loadUserProfile])

    return (
        <Grid>
            <Grid.Column width='10'>
                {eventStore.loadingInitial && eventRegistry.size === 0 && !loadingNext ? (
                    <>
                        <EventListItemPlaceholder />
                        <EventListItemPlaceholder />
                        <EventListItemPlaceholder />
                    </>
                ) : (
                    <InfiniteScroll pageStart={0} loadMore={handleGetNext} hasMore={!loadingNext && !!pagination && pagination.currentPage < pagination.totalPages} initialLoad={false}>
                        <EventList />
                    </InfiniteScroll>
                )}
            </Grid.Column>
            <Grid.Column width='6'>
                <EventFilters />
            </Grid.Column>
            <Grid.Column width={10}>
                <Loader active={loadingNext} />
            </Grid.Column>
        </Grid>
    )
})