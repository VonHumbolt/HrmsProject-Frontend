import React from 'react'
import { Formik, Form } from 'formik'
import { Button, Card, Divider } from 'semantic-ui-react'
import HrmsTextInput from '../utilities/customFormControls/HrmsTextInput'
import { Link, useHistory } from 'react-router-dom'
import * as yup from "yup";
import AuthService from '../services/authService'
import { useDispatch } from 'react-redux'
import { addUserInfo } from '../store/actions/actions'
import { getAllFavorites } from '../store/reducers/favoriteJobReducer'
import { toast, ToastContainer } from 'react-toastify'

export default function JobSeekerLoginPage() {

    const history = useHistory();

    const dispatch = useDispatch();

    const initialValues = {
        email: "",
        password:""
    }

    const schema = yup.object({
        email: yup.string().email().required("Enter your Email"),
        password: yup.string().required("Enter your password")
    })

    return (
        <div>
            <ToastContainer position="top-right"/>
            <Formik 
            initialValues={initialValues}
            validationSchema = {schema}
            onSubmit={(values) => {

                const authService = new AuthService();
                authService.login(values).then(response => {
                    if(response.data.success) {
                        
                        dispatch(addUserInfo(response.data.data))
                        dispatch(getAllFavorites(response.data.data))
                        history.push("/")
                    } else {
                        toast.error("Email or password is wrong")
                    }
                })

            }}>
                <Form className="ui form">
                    <Card centered style={{height:"500px", width:"600px", marginTop:"10px"}}>
                            <Card.Content>
                                <Card.Header style={{marginTop: "20px", marginBottom:"50px"}}><h1 style={{fontFamily:"sans-serif"}}>Login as Person</h1></Card.Header>

                                <Card.Description>
                                        <HrmsTextInput name="email" label="Email" icon="mail" />
                                        <HrmsTextInput name="password" type="password" label="Password" icon="lock" />

                                        <Button fluid type='submit' color="violet" style={{marginBottom:"20px"}}>Login</Button>

                                        <Divider horizontal>Or</Divider>

                                        <Button fluid style={{marginBottom:"10px", marginTop:"25px"}} color="google plus" icon="google" content="Continue with Google" />
                                        <Button fluid style={{marginBottom:"25px"}} color="facebook" icon="facebook" content="Continue with Facebook" />
                                        
                                        Do not have an account? <Link to="/register">Register Now</Link>

                                    
                                </Card.Description>
                            </Card.Content>
                    </Card>

                </Form>
            </Formik>

        </div>
    )
}
