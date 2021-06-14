import React from 'react'
import { Menu, Image, Dropdown } from 'semantic-ui-react'

export default function SignedIn({signedOut}) {
    return (
        <div>
            <Menu.Item>
                <Image avatar spaced="right" src='https://react.semantic-ui.com/images/avatar/large/matthew.png' />
                <Dropdown pointing="top right">
                    <Dropdown.Menu>
                        <Dropdown.Item text="Profile" icon="user circle"/>
                        <Dropdown.Item onClick={signedOut} text="Sign Out" icon="sign-out" />
                    </Dropdown.Menu>
                </Dropdown>
            </Menu.Item>
        </div>
    )
}
