import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import ResumeService from "../../services/resumeService";
import {
  Grid,
  GridColumn,
  Image,
  Container,
  Header,
  Icon,
  Divider,
  Segment,
  Rating,
  Button
} from "semantic-ui-react";

export default function ResumeDetail() {
  let { jobSeekerId } = useParams();

  const [resume, setResume] = useState({});
  useEffect(() => {
    let resumeService = new ResumeService();

    resumeService
      .getResumeByJobSeekerId(jobSeekerId)
      .then((response) => setResume(response.data.data));
  }, []);

  return (
    <div>
      <Segment color="teal">
        <Grid>
          <Grid.Row>
            <GridColumn width={5}>
              <Container style={{ background: "teal", height: "100%" }}>
                <Image
                  src={resume.userImage?.imageUrl}
                  size="medium"
                  circular
                />

                <Header as="h3">Personal</Header>
                <Divider />

                <Container style={{ paddingLeft: "10px" }} textAlign="left">
                  <Header as="h4">
                    <Icon name="user" /> Name
                  </Header>
                  <p>
                    <b>
                      {resume.jobSeeker?.firstName} {resume.jobSeeker?.lastName}
                    </b>
                  </p>
                  <Divider />

                  <Header as="h4">
                    {" "}
                    <Icon name="calendar alternate outline" /> Birthday
                  </Header>
                  <p>
                    <b>{new Date(resume.jobSeeker?.dateOfBorn).toLocaleDateString()}</b>
                  </p>
                  <Divider />
                  <Header as="h4">
                    <Icon name="at" /> Social
                  </Header>
                      <b>{resume.githubAddress}</b> <br />
                      <b>{resume.linkedinAdress}</b>
                </Container>
              </Container>
            </GridColumn>

            <GridColumn width={11}>
              <Header as="h2">
                {" "}
                {resume.jobSeeker?.firstName} {resume.jobSeeker?.lastName}{" "}
              </Header>
              <Divider />
              <Header style={{ marginTop: "10px" }} floated="left" as="h3">
                <Icon name="graduation" /> Education
              </Header>
              <br />
              <Segment style={{ marginTop: "30px" }}>
                <Grid>
                  {resume.schools?.map((school) => (
                    <Grid.Row>
                      <Grid.Column width="4">
                        {school.startYear}-{school.graduationYear}
                      </Grid.Column>
                      <Grid.Column width="12">
                        <b>
                          {" "}
                          {school.schoolDepartment} - {school.schoolName}{" "}
                        </b>
                      </Grid.Column>
                    </Grid.Row>
                  ))}
                </Grid>
              </Segment>

              <Header style={{ marginTop: "10px" }} floated="left" as="h3">
                <Icon name="briefcase" /> Job Experience
              </Header>
              <br />
              <Segment style={{ marginTop: "30px" }}>
                <Grid>
                  {resume.jobExperiences?.map((jobExperience) => (
                    <Grid.Row key={jobExperience.jobExperienceId}>
                      <Grid.Column width={5}>
                        {jobExperience.startYear}-{jobExperience.endYear}
                      </Grid.Column>
                      <Grid.Column width={11}>
                        <b>
                          {" "}
                          {jobExperience.workPlaceName} -{" "}
                          {jobExperience.position}{" "}
                        </b>
                      </Grid.Column>
                    </Grid.Row>
                  ))}
                </Grid>
              </Segment>
              <Header style={{ marginTop: "10px" }} floated="left" as="h3">
                <Icon name="code" /> Abilities
              </Header>
              <br />
              <Segment style={{ marginTop: "30px" }} textAlign="left">
                <ul>
                  {resume.abilities?.map((ability) => (
                    <li>
                      <b>{ability.technology}</b>
                    </li>
                  ))}
                </ul>
              </Segment>

              <Header style={{ marginTop: "10px" }} floated="left" as="h3">
                <Icon name="language" /> Languages
              </Header>
              <br />
              <Segment style={{ marginTop: "30px" }} textAlign="left">
                <Grid>
                  {resume.languages?.map((language) => (
                    <Grid.Row>
                      <Grid.Column width="5">
                        <li>
                          <b>{language.languageName}</b>
                        </li>
                      </Grid.Column>
                      <Grid.Column width="11">
                        <Rating
                          defaultRating={language.languageLevel}
                          maxRating={5}
                          disabled
                        />
                      </Grid.Column>
                    </Grid.Row>
                  ))}
                </Grid>
              </Segment>

              <Header style={{ marginTop: "10px" }} floated="left" as="h3">
                <Icon name="tag" /> About Me
              </Header>
              <br />
              <Segment style={{ marginTop: "30px" }}>
                <p>{resume.coverLetter}</p>
              </Segment>
            </GridColumn>
          </Grid.Row>
        </Grid>
      <Button color="teal" as={NavLink} to={`/resume/update/${resume.resumeId}`} style={{marginTop:"20px"}} >Update Resume</Button>

      </Segment>

    </div>
  );
}
