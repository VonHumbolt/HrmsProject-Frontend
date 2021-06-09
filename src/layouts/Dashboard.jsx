import React from 'react'
import { Grid } from 'semantic-ui-react'
import EmployerList from '../pages/EmployerList'
import JobAdvertList from '../pages/JobAdvertList'
import JobPositionList from '../pages/JobPositionList'
import JobSeekerDetail from '../pages/JobSeekerDetail'
import JobSeekerList from '../pages/JobSeekerList'
import ResumeList from '../pages/ResumeList'
import Sidebar from './Sidebar'

export default function Dashboard() {
    return (
        <div>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={4}>
                        <Sidebar />
                    </Grid.Column>
                    <Grid.Column width={12}>
                        <EmployerList />
                    </Grid.Column>
             </Grid.Row>
             </Grid>
        </div>
    )
}
