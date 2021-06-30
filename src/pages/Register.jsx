import { useFormik } from 'formik'
import React from 'react'
import { Card, Container, Button, Form } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default function Register() {

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: ""
        },
        onSubmit: values => {
            console.log(values)
        }
    })

    return (
        <div>
            <Container>

                <Card centered style={{height:"450px", width:"600px"}}>      
                    <Card.Content>
                        <Card.Header style={{marginTop: "10px", marginBottom:"30px"}}><h1>Create an account</h1></Card.Header>
                        <Card.Description>
                            <Form onSubmit={formik.handleSubmit}>
                                <Form.Field style={{marginBottom:"20px"}}>
                                            
                                    <Form.Input name="firstName" type="text" onChange={formik.handleChange} icon="user" iconPosition="left" required placeholder='First Name' />
                                </Form.Field>
                                <Form.Field style={{marginBottom:"20px"}}>
                                    <Form.Input name="lastName" type="text" onChange={formik.handleChange} icon="user" iconPosition="left" required placeholder='Last Name' />
                                </Form.Field>
                                <Form.Field style={{marginBottom:"20px"}}>
                                    <Form.Input name="email" type="email" onChange={formik.handleChange} icon="mail" iconPosition="left" required placeholder='Email' />
                                </Form.Field>
                                <Form.Field style={{marginBottom:"30px"}}>
                                    <Form.Input name="password" type="password" onChange={formik.handleChange} icon="lock" iconPosition="left" required placeholder='Password' />
                                </Form.Field>

                                <Button fluid type='submit' color="violet" style={{marginBottom:"30px"}}>Register</Button>
                                
                                Already have an account? <Link to="/login">Login</Link>              
                            </Form>

                        </Card.Description>
                    </Card.Content>
                    
                </Card>

            </Container>

        </div>
    )
}
