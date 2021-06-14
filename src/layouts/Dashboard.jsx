import React from 'react'
import { Grid } from 'semantic-ui-react'
import EmployerList from '../pages/EmployerList'
import JobAdvertList from '../pages/JobAdvertList'
import JobPositionList from '../pages/JobPositionList'
import JobSeekerDetail from '../pages/JobSeekerDetail'
import JobSeekerList from '../pages/JobSeekerList'
import ResumeList from '../pages/ResumeList'
import JobAdvertDetail from '../pages/JobAdvertDetail'
import Sidebar from './Sidebar'
import { Route } from 'react-router'
import ResumeDetail from '../pages/ResumeDetail'

export default function Dashboard() {
    return (
        <div>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={4}>
                        <Sidebar />
                    </Grid.Column>
                    <Grid.Column width={12}>
                        <Route exact path="/" component={JobAdvertList} />
                        <Route exact path="/jobAdverts" component={JobAdvertList} />
                        <Route path="/jobAdverts/:id" component={JobAdvertDetail} />
                        <Route exact path="/jobSeekers" component={JobSeekerList} />
                        <Route path="/jobSeekers/:id" component={JobSeekerDetail} />
                        <Route exact path="/resumes" component={ResumeList} />
                        <Route exact path="/resumes/:jobSeekerId" component={ResumeDetail} />
                        <Route exact path="/employers" component={EmployerList} />
                        <Route exact path="/jobPositions" component={JobPositionList} />
                    </Grid.Column>
             </Grid.Row>
             </Grid>
        </div>
    )
}
