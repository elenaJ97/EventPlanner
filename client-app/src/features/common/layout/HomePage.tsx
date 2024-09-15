import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Button, Container, Header, Segment, Icon } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import LoginForm from "../../users/LoginForm";
import RegisterForm from "../../users/RegisterForm";

export default observer(function HomePage() {
    const { userStore, modalStore } = useStore();

    return (
        <Segment inverted textAlign="center" vertical className="homePage">
            <Container>
                <Icon name='map marker alternate' size='massive' style={{ color: '#fba735' }} />
                <Icon name='clock outline' size='massive' style={{ color: '#fba735' }} />
                <Icon name='calendar outline' size='massive' style={{ color: '#fba735' }} />
                <br/> <br/> <br/>
                <Header as='h2' inverted content='Welcome to EventPlanner' />
                {userStore.isLoggedIn ?                       
                    <Button as={Link} to='/events' size='huge' inverted content='Go to Events!' />                            
                : (
                    <>
                        <Button onClick={() => modalStore.openModal(<LoginForm />)} size='huge' inverted content='Log In' />
                        <Button onClick={() => modalStore.openModal(<RegisterForm />)} size='huge' inverted content='Register' />
                    </>
                )}
            </Container>
        </Segment>
    )
})