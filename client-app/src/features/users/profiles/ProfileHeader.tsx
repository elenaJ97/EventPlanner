import { Button, Divider, Grid, Header, Item, Segment, Statistic } from "semantic-ui-react";
import { Profile } from "../../../app/models/profile";
import { observer } from "mobx-react-lite";
import FollowButton from "./FollowButton";
import { useStore } from "../../../app/stores/store";
import { useEffect, useState } from "react";
import ModalDelete from "../../common/modals/ModalDelete";

interface Props {
    profile: Profile;
}

export default observer(function ProfileHeader({ profile }: Props) {
    const { profileStore, userStore: {user}, modalStore } = useStore();
    const { isCurrentUser, deleteProfile } = profileStore;
    const [choice, setChoice] = useState('');
    
    function handleMakeChoice(id: string) {
        setChoice(id);
        modalStore.closeModal();
    }

    useEffect(() => {
        if (choice == 'Yes') {
            deleteProfile(profileStore.profile!.username);
            setChoice('');
        }
    }, [choice])

    return (
        <Segment>
            <Grid>
                <Grid.Column width={12}>
                    <Item.Group>
                        <Item>
                            <Item.Image avatar size="small" src={profile.image || '/assets/user.png'} />
                            <Item.Content verticalAlign="middle">
                                <Header as='h1' content={profile.displayName} />
                                <Divider hidden />
                                {(isCurrentUser || user?.role == 'Administrator') && (
                                    <Button floated='left' className='orangeBtn' content={'Delete Profile'} onClick={() => modalStore.openModal(<ModalDelete type='profile' onMakeChoice={handleMakeChoice} />)} style={{ marginTop: '30px' }} />
                                )}
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Grid.Column>
                <Grid.Column width={4}>
                    <Statistic.Group widths={2}>
                        <Statistic label='Followers' value={profile.followersCount} />
                        <Statistic label='Following' value={profile.followingCount} />
                    </Statistic.Group>
                    <Divider />
                    <FollowButton profile={profile} />
                </Grid.Column>
            </Grid>
        </Segment>
    )
})