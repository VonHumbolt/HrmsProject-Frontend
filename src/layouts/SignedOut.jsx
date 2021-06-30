import React from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from 'semantic-ui-react'

export default function SignedOut({signedIn}) {

    return (
        <div>
            <Button size="tiny" onClick={signedIn} style={{marginTop:"5px"}} color="violet">Sign In</Button>
            <Button size="tiny" as={NavLink} to="/register" color="violet">Register</Button>
        </div>
    )
}
