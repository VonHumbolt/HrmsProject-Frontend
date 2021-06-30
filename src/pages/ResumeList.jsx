import React, {useState, useEffect} from "react";
import { NavLink } from "react-router-dom";
import { Segment, Divider, Header, List, Icon } from "semantic-ui-react";
import ResumeService from "../services/resumeService"

export default function ResumeList() {

    const [resumes, setResumes] = useState([])

    useEffect(() => {
        let resumeService = new ResumeService()
        resumeService.getAllResumes().then(response => setResumes(response.data.data))
       
    }, [])

  return (
    <div>
      <Segment color="violet">
        <Header as="h2" floated="left">
          Job Seeker's CV
        </Header>

        <Divider clearing />
        {resumes.map((resume) => (
            <Segment key={resume.resumeId} color="grey">
            <Header as="h3">{resume.jobSeeker.firstName + " " + resume.jobSeeker.lastName}</Header>
            <List as={NavLink} to={`/resumes/${resume.jobSeeker.jobSeekerId}`}>
              <List.Item as="a">
                <List.Content>

                  <List.Header>Abilities <Icon name="check"/></List.Header>
                  <List.Description>
                    {resume.abilities[0].technology}
                  </List.Description>
                  <br />
                  <List.Header>Cover Letter <Icon name="pencil alternate"/></List.Header>
                  <List.Description>
                    {resume.coverLetter}
                  </List.Description>
                    <br />
                  <List.Header>Social <Icon name="at"/></List.Header>
                  <List.Description>
                    <p><Icon name="github"/><b>{resume.githubAddress}</b></p>
                    <Icon name="linkedin"/><b>{resume.linkedinAdress}</b>
                  </List.Description>
                </List.Content>
        
              </List.Item>
            </List>
          </Segment>
  
        ))}
      </Segment>
    </div>
  );
}
