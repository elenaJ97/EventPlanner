import { Button, Container, Dropdown, Icon, Image, Menu } from 'semantic-ui-react';
import { Link, NavLink } from 'react-router-dom';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import _ from 'lodash';
import MySearchBar from '../form/MySearchBar';

export default observer(function NavBar() {
    const { userStore: { user, logout }, eventStore: {allEvents, loadAllEvents}, profileStore: {filterProfiles, loadAllProfiles} } = useStore();

    const allUsersFiltered = filterProfiles.map(u => ({
        title: u.username,
        display: u.displayName,
    }))    

    useEffect(() => {
        loadAllProfiles();
    }, [])

    const allEventsFiltered = allEvents.map(e => ({
        title: e.title,
        location: e.location,
        eventid: e.id
    }))    

    useEffect(() => {
        loadAllEvents();
    }, [])    

    return (
    <Menu inverted fixed='top' >
        <Container>
            <Menu.Item as={NavLink} to='/' header>
                <Icon name='map marker alternate' size='big' style={{color:'#fba735'}} />
                <Icon name='clock outline' size='big' style={{color:'#fba735'}} />
                <Icon name='calendar outline' size='big' style={{color:'#fba735'}} />
            </Menu.Item>
            <Menu.Item as={NavLink} to='/events' name='Events' />
            <Menu.Item>
                <MySearchBar searchData={allEventsFiltered} searchBy='event' searchIcon='clock' type='events' />                
            </Menu.Item>
            <Menu.Item>
                <MySearchBar searchData={allUsersFiltered} searchBy='username' searchIcon='users' type='profiles' />
            </Menu.Item>
            <Menu.Item>
                <Button basic as={NavLink} to='/createEvent' content='Create event' className='orangeBtn' />
            </Menu.Item>
            <Menu.Item position='right' >
                <Image size='mini' src={user?.image || '/assets/user.png'} avatar />
                <Dropdown pointing='top left'>
                    <Dropdown.Menu>
                        <Dropdown.Item as={Link} to={`/profiles/${user?.username}`} text='My Profile' icon='user' />
                        <Dropdown.Item onClick={logout} text='Log Out' icon='power' />
                    </Dropdown.Menu>
                </Dropdown>
            </Menu.Item>
        </Container>
    </Menu>
)
})