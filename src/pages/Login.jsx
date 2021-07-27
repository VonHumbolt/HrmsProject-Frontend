import React, {useState} from 'react'
import { Container, Menu } from 'semantic-ui-react'
import EmployerLoginPage from './EmployerLoginPage'
import JobSeekerLoginPage from './JobSeekerLoginPage'

export default function Login() {

    const [active, setActive] = useState("personal")


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
                        name='employer'
                        active={active === 'employer'}
                        onClick={() => setActive("employer")}
                    />
                </Menu>
            </Container>

            {active === "personal" ? <JobSeekerLoginPage/> : null }
            {active === "employer" ? <EmployerLoginPage/> : null }

        </div>
    )
}
