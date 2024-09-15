import { ErrorMessage, Form, Formik } from "formik";
import MyTextInput from "../common/form/MyTextInput";
import { Button, Header, Label } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";

export default observer(function LoginForm() {
    const {userStore} = useStore();

    return (
        <Formik 
            initialValues={{email: '', password: '', error: null}} 
            onSubmit={(values, {setErrors}) => userStore.login(values).catch(_ => setErrors({error: 'Invalid email or password'}))}
        >
            {({handleSubmit, isSubmitting, errors}) => (
                <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
                    <Header as='h2' content='Log In to EventPlanner' textAlign="center" style={{color: '#346e61'}} />
                    <MyTextInput placeholder="Email" name='email' />
                    <MyTextInput placeholder="Password" name='password' type='password' />
                    <ErrorMessage name="error" render={() => <Label style={{marginBottom: 10}} basic color="red" content={errors.error} />} />
                    <Button loading={isSubmitting} content='Log In' type='submit' fluid/>
                </Form>
            )}
        </Formik>
    )
})