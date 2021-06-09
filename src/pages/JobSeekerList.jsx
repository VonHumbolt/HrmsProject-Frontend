import React, { useEffect, useState } from "react";
import { Button, Card, Divider, Header } from "semantic-ui-react";
import JobSeekerService from "../services/jobSeekerService";

export default function JobSeekerList() {
  const [jobSeekers, setJobSeekers] = useState([]);
  useEffect(() => {
    let jobSeekerService = new JobSeekerService();
    jobSeekerService
      .getAllJobSeekers()
      .then((response) => setJobSeekers(response.data.data));
  });

  return (
    <div>
      <Header as="h2" textAlign="left">Job Seekers</Header>
      <Divider/>
      <Card.Group itemsPerRow={3}>
        {jobSeekers.map((jobSeeker) => (
          <Card key={jobSeeker.jobSeekerId}>
            <Card.Content>
              <Card.Header>
                {jobSeeker.firstName + " " + jobSeeker.lastName}
              </Card.Header>
              <Card.Meta>{jobSeeker.jobPositionName}</Card.Meta>
              <Card.Description>{jobSeeker.dateOfBorn}</Card.Description>
            </Card.Content>
            <Card.Content extra>
              <div className="ui two buttons">
                <Button basic color="green">
                  Detail
                </Button>
              </div>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </div>
  );
}
