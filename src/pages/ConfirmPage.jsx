import React, { Component } from "react";
import { Input, Menu, Segment } from "semantic-ui-react";
import ConfirmEmployerUpdate from "./ConfirmEmployerUpdate";
import ConfirmJobAdverts from "./ConfirmJobAdverts";

export default class ConfirmPage extends Component {
    
    state = { activeItem: 'Job Advert Requests' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state

        return (
            <div>
                <Menu attached='top' tabular>
                    <Menu.Item
                        name='Job Advert Requests'
                        icon="clipboard"
                        active={activeItem === 'Job Advert Requests'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        name='Update Requests'
                        icon="undo"
                        active={activeItem === 'Update Requests'}
                        onClick={this.handleItemClick}
                    />
                </Menu>

                { activeItem === "Job Advert Requests" ? 
                    (
                        <Segment attached='bottom'>
                            <ConfirmJobAdverts/>
                        </Segment>
                    ): (
                        <Segment attached='bottom'>
                            <ConfirmEmployerUpdate/>
                        </Segment>
                    )}
                    
            </div>
        )
  }
}
