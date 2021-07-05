import React from 'react'
import {
    Button,
    Segment,
    Divider,
    Grid,
  } from "semantic-ui-react";
import { Formik, Form } from "formik";
import HrmsTextInput from "../../utilities/customFormControls/HrmsTextInput";
import JobExperienceService from '../../services/jobExperienceService';
import { toast, ToastContainer } from "react-toastify";

export default function JobExperiencesUpdate({ goToAbilitiesComponent, goToSchoolComponent, jobExperiences}) {

    const jobExperienceService = new JobExperienceService();

    return (
        <div>
        <ToastContainer position="top-right" />
      <Segment color="orange">
        <Divider horizontal>Update Your Job Experience Informations</Divider>

            {jobExperiences?.map((jobExperience) => (
              <Formik
              initialValues={{experienceId: jobExperience.experienceId, workPlaceName: jobExperience.workPlaceName, 
                                position: jobExperience.position, startYear: jobExperience.startYear, endYear: jobExperience.endYear}}
              onSubmit={(values) => {

                jobExperienceService.update(values).then(response => {
                    if(response.data.success) {
                        toast.success("Job Experience changes are saved")
                    }
                })
               
              }}
              key={jobExperience.experienceId}
            >
              <Form className= "ui form">
                <Segment color="orange" style={{marginTop:"50px"}}>
                <Grid>
                  <Grid.Row>
                    <Grid.Column width={10}>
                      <HrmsTextInput name="workPlaceName" label="Work Place Name" />
                      <HrmsTextInput name="position" label="Job Position" />
                    </Grid.Column>
                    <Grid.Column width={6} style={{marginTop:"30px"}}>
                      <Grid columns={2}>
                        <Grid.Row>
                          <Grid.Column>
                              <HrmsTextInput name="startYear" label="Start Year" type="number" />
                              
                          </Grid.Column>
                          <Grid.Column>
                          <HrmsTextInput name="endYear" label="End Year" type="number" />
  
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                      <Button color="orange" circular icon="checkmark" content="Confirm" type="onSubmit"  style={{marginTop:"20px"}} />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Segment>
              </Form>
              </Formik>
  
            ))}
           
            <Button content='Abilities' icon='right arrow' 
                  labelPosition='right' floated="right" style={{marginTop:"30px"}} 
                  color="violet" onClick={goToAbilitiesComponent} />

            <Button content='Schools' icon='left arrow' 
                  labelPosition='left' floated="left" style={{marginTop:"30px"}} 
                  color="violet" onClick={goToSchoolComponent} />

        </Segment>
        </div>
    )
}
