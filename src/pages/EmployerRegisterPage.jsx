import { Form, Formik } from 'formik'
import React from 'react'
import { Button, Card, Header,Segment } from 'semantic-ui-react'
import { Link, useHistory } from 'react-router-dom'
import HrmsTextInput from '../utilities/customFormControls/HrmsTextInput'
import * as yup from "yup"
import EmployerService from '../services/employerService'
import { toast, ToastContainer } from 'react-toastify'

export default function EmployerRegisterPage() {

    const history = useHistory()

    const initialValues = {
        companyName:"",
        website:"",
        email:"",
        phoneNumber:"",
        password:"",
        confirmPassword:""
    }

    const schema = yup.object({
        companyName: yup.string().required("Please enter an Company Name"),
        website: yup.string().url().required("Please enter your Website of Company"),
        email: yup.string().email().required("Please enter an Email"),
        phoneNumber: yup.string().required("Please enter your Company Phone Number"),
        password: yup.string().required("Please enter your password"),
        confirmPassword: yup.string().required("Please confirm your password")
    })

    return (
        <div>
            <ToastContainer position="top-right" />
             <Formik 
                initialValues={initialValues}
                validationSchema= {schema}
                onSubmit={(values) => {
                    console.log(values)
                    const employerService = new EmployerService();

                    if(values.password === values.confirmPassword) {
                        employerService.add(values).then(response => {
                            if (response.data.success) {
                                history.push("/")                               
                            }
                        })
                    }else {
                        toast.error("Password is not match with Confirm Password")
                    }

                    
                }}>
                <Form className="ui form">
                    <Card centered style={{height:"650px", width:"600px", marginTop:"10px"}}>
                    <Segment  >
                        <Header style={{marginTop: "10px", marginBottom:"30px"}}><h1>Create an account as Employer</h1></Header>

                          
                            <HrmsTextInput name="companyName" label="Company Name" icon="building"/>

                            <HrmsTextInput name="website" label="Website" icon="globe"/>

                            <HrmsTextInput name="email" label="Email" icon="mail"/>
                            <HrmsTextInput name="phoneNumber" label="Phone Number" icon="phone"/>
                            <HrmsTextInput name="password" type="password" label="Password" icon="lock" />
                            <HrmsTextInput name="confirmPassword" type="password" label="Confirm Password" icon="lock" />

                            <Button type="submit" fluid color="violet" style={{marginBottom:"30px", marginTop:"30px"}}>Register</Button>

                            Already have an account? <Link to="/login">Login</Link>              

                    </Segment>
                    </Card> 
                </Form>
            </Formik>
            


        </div>
    )
}