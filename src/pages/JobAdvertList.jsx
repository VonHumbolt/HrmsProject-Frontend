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
  FormGroup, Dropdown, Pagination
} from "semantic-ui-react";
import JobAdvertService from "../services/jobAdvertService";
import JobPositionService from "../services/jobPositionService";
import CityService from "../services/cityService";
import { Formik, Form } from "formik";
import * as yup from 'yup';
import HrmsSelect from "../utilities/customFormControls/HrmsSelect";
import HrmsTextInput from "../utilities/customFormControls/HrmsTextInput";
import HrmsTextArea from "../utilities/customFormControls/HrmsTextArea";
import { toast, ToastContainer} from "react-toastify";

export default function JobAdvertList() {

  const jobAdvertService = new JobAdvertService();

  const [jobAdverts, setjobAdverts] = useState([]);
  const [open, setOpen] = useState(false);
  const [secondOpen, setSecondOpen] = useState(false)
  const [jobPositions, setJobPositions] = useState([])
  const [cities, setCities] = useState([])
  const [copyOfJobAdvertsState, setCopyOfJobAdvertsState] = useState([])
  const [pageSize, setPageSize] = useState(10)

  useEffect(() => {
    jobAdvertService
      .getAllJobAdvertByPage(1, pageSize)
      .then((response) => {
        setjobAdverts(response.data.data)
        setCopyOfJobAdvertsState(response.data.data)
      });
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
      jobType: {
        jobTypeId: 0
      },
      workPlace: {
        workPlaceId: 0
      },
      minSalary:"",
      maxSalary:"",
      countOfJob:"",
      deadline:"",
      jobDescription:""
  }

  const schema = yup.object({
    jobPosition : yup.object({
      jobPositionId : yup.number().required("Please select a job position")
    }),
    city: yup.object({
      cityId : yup.number().required("Please select a city")
    }),
    countOfJob : yup.number().required("Please enter a job count"),
    deadline : yup.string().required("Please enter a deadline for job"),
    jobDescription : yup.string().required("Please describe the job")
  })

  function handleStateByFilterType(filterType) {
    
    let filteredState = []

    if (filterType === "Remote Jobs") {
      filteredState = copyOfJobAdvertsState.filter((jobAdvert) => jobAdvert.workPlace.workPlaceName === "Remote")
    }
    else if (filterType === "In Place Jobs") {
      filteredState = copyOfJobAdvertsState.filter((jobAdvert) => jobAdvert.workPlace.workPlaceName === "In Place")
    }
    else if (filterType === "Full Time Jobs") {
      filteredState = copyOfJobAdvertsState.filter((jobAdvert) => jobAdvert.jobType.jobTypeName === "Full Time")
    }
    else if( filterType === "Half Time Jobs") {
      filteredState = copyOfJobAdvertsState.filter((jobAdvert) => jobAdvert.jobType.jobTypeName === "Half Time")
    }

    setjobAdverts(filteredState)
  }

  function handlePagination(pageNo) {
    jobAdvertService.getAllJobAdvertByPage(pageNo, pageSize).then(response => {
      setjobAdverts(response.data.data)
    })
  }

  function handlePageSize(pageSize) {
    setPageSize(pageSize)
    jobAdvertService.getAllJobAdvertByPage(1,pageSize).then(response => {
      setjobAdverts(response.data.data)
      toast.info(response.data.data.length + " Job Adverts are listed on the page")
    })
  }

  return (
    <div>
      <ToastContainer/>
      <Grid>
        <Grid.Row>
          <GridColumn width={11}>
            <Header as="h2" textAlign="left">
              <Dropdown text="Job Adverts">
                <Dropdown.Menu>
                  <Dropdown.Item icon="tag" text='Filter By Work Place' style={{marginTop:"10px"}} />
                  <Dropdown.Item text='Remote Jobs' label={{ color: 'violet', empty: true, circular: true }} onClick={(e) => handleStateByFilterType(e.target.innerHTML)}/>
                  <Dropdown.Item text='In Place Jobs' label={{ color: 'violet', empty: true, circular: true }} onClick={(e) => handleStateByFilterType(e.target.innerHTML)}/>
                  <Dropdown.Divider />

                  <Dropdown.Item icon="tag" text='Filter By Job Type' />
                  <Dropdown.Item text='Full Time Jobs' label={{ color: 'orange', empty: true, circular: true }} onClick={(e) => handleStateByFilterType(e.target.innerHTML)} />
                  <Dropdown.Item text='Half Time Jobs' label={{ color: 'orange', empty: true, circular: true }} onClick={(e) => handleStateByFilterType(e.target.innerHTML)}/>
                  <Dropdown.Divider />
                  
                  <Dropdown.Item>

                    <Dropdown text='The number of adverts on the page' >
                      <Dropdown.Menu>                        
                          <Dropdown.Header>Adverts Count</Dropdown.Header>
                          <Dropdown.Item onClick={(e) => handlePageSize(e.target.innerText)}><b>10</b></Dropdown.Item>
                          <Dropdown.Item onClick={(e) => handlePageSize(e.target.innerText)}><b>20</b> </Dropdown.Item>
                          <Dropdown.Item onClick={(e) => handlePageSize(e.target.innerText)}><b>50</b></Dropdown.Item>
                          <Dropdown.Item onClick={(e) => handlePageSize(e.target.innerText)}><b>100</b></Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Dropdown.Item>

                </Dropdown.Menu>
              </Dropdown> 
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
                              name="workPlace.workPlaceId"
                              options={[ { key: 1, value: 'Remote' }, { key: 2, value: 'In Place' }]}
                              placeholder='Work Place'
                              label="Work Place"
                            />
                        </FormGroup>
                        
                        <HrmsSelect
                          name="jobType.jobTypeId"
                          options={[ { key: 1, value: 'Full Time' }, { key: 2, value: 'Half Time' }]}
                          placeholder='Job Type'
                          label="Job Type"
                        />
                        <FormGroup widths="equal">
                            <HrmsTextInput name="minSalary" icon="try" label='Min Salary' placeholder='Min Salary' type="number" />
                            <HrmsTextInput name="maxSalary" icon="try" label='Max Salary' placeholder='Max Salary' type="number" />
                            <HrmsTextInput name="countOfJob" label='Worker Quota' placeholder='Worker Quota' type="number"/>
                        </FormGroup>

                        <HrmsTextInput name="deadline"  icon="calendar alternate outline" label="Deadline" type="date" placeholder="Deadline" />
                        <HrmsTextArea name="jobDescription" placeholder="About Job" label="Job Description" control="textarea" rows="6"/>
        
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
            <Label color="yellow" corner="left" icon="favorite"/>
            <Label color="violet" ribbon="right" floating>
              New
            </Label>
            <Card.Content>
              <Card.Header>{jobAdvert.jobPosition?.jobPositionName}</Card.Header>
              <Card.Meta>{jobAdvert.employer?.companyName}</Card.Meta>
              <Card.Description>
                <b>City:</b> {jobAdvert.city?.cityName}
              </Card.Description>
              <Card.Description>
                <b>Quota:</b> {jobAdvert.countOfJob}
              </Card.Description>
              <Card.Description>
                <b>Job Type:</b> {jobAdvert.jobType?.jobTypeName}
              </Card.Description>
              <Card.Description>
                <b>Work Place:</b> {jobAdvert.workPlace?.workPlaceName}
              </Card.Description>
              <Card.Description>
                <b>Deadline:</b> {jobAdvert.deadline}
              </Card.Description>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>

      <Pagination
        style={{marginTop:"20px"}}
        boundaryRange={0}
        defaultActivePage={1}
        ellipsisItem={null}
        firstItem={null}
        lastItem={null}
        siblingRange={1}
        totalPages={10}
        onPageChange={(e) => handlePagination(e.target.innerHTML)}
      />
    </div>
  );
}

