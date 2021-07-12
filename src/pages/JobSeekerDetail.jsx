import React, { useEffect, useState } from "react";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { Container, Divider, Header, Segment, Icon, Label, Grid, GridColumn, Rating, Button } from "semantic-ui-react";
import JobSeekerService from "../services/jobSeekerService";
import ResumeService from "../services/resumeService";

export default function JobSeekerDetail() {
  let { id } = useParams();

  const history = useHistory()

  const resumeService = new ResumeService()

  const [jobSeeker, setJobSeeker] = useState({});
  const [jobSeekerResume, setJobSeekerResume] = useState({});

  useEffect(() => {
    let jobSeekerService = new JobSeekerService();
    jobSeekerService
      .getJobSeekerByJobSeekerId(id)
      .then((response) => setJobSeeker(response.data.data));
  }, []);

  useEffect(() => {
    resumeService
      .getResumeByJobSeekerId(id)
      .then((response) => setJobSeekerResume(response.data.data));
  }, []);

  function handleResumeAdd() {
    resumeService.add({jobSeekerId: 11}).then(response => {
      if (response.data.success) { 
        history.push("/resume/add/"+11)
      }
    })
  }

  return (
    <div>
      <Header as="h2" textAlign="center">
        {jobSeeker.firstName} {jobSeeker.lastName}
      </Header>
      
      <Divider horizontal>
        <Header as="h4">{jobSeeker.jobPositionName}</Header>
      </Divider>
      
      <Container textAlign="left">
        <Segment>
          <Grid.Row>
            <GridColumn width={12}>
                <Header as="h4">About Me <Icon name="hand peace outline"/></Header>
            </GridColumn>
            <GridColumn width={4}>

              {jobSeekerResume ? (
                  <Label as='a' color='orange' ribbon='right' as={NavLink} to={`/resumes/${id}`}>
                    Click to See Cv
                  </Label>
              ) : null}
            
            </GridColumn>
          </Grid.Row>
          <Container text>
          <p style={{fontSize:14}}>
            {jobSeekerResume?.coverLetter}
          </p>
          </Container>
        <Divider/>
          <Header as="h4">Technologies <Icon name="code"/> </Header>
          <ul>
            {jobSeekerResume?.abilities?.map((ability) => (
                <li>{ability.technology}</li>
              ))}
          </ul>

          <Divider />

          <Header as="h4">Language <Icon name="language"/></Header>
          <ul>
            {jobSeekerResume?.languages?.map((language) => (
                <li>
                  {" "}
                  {language.languageName} <Rating style={{marginLeft:20}} defaultRating={language.languageLevel} maxRating={5} disabled />
                  
                </li> 
              ))}
          </ul>

          <Divider />

          <Header as="h4">Job Experience <Icon name="briefcase"/> </Header>
          <ul>
            {jobSeekerResume?.jobExperiences?.map((jobExp) => (
                <li>
                  {" "}
                  {jobExp.workPlaceName} - {jobExp.position} ({jobExp.startYear}{" "}
                  - {jobExp.endYear}){" "}
                </li>
              ))}
          </ul>

          <Divider />
          <Header as="h4">Social <Icon name="github alternate" /></Header>
          <ul>
            <li>{jobSeekerResume?.githubAddress}</li>
            <li>{jobSeekerResume?.linkedinAdress}</li>
          </ul>
        </Segment>

        {jobSeekerResume ? null : (
            <Button color="violet" onClick={() => handleResumeAdd()} fluid>Add Resume</Button>
        )}
        
        

      </Container>
    </div>
  );
}
