import { useFormik } from 'formik'
import React, {useState} from 'react'
import { Container, Menu } from 'semantic-ui-react'
import EmployerRegisterPage from './EmployerRegisterPage'
import JobSeekerRegisterPage from './JobSeekerRegisterPage'

export default function Register() {

    const [active, setActive] =  useState("personal")


    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            dateOfBorn: "",
            nationalIdentity:"",
            password: "",
            confirmPassword:""
        },
        onSubmit: values => {
            console.log(values)
        }
    })

    return (
        <div>
            
            <Container style={{width:"600px"}}>

                <Menu attached='top' tabular borderless>
                    <Menu.Item
                        name='personal'
                        active={active === 'personal'}
                        onClick={() => setActive("personal")}
                    />
                    <Menu.Item
                        name='company'
                        active={active === 'company'}
                        onClick={() => setActive("company")}
                    />
                </Menu>
            </Container>

            {active === "personal" ? <JobSeekerRegisterPage/> : null}
            {active === "company" ? <EmployerRegisterPage/> : null}

            

        </div>
    )
}
