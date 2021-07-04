import React from 'react'
import { Segment, Divider, Button } from 'semantic-ui-react'
import { Formik, Form } from 'formik'
import * as yup from "yup"; 
import HrmsTextInput from '../utilities/customFormControls/HrmsTextInput';
import SystemPersonnelService from '../services/systemPersonnelService';

export default function SystemPersonnelUpdate() {

    const initialValues = {
        firstName: "", 
        lastName: "",
        email: ""
    }

    const schema = yup.object({
        firstName: yup.string().required("Please enter your First Name"),
        lastName: yup.string().required("Please enter your Last Name"),
        email: yup.string().email().required("Please enter an email")
    })

    return (
        <div>
            <Segment>
                <Divider horizontal style={{marginTop:"30px" ,marginBottom:"50px"}}>Update System Personnel Informations</Divider>

                <Formik 
                    initialValues = {initialValues}
                    validationSchema= {schema}
                    onSubmit={ async (values) => {
                        console.log(values)

                        let systemPersonnelService = new SystemPersonnelService()
                        systemPersonnelService.update(values).then(response => {
                            console.log(response.data.message)
                        })
                    }}>
                    
                    <Form className="ui form">
                        
                        <HrmsTextInput label="First Name" name="firstName" icon="user"/>
                        <HrmsTextInput label="Last Name" name="lastName" icon="user" />
                        <HrmsTextInput label="Email" name="email" icon="mail"/>

                        <Button color="violet" type="submit">Update</Button>
                    </Form>

                </Formik>
            </Segment>
        </div>
    )
}
