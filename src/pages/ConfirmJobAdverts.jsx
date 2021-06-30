import React, { useState, useEffect } from "react";
import JobAdvertService from "../services/jobAdvertService";
import { Button, Card, Label } from "semantic-ui-react";

export default function ConfirmJobAdverts() {
  const [unApprovedAdverts, setunApprovedAdverts] = useState([]);
  useEffect(() => {
    let jobAdvertService = new JobAdvertService();
    jobAdvertService.getPassiveJobAdvertDto().then((response) => {
      setunApprovedAdverts(response.data.data);
    });
  }, []);

  function handleApproveJobAdvert(jobAdvert) {
        let jobAdvertService = new JobAdvertService();
        jobAdvertService.approveJobAdvert(jobAdvert).then(response => {
            console.log(jobAdvert)
          console.log(response.data.message);
        })
        let newAdverts = unApprovedAdverts.filter((j) => j.advertId !== jobAdvert.advertId);
        setunApprovedAdverts(newAdverts)
  }

  function handleDeclineJobAdvert(jobAdvert) {
        let newAdverts = unApprovedAdverts.filter((j) => j.advertId !== jobAdvert.advertId);
        setunApprovedAdverts(newAdverts)
  }

  return (
    <div>
      <Card.Group>
        {unApprovedAdverts.map((advert) => (
            <Card fluid key={advert.advertId}>
            <Card.Content>
            <Label color='violet' ribbon attached="top">New Request !</Label>
              <Card.Header>{advert.companyName} wants to create a new job advert?</Card.Header>
              <Card.Meta style={{marginTop:"10px"}}>{advert.jobPositionName}</Card.Meta>
              <Card.Description style={{marginTop:"20px"}}>
                  <strong>Job Description: </strong>{advert.jobDescription} <br />
                  <strong>City: </strong> {advert.cityName} <br />
                  <strong>Quota: </strong>{advert.countOfJob} <br />
                  <strong>Deadline: </strong>{advert.deadline}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <div className="ui two buttons">
                <Button basic color="green" onClick={() => handleApproveJobAdvert(advert)}>
                  Approve
                </Button>
                <Button basic color="red" onClick={() => handleDeclineJobAdvert(advert)}>
                  Decline
                </Button>
              </div>
            </Card.Content>
          </Card>
        ))}
        
        
      </Card.Group>
    </div>
  );
}
