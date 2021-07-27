import React from 'react'
import { Formik, Form } from 'formik'
import { Button, Card } from 'semantic-ui-react'
import HrmsTextInput from '../utilities/customFormControls/HrmsTextInput'
import { Link, useHistory } from 'react-router-dom'
import * as yup from "yup";
import AuthService from '../services/authService'
import { useDispatch } from 'react-redux'
import { addUserInfo } from '../store/actions/actions'

export default function () {

    const history = useHistory();

    const dispatch = useDispatch();

    const initialValues = {
        email:"",
        password:""
    }

    const schema = yup.object({
        email: yup.string().email().required("Enter your email"),
        password: yup.string().required("Enter your password")
    })

    return (
        <div>

            <Formik 
                initialValues={initialValues}
                validationSchema={schema}
                onSubmit={(values) => {
                    console.log(values)

                    const authService = new AuthService();
                    authService.login(values).then(response => {
                        if(response.data.success) {

                            dispatch(addUserInfo(response.data.data))
                            history.push("/")
                        }
                    })

                }}>
                <Form className="ui form">
                    <Card centered style={{height:"370px", width:"600px", marginTop:"10px"}}>
                            <Card.Content>
                                <Card.Header style={{marginTop: "20px", marginBottom:"50px"}}><h1 style={{fontFamily:"sans-serif"}}>Login as Employer</h1></Card.Header>

                                <Card.Description>
                                        <HrmsTextInput name="email" label="Email" icon="mail" />
                                        <HrmsTextInput name="password" type="password" label="Password" icon="lock" />

                                        <Button fluid type='submit' color="violet" style={{marginBottom:"25px"}}>Login</Button>
                                 
                                        Do not have an account? <Link to="/register">Register Now</Link>
                                    
                                </Card.Description>
                            </Card.Content>
                    </Card>

                </Form>
            </Formik>


        </div>
    )
}
