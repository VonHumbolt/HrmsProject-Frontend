import React from 'react'
import { Segment, Grid, Image, Divider } from 'semantic-ui-react'

export default function PersonalUpdate({goToLanguagesComponent, resume}) {
    return (
        <div>
            <Segment>
                <Divider horizontal>Update Your Personal Informations</Divider>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={3}>
                            <Image src={resume.userImage?.imageUrl} />
                        </Grid.Column>
                        <Grid.Column width={13}>
                            FirstName
                            LastName
                            Github
                            linkedIn
                            coverLetter
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        </div>
    )
}
