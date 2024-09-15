import { observer } from "mobx-react-lite";
import { Button, Container, Header } from "semantic-ui-react";

interface Props {
    type: string;
    onMakeChoice: (id: string) => void;
}

export default observer(function ModalDelete({ type, onMakeChoice }: Props) {
    function handleMakeChoice(e: string) {        
        onMakeChoice(e);            
    }

    return (
        <Container textAlign="center">
            <Header as='h4' content={`Are you sure you want to delete the ${type}?`} />
            <Button basic type="button" onClick={() => handleMakeChoice('Yes')} className='greenBtn' icon='check' />
            <Button basic type="button" onClick={() => handleMakeChoice('No')} className='orangeBtn' icon='close' />
        </Container>
    )
})