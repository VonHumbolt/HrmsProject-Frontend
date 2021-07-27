import React from 'react'
import { Grid } from 'semantic-ui-react'
import EmployerList from '../pages/EmployerList'
import JobAdvertList from '../pages/JobAdvertList'
import JobPositionList from '../pages/JobPositionList'
import JobSeekerDetail from '../pages/JobSeekerDetail'
import JobSeekerList from '../pages/JobSeekerList'
import ResumeList from '../pages/Resume/ResumeList'
import JobAdvertDetail from '../pages/JobAdvertDetail'
import Sidebar from './Sidebar'
import { Route } from 'react-router'
import ResumeDetail from '../pages/Resume/ResumeDetail'
import Login from '../pages/Login'
import Register from '../pages/Register'
import ResumeAdd from '../pages/Resume/ResumeAdd/ResumeAdd'
import ResumeUpdate from '../pages/Resume/ResumeUpdate'
import EmployerDetail from '../pages/EmployerDetail'
import EmployerUpdate from '../pages/EmployerUpdate'
import ConfirmPage from '../pages/ConfirmPage'
import JobSeekerFavoriteAdverts from '../pages/JobSeekerFavoriteAdverts'
import SystemPersonnelUpdate from '../pages/SystemPersonnelUpdate'
import Profile from '../pages/Profile'

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
                        <Route path="/jobAdverts/:advertId" component={JobAdvertDetail} />
                        <Route exact path="/jobSeekers" component={JobSeekerList} />
                        <Route path="/jobSeekers/:id" component={JobSeekerDetail} />
                        <Route exact path="/resumes" component={ResumeList} />
                        <Route exact path="/resumes/:jobSeekerId" component={ResumeDetail} />
                        <Route exact path="/employers" component={EmployerList} />
                        <Route exact path="/employers/:employerId" component={EmployerDetail} />
                        <Route exact path="/employers/update/:employerId" component={EmployerUpdate} />
                        <Route exact path="/jobPositions" component={JobPositionList} />
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                        <Route exact path="/resume/add/:jobSeekerId" component={ResumeAdd} />
                        <Route exact path="/resume/update/:resumeId" component={ResumeUpdate} />
                        <Route exact path="/confirmPage" component={ConfirmPage} />
                        <Route exact path="/favoriteJobAdverts" component={JobSeekerFavoriteAdverts} />
                        <Route exact path="/systemPersonnel/update" component={SystemPersonnelUpdate} />
                        <Route exact path="/profile/" component={Profile} />

                    </Grid.Column>
             </Grid.Row>
             </Grid>
        </div>
    )
}
