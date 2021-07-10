import React from 'react'
import { Segment, Grid, Button, Divider } from 'semantic-ui-react'
import { Formik, Form } from 'formik'
import HrmsTextInput from '../../../utilities/customFormControls/HrmsTextInput'

export default function SchoolAdd() {
  return (
        <div>
            <Segment color="green">
        <Divider horizontal>Add Your School Informations</Divider>

              <Formik>
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
                      <Button positive circular icon="add" type="onSubmit"  style={{marginTop:"20px"}} />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Segment>
              </Form>
              </Formik>
  
            <Button content='Job Experiences' icon='right arrow' 
                  labelPosition='right' floated="right" style={{marginTop:"30px"}} 
                  color="violet"  />

        </Segment>
        </div>
    )
}
