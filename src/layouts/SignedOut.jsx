import React from 'react'
import { Menu, Button, Header } from 'semantic-ui-react'

export default function SignedOut({signedIn}) {

    return (
        <div>
            <Button onClick={signedIn}>Sign In</Button>
            <Button>Register</Button>
        </div>
    )
}
