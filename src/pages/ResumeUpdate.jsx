import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import ResumeService from "../services/resumeService";
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
import { Formik } from "formik";
import HrmsTextInput from "../utilities/customFormControls/HrmsTextInput";

export default function ResumeUpdate() {
  
    let {resumeId} = useParams()
    
    const [resume, setResume] = useState({})
    useEffect(() => {
        let resumeService = new ResumeService()
        resumeService.getResumeByResumeId(resumeId).then(
            response => setResume(response.data.data)
        )
    })

    const initialValues = {

    }

  return (
    <div>
      <Segment>
          <Formik 
            initialValues={initialValues}
            >

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
                <Container style={{ paddingLeft: "10px" }} textAlign="left">
                  <Header as="h4">
                    <Icon name="user" /> Name
                  </Header>
                  <p>
                    <b>
                      {/* {resume.jobSeeker?.firstName} {resume.jobSeeker?.lastName} */}
                    </b>
                  </p>
                  <Header as="h4">
                    {" "}
                    <Icon name="calendar alternate outline" /> Birthday
                  </Header>
                  <p>
                    {/* <b>{resume.jobSeeker?.dateOfBorn}</b> */}
                  </p>
                  <Header as="h4">
                    <Icon name="at" /> Social
                  </Header>
                  {/* <ul>
                    <li>
                      <b>{resume.githubAddress}</b>
                    </li>
                    <li>
                      <b>{resume.linkedinAdress}</b>
                    </li>
                  </ul> */}
                </Container>
              </Container>
            </GridColumn>

            <GridColumn width={11}>
              <Header as="h2">
                <Grid columns={2}>
                    <Grid.Row>
                        <GridColumn>
                            <HrmsTextInput 
                            type="text"
                            name="jobSeeker.firstName" 
                            style={{width:"200px"}}
                            placeholder={resume.jobSeeker?.firstName}/>
                        </GridColumn>

                        <GridColumn>
                            <HrmsTextInput 
                            name="jobSeeker.lastName" 
                            style={{width:"200px", marginLeft:"0px"}}
                            placeholder={resume.jobSeeker?.lastName} />
                        </GridColumn>

                    </Grid.Row>
                </Grid>
                
                

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
                            
                        <HrmsTextInput 
                                name="school.startYear" 
                                style={{width:"200px", marginLeft:"0px"}}
                                placeholder={school.startYear} />
                        <HrmsTextInput 
                                name="school.graduationYear" 
                                style={{width:"200px", marginLeft:"0px"}}
                                placeholder={school.graduationYear} />
                       
                      </Grid.Column>
                      <Grid.Column width="12">
                        <b>
                            <HrmsTextInput 
                                    name="school.schoolDepartment" 
                                    style={{width:"200px"}}
                                    placeholder={school.schoolDepartment} />
                        
                            <HrmsTextInput 
                                    name="school.schoolName" 
                                    style={{width:"200px"}}
                                    placeholder={school.schoolName} />
                    
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
                  {/* {resume.jobExperiences?.map((jobExperience) => (
                    <Grid.Row>
                      <Grid.Column width="5">
                        {jobExperience.startYear}-{jobExperience.endYear}
                      </Grid.Column>
                      <Grid.Column width="11">
                        <b>
                          {" "}
                          {jobExperience.workPlaceName} -{" "}
                          {jobExperience.position}{" "}
                        </b>
                      </Grid.Column>
                    </Grid.Row>
                  ))} */}
                </Grid>
              </Segment>
              <Header style={{ marginTop: "10px" }} floated="left" as="h3">
                <Icon name="code" /> Abilities
              </Header>
              <br />
              <Segment style={{ marginTop: "30px" }} textAlign="left">
                {/* <ul>
                  {resume.abilities?.map((ability) => (
                    <li>
                      <b>{ability.technology}</b>
                    </li>
                  ))}
                </ul> */}
              </Segment>

              <Header style={{ marginTop: "10px" }} floated="left" as="h3">
                <Icon name="language" /> Languages
              </Header>
              <br />
              <Segment style={{ marginTop: "30px" }} textAlign="left">
                <Grid>
                  {/* {resume.languages?.map((language) => (
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
                  ))} */}
                </Grid>
              </Segment>

              <Header style={{ marginTop: "10px" }} floated="left" as="h3">
                <Icon name="tag" /> About Me
              </Header>
              <br />
              <Segment style={{ marginTop: "30px" }}>
                {/* <p>{resume.coverLetter}</p> */}
              </Segment>
            </GridColumn>
          </Grid.Row>
        </Grid>

        </Formik>
        
      </Segment>
      <Button color="teal" as={NavLink} to="/resume/update" >Update Resume</Button>
    </div>
  );
}

