import React from 'react'
import { Header, Icon, Menu } from 'semantic-ui-react'

export default function Sidebar() {
    return (
        <div>
            <Menu vertical>
          <Menu.Item>
                
            <Header as="h4"><Icon name="tasks"/>Job Adverts</Header> 
          </Menu.Item>
          <Menu.Item>
                <Header as="h4"><Icon name="clipboard"/>Job Positions</Header>
            </Menu.Item>
          <Menu.Item>
                <Header as="h4"><Icon name="address book outline"/>Job Seekers</Header>
            </Menu.Item>
            <Menu.Item>
                <Header as="h4"><Icon name="building"/> Employers</Header>
            </Menu.Item>
        </Menu>
        </div>
    )
}
