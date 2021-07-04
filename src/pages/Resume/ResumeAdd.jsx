import React from 'react'
import { Input, Menu, Segment } from 'semantic-ui-react'

export default function ResumeAdd() {
    return (
        <div>
            <Menu attached='top' tabular>
          <Menu.Item
            name='bio'
          />
          <Menu.Item
            name='photos'
          />
          <Menu.Menu position='right'>
            <Menu.Item>
              <Input
                transparent
                icon={{ name: 'search', link: true }}
                placeholder='Search users...'
              />
            </Menu.Item>
          </Menu.Menu>
        </Menu>

        <Segment attached='bottom'>
          <img src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
        </Segment>
        </div>
    )
}
