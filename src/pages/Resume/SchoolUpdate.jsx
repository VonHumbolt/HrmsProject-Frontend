import React from "react";
import {
  Button,
  Segment,
  Divider,
  Grid,
} from "semantic-ui-react";
import { Formik, Form } from "formik";
import HrmsTextInput from "../../utilities/customFormControls/HrmsTextInput";
import SchoolService from "../../services/schoolService";
import { toast, ToastContainer } from "react-toastify";

export default function SchoolUpdate({ goToJobExperienceComponent, schools }) {

  const schoolService = new SchoolService();

  return (
    <div>
      <ToastContainer position="top-right" />
      <Segment color="green">
        <Divider horizontal>Update Your School Informations</Divider>

            {schools?.map((school) => (
              <Formik
                initialValues={{schoolId : school.schoolId, schoolName: school.schoolName, schoolDepartment: school.schoolDepartment,
                                startYear: school.startYear, graduationYear: school.graduationYear}}
                onSubmit={(values) => {
                 
                  schoolService.update(values).then(response => {
                    if(response.data.success) {
                      toast.success("Changes are saved")
                    }
                  })
                
              }}
              key={school.schoolId}
            >
              <Form className= "ui form">
                <Segment color="green" style={{marginTop:"50px"}}>
                <Grid>
                  <Grid.Row>
                    <Grid.Column width={10}>
                      <HrmsTextInput name="schoolName" label="School Name" />
                      <HrmsTextInput name="schoolDepartment" label="School Department"  />
                    </Grid.Column>
                    <Grid.Column width={6} style={{marginTop:"30px"}}>
                      <Grid columns={2}>
                        <Grid.Row>
                          <Grid.Column>
                              <HrmsTextInput name="startYear" label="Start Year" type="number"  />
                              
                          </Grid.Column>
                          <Grid.Column>
                          <HrmsTextInput name="graduationYear" label="Graduation Year" type="number" />
  
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                      <Button positive circular icon="checkmark" content="Confirm" type="onSubmit"  style={{marginTop:"20px"}} />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Segment>
              </Form>
              </Formik>
  
            ))}
           
            <Button content='Job Experiences' icon='right arrow' 
                  labelPosition='right' floated="right" style={{marginTop:"30px"}} 
                  color="violet" onClick={goToJobExperienceComponent} />

        </Segment>
    </div>
  );
}
