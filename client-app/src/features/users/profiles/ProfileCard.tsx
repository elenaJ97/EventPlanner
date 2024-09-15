import { observer } from "mobx-react-lite";
import { Profile } from "../../../app/models/profile";
import { Card, Icon, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import FollowButton from "./FollowButton";

interface Props {
    profile: Profile;
    host: boolean;
}

export default observer(function ProfileCard({ profile, host }: Props) {
    return (
        <Card fluid as={Link} to={`/profiles/${profile.username}`}>
            <Image src={profile.image || '/assets/user.png'} />
            <Card.Content>
                <Card.Header>{profile.displayName}</Card.Header>
                {host && (
                    <Card.Description content='Host' style={{color: '#346e61', fontWeight: 'bold'}} />
                 )}
                <Card.Description>{profile.bio && profile.bio.length > 40 ? profile.bio.substring(0, 37) + '...' : profile.bio}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Icon name='user' /> {profile.followersCount} follower{profile.followersCount == 1 ? '' : 's'}
            </Card.Content>
            <FollowButton profile={profile} />
        </Card>
    )
})