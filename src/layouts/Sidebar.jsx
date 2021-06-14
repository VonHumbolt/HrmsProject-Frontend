import React from 'react'
import { Header, Icon, Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
export default function Sidebar() {
    return (
        <div>
            <Menu vertical>
          <Menu.Item>
                
            <Header as="h4" as={NavLink} to="/jobAdverts"><Icon name="tasks"/>Job Adverts</Header> 
          </Menu.Item>
          <Menu.Item>
                <Header as="h4" as={NavLink} to="/jobPositions"><Icon name="clipboard"/>Job Positions</Header>
            </Menu.Item>
          <Menu.Item>
                <Header as="h4" as={NavLink} to="/jobSeekers"><Icon name="address book outline"/>Job Seekers</Header>
            </Menu.Item>
            <Menu.Item>
                <Header as="h4" as={NavLink} to="/employers"><Icon name="building"/> Employers</Header>
            </Menu.Item>
        </Menu>
        </div>
    )
}
