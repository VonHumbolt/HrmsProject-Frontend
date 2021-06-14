import React, { useEffect, useState } from "react";
import { Button, Card, Divider, Header, Image } from "semantic-ui-react";
import JobSeekerService from "../services/jobSeekerService";
import { Link } from "react-router-dom";

export default function JobSeekerList() {
  const [jobSeekers, setJobSeekers] = useState([]);
  useEffect(() => {
    let jobSeekerService = new JobSeekerService();
    jobSeekerService
      .getAllJobSeekers()
      .then((response) => setJobSeekers(response.data.data));
  }, []);

  return (
    <div>
      <Header as="h2" textAlign="left">Job Seekers</Header>
      <Divider/>
      <Card.Group itemsPerRow={3}>
        {jobSeekers.map((jobSeeker) => (
          <Card key={jobSeeker.jobSeekerId}>
            <Card.Content>
              <Image
                floated='left'
                size='tiny'
                src='https://react.semantic-ui.com/images/avatar/large/jenny.jpg'
              />
              <Card.Header>
                {jobSeeker.firstName + " " + jobSeeker.lastName}
              </Card.Header>
              <Card.Meta>{jobSeeker.jobPositionName}</Card.Meta>
            </Card.Content>
            
            <Card.Content extra>
              <Link style={{color:"inherit"}} to={`/jobSeekers/${jobSeeker.id}`}>
                <div className="ui two buttons">
                  <Button basic color="green">
                      Detail
                  </Button>
                </div>
              </Link>
            </Card.Content>
            
          </Card>
        ))}
      </Card.Group>
    </div>
  );
}
