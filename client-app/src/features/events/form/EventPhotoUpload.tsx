import { Segment, Header, Grid, Image } from "semantic-ui-react";
import PhotoUploadWidget from "../../common/imageUpload/PhotoUploadWidget";
import { observer } from "mobx-react-lite";
import { Event } from "../../../app/models/event";
import { useState } from "react";
import { useStore } from "../../../app/stores/store";

interface Props {
    event: Event;
}

export default observer(function EventPhotoUpload({event}: Props) {
    const [addPhotoMode, setAddPhotoMode] = useState(false);
    const { profileStore } = useStore();
    const { uploadPhoto, uploading } = profileStore;

    function handlePhotoUpload(file: Blob) {
        uploadPhoto(file, event.id).then(() => {
            setAddPhotoMode(false);    
        });        
    }    

    return (
        <Segment clearing attached='top' >
            <Header content='Event photo' sub style={{ color: '#346e61', marginBottom: '5px' }} />
            <Grid>
                <Grid.Column width={12}>
                    {addPhotoMode ? (
                        <PhotoUploadWidget uploadPhoto={handlePhotoUpload} loading={uploading} src='event' />
                    ) : (
                        <Image src={event.image} size='massive' />
                    )}
                </Grid.Column>
            </Grid>
        </Segment>
    )
})