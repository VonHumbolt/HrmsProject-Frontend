import React, { useEffect, useState } from "react";
import { Button, Card, Divider, Header, Image, Segment } from "semantic-ui-react";
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

  function calculateJobSeekerAge(birthDate) {
    let birthDateMilliSecond =  Date.parse(birthDate)

    let birthYear = new Date(birthDateMilliSecond).getFullYear()
    let currentYear = new Date().getFullYear()

    let age = currentYear - birthYear;
    return age;
  } 

  return (
    <div>
    
      <Header as="h2" textAlign="left">Job Seekers</Header>
      <Divider/>
      <Segment color="purple">
      <Card.Group itemsPerRow={3}>
        {jobSeekers.map((jobSeeker) => (
          <Card key={jobSeeker.jobSeekerId} color="purple">
            <Card.Content>
              <Image
                floated='left'
                size='tiny'
                src={jobSeeker.imageUrl? jobSeeker.imageUrl : "https://res.cloudinary.com/dspea8wm4/image/upload/v1624285292/default_profile_rnssv9.png"}
              />
              <Card.Header>
                {jobSeeker.firstName + " " + jobSeeker.lastName}
              </Card.Header>
              <Card.Meta style={{marginTop:"10px"}}>{jobSeeker.jobPositionName}</Card.Meta>
              <br />
              <Card.Meta>Age: {calculateJobSeekerAge(jobSeeker.dateOfBorn)}</Card.Meta>
            </Card.Content>
            
            <Card.Content extra>
              <Link style={{color:"inherit"}} to={`/jobSeekers/${jobSeeker.id}`}>
                <div className="ui two buttons">
                  <Button basic  color="violet">
                      Detail
                  </Button>
                </div>
              </Link>
            </Card.Content>
            
          </Card>
        ))}
      </Card.Group>
      </Segment>

    </div>
  );
}
