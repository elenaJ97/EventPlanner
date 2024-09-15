import { Grid, TabPane } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store';
import LoadingComponent from '../../common/layout/LoadingComponent';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedChat from './EventDetailedChat';
import EventDetailedSidebar from './EventDetailedSidebar';
import PhotoUploadWidget from '../../common/imageUpload/PhotoUploadWidget';

export default observer(function EventDetails() {
    const { eventStore, profileStore } = useStore();
    const { selectedEvent: event, loadEvent, loadingInitial, clearSelectedEvent, uploadMode, setUploadMode } = eventStore;
    const { uploadPhoto, uploading } = profileStore;
    const { id } = useParams();

    function handlePhotoUpload(file: Blob) {
        uploadPhoto(file, event!.id).then(() => {setUploadMode()});
    }

    useEffect(() => {
        if (id) loadEvent(id);
        return () => clearSelectedEvent();
    }, [id, loadEvent, clearSelectedEvent])

    if (loadingInitial || !event) return <LoadingComponent />;

    return (
        <Grid>
            <Grid.Column width={11}>
                <EventDetailedHeader event={event} />
                {uploadMode ? (
                    <TabPane>
                        <PhotoUploadWidget uploadPhoto={handlePhotoUpload} loading={uploading} src='event' />
                    </TabPane>
                ) :
                    <>
                        <EventDetailedInfo event={event} />
                        <EventDetailedChat eventId={event.id} />
                    </>}
            </Grid.Column>
            <Grid.Column width={5}>
                <EventDetailedSidebar event={event} />
            </Grid.Column>
        </Grid >
    )
})