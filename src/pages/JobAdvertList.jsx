import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Divider,
  Header,
  Card,
  Label,
  GridColumn,
  Grid,
  Button,
  Modal,
  Form,
  Icon
} from "semantic-ui-react";
import JobAdvertService from "../services/jobAdvertService";
import { Formik, useFormik } from "formik";

export default function JobAdvertList() {
  const [jobAdverts, setjobAdverts] = useState([]);
  const [open, setOpen] = useState(false);
  const [secondOpen, setSecondOpen] = useState(false)
  const [isDataPost, setIsDataPost] = useState(false)

  useEffect(() => {
    let jobAdvertService = new JobAdvertService();
    jobAdvertService
      .getJobAdvertDto()
      .then((response) => setjobAdverts(response.data.data));
  }, []);

  const formik = useFormik({
    initialValues: {
      minSalary:"",
      maxSalary:"",
      countOfJob:"",
      deadline:"",
      jobDescription:""
    },
    onSubmit: values => {
      
      // let jobAdvertService = new JobAdvertService();
      // jobAdvertService.add(values).then(response => {
      //   setIsDataPost(true)
        
      // })

    }
  })

  return (
    <div>
      <Grid>
        <Grid.Row>
          <GridColumn width={11}>
            <Header as="h2" textAlign="left">
              Job Adverts
            </Header>
          </GridColumn>
          <GridColumn width={3} floated="right">
            <Modal
              closeIcon
              onClose={() => setOpen(false)}
              onOpen={() => setOpen(true)}
              open={open}
              trigger={<Button basic color="violet">Add New Job</Button>}
            >
              <Modal.Header>Add New Job Advert <Icon name="paperclip"/> </Modal.Header>
              <Modal.Content>
              
                <Form onSubmit={formik.handleSubmit}>
                  <Form.Field>
                    <Form.Select
                        required
                        fluid
                        label='Job Position Name'
                        options={[ { key: 'm', text: 'Male', value: 'male' }, { key: 'a', text: 'Male', value: 'male' }]}
                        placeholder='Job Position Name'
                      />
                    <Form.Select
                      required
                      fluid
                      label='Work Place'
                      options={[ { key: 'r', text: 'Remote', value: 'remote' }, { key: 'p', text: 'In Place', value: 'inPlace' }]}
                      placeholder='Work Place'
                    />
                    <Form.Select
                      required
                      fluid
                      label='Job Type'
                      options={[ { key: 'f', text: 'Full Time', value: 'fullTime' }, { key: 'h', text: 'Half Time', value: 'halfTime' }]}
                      placeholder='Job Type'
                    />
                    <Form.Group widths="equal">
                        <Form.Input name="minSalary" onChange={formik.handleChange} icon="try" iconPosition="left" fluid label='Min Salary' placeholder='Min Salary' />
                        <Form.Input name="maxSalary" onChange={formik.handleChange} icon="try" iconPosition="left" fluid label='Max Salary' placeholder='Max Salary' />
                        <Form.Input name="countOfJob" onChange={formik.handleChange} fluid label='Worker Quota' placeholder='Worker Quota' required />
                    </Form.Group>

                    <Form.Input name="deadline" onChange={formik.handleChange} required icon="calendar alternate outline" iconPosition="left" fluid label="Deadline" placeholder="Deadline" />
                    <Form.Field name="jobDescription" onChange={formik.handleChange} required placeholder="About Job" label="Job Description" control="textarea" rows="6"/>
 
                  </Form.Field>
            
                  <Button color="violet" style={{marginBottom:20}} onClick={() => {isDataPost && setSecondOpen(true)}} floated="right" type="submit"> Add Job Advert <Icon style={{marginLeft:10}} name="checkmark"/></Button>
                
                </Form>
                
              </Modal.Content>
        
              <Modal
                onClose={() => setSecondOpen(false)}
                open={secondOpen}
                size="small"
              >
                <Modal.Header>Successfully Added <Icon name="checkmark"/></Modal.Header>
                <Modal.Content>
                  <p><b>Your Job Advert has been transmitted to the system.</b></p>
                  <p><b>It will appear on the advert page after it is approved by the system.</b></p>
                </Modal.Content>
                <Modal.Actions>
                  <Button onClick={() => {setSecondOpen(false)}} positive>Ok</Button>
                </Modal.Actions>
              </Modal>

            </Modal>
            
          </GridColumn>
        </Grid.Row>
      </Grid>
      <Divider />

      <Card.Group>
        {jobAdverts.map((jobAdvert) => (
          <Card
            fluid
            color="violet"
            as={NavLink}
            to={`/jobAdverts/${jobAdvert.id}`}
          >
            <Label as="a" color="violet" ribbon="right" floating>
              New
            </Label>
            <Card.Content>
              <Card.Header>{jobAdvert.jobPositionName}</Card.Header>
              <Card.Meta>{jobAdvert.companyName}</Card.Meta>
              <Card.Description>
                <b>City:</b> {jobAdvert.cityName}
              </Card.Description>
              <Card.Description>
                <b>Quota:</b> {jobAdvert.countOfJob}
              </Card.Description>
              <Card.Description>
                <b>Published At:</b> {jobAdvert.publishedDate}
              </Card.Description>
              <Card.Description>
                <b>Deadline:</b> {jobAdvert.deadline}
              </Card.Description>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </div>
  );
}

