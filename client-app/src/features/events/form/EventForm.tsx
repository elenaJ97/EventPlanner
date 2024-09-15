import { useEffect, useState } from 'react';
import { Button, Header, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { EventFormValues } from '../../../app/models/event';
import LoadingComponent from '../../common/layout/LoadingComponent';
import { v4 as uuid } from 'uuid';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../common/form/MyTextInput';
import MyTextArea from '../../common/form/MyTextArea';
import MyDateInput from '../../common/form/MyDateInput';

export default observer(function EventForm() {
    const { eventStore } = useStore();
    const { createEvent, updateEvent, loadEvent, loadingInitial } = eventStore;
    const { id } = useParams();
    const navigate = useNavigate();

    const [event, setEvent] = useState<EventFormValues>(new EventFormValues());

    const validationSchema = Yup.object({
        title: Yup.string().required('Title is required!'),
        description: Yup.string().required('Description is required!'),
        date: Yup.string().required('Date is required!'),
        location: Yup.string().required('Location is required!')
    })

    useEffect(() => {
        if (id) loadEvent(id).then(event => setEvent(new EventFormValues(event)))
    }, [id, loadEvent])

    function handleFormSubmit(event: EventFormValues) {
        if (!event.id) {
            event.id = uuid();
            createEvent(event).then(() => navigate(`/events/${event.id}`));
        } else {
            updateEvent(event).then(() => navigate(`/events/${event.id}`));
        }
    }

    if (loadingInitial) return <LoadingComponent content='Loading event...' />

    return (
        <>
            <Segment clearing>
                <Header content='Event details' sub style={{ color: '#346e61' }} />
                <Formik validationSchema={validationSchema} enableReinitialize initialValues={event} onSubmit={values => handleFormSubmit(values)}>
                    {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                        <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                            <MyTextInput name='title' placeholder='Title' />
                            <MyTextArea rows={3} placeholder='Description' name='description' />
                            <MyDateInput placeholderText='Date' name='date' showTimeSelect timeCaption='time' dateFormat='MMMM d, yyyy h:mm aa' />
                            <Header content='Location details' sub style={{ color: '#346e61' }} />
                            <MyTextInput placeholder='Location' name='location' />
                            <Button disabled={isSubmitting || !dirty || !isValid} loading={isSubmitting} floated='right' type='submit' content='Submit' style={{ color: '#346e61', backgroundColor: '#dedcdc', border: '1px solid rgb(52, 110, 97)' }} />
                            <Button as={Link} to='/events' floated='right' type='button' content='Cancel' style={{ color: '#fba735', backgroundColor: '#dedcdc', border: '1px solid rgb(251, 167, 53)' }} />
                        </Form>
                    )}
                </Formik>
            </Segment>
        </>
    )
})