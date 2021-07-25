import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import {
  Container,
  Divider,
  Header,
  Segment,
  Icon,
  Button,
  Label
} from "semantic-ui-react";
import EmployerService from "../services/employerService";


export default function EmployerDetail() {
  let { employerId } = useParams();


  const [employer, setEmployer] = useState({})
  useEffect(() => {
      let employerService = new EmployerService()
      employerService.getEmployerByEmployerId(employerId).then(
          response => setEmployer(response.data.data)
      )
  }, [])

  return (
    <div>
      <Segment color="violet">

        <Header as="h2" textAlign="center" style={{marginTop:"20px", marginBottom:"30px"}}>
          {employer.companyName}
        </Header>      

        <Container textAlign="left">
          <Segment color="black">
        
            <Header as="h4" style={{marginBottom:"20px"}}>
                Company Name <Icon name="building" />
            </Header>
        
            <Container text>
              <p style={{ fontSize: 14 }}>
                <b>{employer.companyName} </b>
              </p>
            </Container>
            <Divider style={{marginTop:"30px", marginBottom:"30px"}}/>
            <Header as="h4">
              Web Site <Icon name="globe" />{" "}
            </Header>
            <ul>  
                <li><b> {employer.webSite} </b></li>
            </ul>

            <Divider style={{marginTop:"30px", marginBottom:"30px"}}/>

            <Header as="h4">
              Contact <Icon name="phone" />
            </Header>
            <ul>      
                <li>
                  <b> {employer.email} </b>
                </li> 
                <li>
                  <b> {employer.phoneNumber} </b>
                </li> 
            </ul>
          </Segment>
        </Container>
        { !employer.updateConfirmed ? (
          <Label  attached="bottom" color="orange" >
             Waiting for approval for update
          </Label>
       ) : (
        <Button color="violet" style={{marginTop:"20px"}} as={NavLink} to={`/employers/update/${employer.userId}`}>Update Employer Information</Button>
       )}
      </Segment>
    </div>
  );
}
