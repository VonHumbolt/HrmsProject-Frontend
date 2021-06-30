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
  Icon,
  FormGroup
} from "semantic-ui-react";
import JobAdvertService from "../services/jobAdvertService";
import JobPositionService from "../services/jobPositionService";
import CityService from "../services/cityService";
import { Formik, Form } from "formik";
import * as yup from 'yup';
import HrmsSelect from "../utilities/customFormControls/HrmsSelect";
import HrmsTextInput from "../utilities/customFormControls/HrmsTextInput";

export default function JobAdvertList() {
  const [jobAdverts, setjobAdverts] = useState([]);
  const [open, setOpen] = useState(false);
  const [secondOpen, setSecondOpen] = useState(false)
  const [jobPositions, setJobPositions] = useState([])
  const [cities, setCities] = useState([])

  useEffect(() => {
    let jobAdvertService = new JobAdvertService();
    jobAdvertService
      .getJobAdvertDto()
      .then((response) => setjobAdverts(response.data.data));
  }, []);

  useEffect(() => {
    let jobPositionService = new JobPositionService();
    jobPositionService.getAllJobPositions().then((response) => setJobPositions(response.data.data))
    
  }, []);

  useEffect(() => {
    let cityService = new CityService();
    cityService.getAllCities().then(response => setCities(response.data.data))
    
  }, [])

  
  const initialValues = {
      jobPosition: {
            jobPositionId:0,
          },
      city: {cityId: 0},
      minSalary:"",
      maxSalary:"",
      countOfJob:"",
      deadline:"",
      jobDescription:""
  }

  const schema = yup.object({
    jobPositionId : yup.number().required("Please select a job position"),
    cityId : yup.number().required("Please select a city"),
    countOfJob : yup.number().required("Please enter a job count"),
    deadline : yup.string().required("Please enter a deadline for job"),
    jobDescription : yup.string().required("Please describe the job")
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
              
                <Formik
                  initialValues = {initialValues}
                  validationSchema = {schema}
                  onSubmit={ async (values) => {
                      values.jobPosition.jobPositionId = parseInt(values.jobPosition.jobPositionId)
                      values.city.cityId = parseInt(values.city.cityId)
                      console.log(values)

                      let jobAdvertService = new JobAdvertService();
                      await jobAdvertService.add(values).then(response => {
                        setSecondOpen(true)
                        console.log(response.data.message)
                      })
                  }}>
                  <Form className="ui form">
                
                        <HrmsSelect name="jobPosition.jobPositionId" 
                          options={
                            jobPositions.map(jobPosition => (
                              {key:jobPosition.jobPositionId, value: jobPosition.jobPositionName}
                            ) )}
                            label="Job Position"
                            placeholder="Job Position">

                        </HrmsSelect>

                        <FormGroup widths="equal">
                            <HrmsSelect
                              name="city.cityId"
                              options={ cities.map((city) => (
                                {key: city.cityId, text:city.cityName, value:city.cityName}
                              ))}
                              label="City"
                              placeholder='City'
                            />
                            <HrmsSelect
                              name="remote"
                              options={[ { key: 'r', value: 'Remote' }, { key: 'p', value: 'In Place' }]}
                              placeholder='Work Place'
                              label="Work Place"
                            />
                        </FormGroup>
                        
                        <HrmsSelect
                          name="jobType"
                          options={[ { key: 'f', value: 'Full Time' }, { key: 'h', value: 'Half Time' }]}
                          placeholder='Job Type'
                          label="Job Type"
                        />
                        <FormGroup widths="equal">
                            <HrmsTextInput name="minSalary" icon="try" label='Min Salary' placeholder='Min Salary' type="number" />
                            <HrmsTextInput name="maxSalary" icon="try" label='Max Salary' placeholder='Max Salary' type="number" />
                            <HrmsTextInput name="countOfJob" label='Worker Quota' placeholder='Worker Quota' type="number"/>
                        </FormGroup>

                        <HrmsTextInput name="deadline"  icon="calendar alternate outline" label="Deadline" placeholder="Deadline" />
                        <HrmsTextInput name="jobDescription" placeholder="About Job" label="Job Description" control="textarea" rows="6"/>
        
                    <Button color="violet" style={{marginBottom:20}}  floated="right" type="submit"> Add Job Advert <Icon style={{marginLeft:10}} name="checkmark"/></Button>
                  
                  </Form>
                    
                </Formik>
                
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
                  <Button onClick={() => {setOpen(false)}} positive>Ok</Button>
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
            key={jobAdvert.advertId}
            as={NavLink}
            to={`/jobAdverts/${jobAdvert.advertId}`}
          >
            <Label as="a" color="yellow" corner="left" icon="favorite"/>
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

