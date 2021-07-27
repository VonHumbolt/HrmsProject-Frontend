import { Form, Formik } from 'formik';
import React from 'react'
import { useSelector } from 'react-redux';
import { Button, Divider, Grid, Header, Image, Segment } from 'semantic-ui-react';
import HrmsTextInput from '../utilities/customFormControls/HrmsTextInput';

export default function Profile() {

    const user = useSelector(state => state.user).userInfo;

    const initialValues = {
        firstName: user.firstName,
        lastName: user.lastName,
        jobPosition: user.jobPosition,
        email: user.email,
        nationalIdentity: user.nationalIdentity,
        dateOfBorn: user.dateOfBorn
    }

    return (
        <div>
            <Segment color="blue">
                <Formik initialValues={initialValues}
                    onSubmit={(values) => {
                        console.log(values)
                    }}>
                    <Form className="ui form">
                        <Grid style={{marginTop:"10px"}}>
                            <Grid.Row>
                                <Grid.Column width={4}>
                                    <Image src="https://res.cloudinary.com/dspea8wm4/image/upload/v1624285292/default_profile_rnssv9.png" />
                                </Grid.Column>
                                <Grid.Column width={12}>
                                    <Header as="h2" >{user.firstName} {user.lastName} </Header>
                                    <Divider style={{marginTop:"30px", marginBottom:"30px"}} />
                                    <HrmsTextInput label="First Name" name="firstName" />
                                    <HrmsTextInput label="Last Name" name="lastName" />
                                    <HrmsTextInput label="Job Position" name="jobPosition" />
                                    <HrmsTextInput label="Email" name="email" icon="mail" />
                                    <HrmsTextInput label="National Identity" name="nationalIdentity" icon="address card" />
                                    <HrmsTextInput label="Date Of Birth" name="dateOfBorn" icon="calendar" type="date"/>
                                    <Button color="blue" style={{marginTop:"20px"}} type="submit" content="Update Profile" icon="checkmark" floated="right"/>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Form>
                </Formik>
               

            </Segment>
        </div>
    )
}
