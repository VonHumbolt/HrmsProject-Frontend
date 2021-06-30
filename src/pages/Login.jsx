import { useFormik } from 'formik'
import React from 'react'
import { Button, Form, Card, Container } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default function Login() {

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        onSubmit: values => {
            // authService
           
        }
    })

    return (
        <div>
            <Container>
                <Card centered style={{height:"350px", width:"600px"}}>
                    <Card.Content>
                        <Card.Header style={{marginTop: "20px", marginBottom:"50px"}}><h1 style={{fontFamily:"sans-serif"}}>Login with your account</h1></Card.Header>

                        <Card.Description>
                            <Form onSubmit={formik.handleSubmit}>
                                <Form.Field style={{marginBottom:"20px"}}>
                                
                                    <Form.Input name="email" type="email" onChange={formik.handleChange} icon="mail" iconPosition="left" required placeholder='Email' />
                                </Form.Field>
                                <Form.Field style={{marginBottom:"30px"}}>
                                    <Form.Input name="password" type="password" onChange={formik.handleChange} icon="lock" iconPosition="left" required placeholder='Password' />
                                </Form.Field>
                                <Button fluid type='submit' color="violet" style={{marginBottom:"25px"}}>Login</Button>
                                
                                Do not have an account? <Link to="/register">Register Now</Link>
                            
                            </Form>
                        </Card.Description>
                    </Card.Content>
                </Card>

            </Container>
        </div>
    )
}
