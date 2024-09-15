import { ErrorMessage, Form, Formik } from "formik";
import MyTextInput from "../common/form/MyTextInput";
import { Button, Header } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import * as Yup from 'yup';
import ValidationError from "../errors/ValidationError";

export default observer(function LoginForm() {
    const {userStore} = useStore();

    return (
        <Formik 
            initialValues={{displayName: '', username: '', email: '', password: '', error: null}} 
            onSubmit={(values, {setErrors}) => userStore.register(values).catch(error => setErrors({error}))}
            validationSchema={Yup.object({
                email: Yup.string().required(),
                displayName: Yup.string().required(),
                username: Yup.string().required(),
                password: Yup.string().required(),
            })}
        >
            {({handleSubmit, isSubmitting, errors, isValid, dirty}) => (
                <Form className="ui form error" onSubmit={handleSubmit} autoComplete="off">
                    <Header as='h2' content='Sign up to EventPlanner' textAlign="center" style={{color: '#346e61'}} />
                    <MyTextInput placeholder="Email" name='email' />
                    <MyTextInput placeholder="Display name" name='displayName' />
                    <MyTextInput placeholder="Username" name='username' />
                    <MyTextInput placeholder="Password" name='password' type='password' />
                    <ErrorMessage name="error" render={() => <ValidationError errors={errors.error as unknown as string[]} />} />
                    <Button fluid disabled={!isValid || !dirty || isSubmitting} loading={isSubmitting} content='Register' type='submit' />
                </Form>
            )}
        </Formik>
    )
})