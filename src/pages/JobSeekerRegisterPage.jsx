import { Formik, Form } from 'formik'
import React  from 'react'
import { Card, Button, Segment } from 'semantic-ui-react'
import { Link, useHistory } from 'react-router-dom'
import HrmsTextInput from '../utilities/customFormControls/HrmsTextInput'
import * as yup from "yup"
import JobSeekerService from "../services/jobSeekerService"
import { toast, ToastContainer } from 'react-toastify'

export default function JobSeekerRegisterPage() {

    const history = useHistory()

    const initialValues= {
            firstName: "",
            lastName: "",
            email: "",
            dateOfBorn: "",
            nationalIdentity:"",
            password: "",
            confirmPassword:""
    }
    
    const schema = yup.object({
        firstName: yup.string().required("Please enter your First Name"),
        lastName: yup.string().required("Please enter your Last Name"),
        email: yup.string().email().required("Please enter an email"),
        dateOfBorn: yup.string().required("Please enter your Date of Birth"),
        nationalIdentity: yup.string().length(11).required("Please enter your National Identity"),
        password: yup.string().required("Please enter your password"),
        confirmPassword: yup.string().required("Please confirm your password")
    })

    return (
        <div>
            <ToastContainer position="top-right"/>
            <Formik
                initialValues={initialValues}
                validationSchema={schema}
                onSubmit={(values) => {
                    console.log(values)
                    const jobSeekerService = new JobSeekerService()

                    if(values.confirmPassword === values.password) {
                        jobSeekerService.add(values).then(response => {
                            if(response.data.success) {
                                history.push("/")
                            }
                        })
                    } else {
                        toast.error("Password is not match with Confirm Password")
                    }

                }}>
                <Form className="ui form">
                    <Card centered style={{height:"650px", width:"600px", marginTop:"10px"}}>      
                        <Segment>
                        <Card.Content>
                            <Card.Header style={{marginTop: "10px", marginBottom:"30px"}}><h1>Create an account as Person</h1></Card.Header>
                            <Card.Description>
                                   
                                <HrmsTextInput name="firstName" label="First Name" icon="user" />                                                
                                <HrmsTextInput name="lastName" label="Last Name" icon="user" />                                                
                                <HrmsTextInput name="email" label="Email" icon="mail" />                                                
                                <HrmsTextInput name="nationalIdentity" label="National Identity" icon="address card" />                                                
                                <HrmsTextInput name="dateOfBorn" label="Date Of Birth" icon="calendar alternate" type="date"/>                                                
                                <HrmsTextInput name="password" label="Password" icon="lock" type="password" />                                                
                                <HrmsTextInput name="confirmPassword" label="Confirm Password" icon="lock" type="password" />                                                
  
                                <Button fluid type='submit' color="violet" style={{marginBottom:"30px"}}>Register</Button>
                                    
                                Already have an account? <Link to="/login">Login</Link>              

                            </Card.Description>
                        </Card.Content>
                        </Segment>
                    </Card>
                </Form>
            </Formik>
            
        </div>
    )
}
