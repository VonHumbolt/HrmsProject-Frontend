import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Menu, Dropdown, Icon } from 'semantic-ui-react'

export default function FavoriteJobAdverts() {

    const favoriteAdverts = useSelector((state) => state.favoritesJob)
    
    return (
        <div>
            <Menu.Item name='inbox' color="teal">        
                <Dropdown text="Favorites">
                    <Dropdown.Menu>
                        <Dropdown.Header><Icon name="heart"/> Favorites</Dropdown.Header>
                        <Dropdown.Divider />

                        {favoriteAdverts.favoriteJobs?.map((favoriteAdvert) => (
                            <Dropdown.Item key={favoriteAdvert.favoriteId} text={favoriteAdvert.jobDescription} as={NavLink} to={`/jobAdverts/${favoriteAdvert.advertId}`}/>
                        ))}
                        <Dropdown.Divider />
                        <Dropdown.Item text='All Favorite Adverts' as={NavLink} to="/favoriteJobAdverts/" />
                    </Dropdown.Menu>
                </Dropdown>
            </Menu.Item>

      </div>
    )
}
