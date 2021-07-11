import React, {useState} from 'react'
import { Segment, Grid, Divider, Button, Transition, List } from 'semantic-ui-react'
import { Formik, Form } from 'formik'
import HrmsTextInput from '../../../utilities/customFormControls/HrmsTextInput'
import JobExperienceService from '../../../services/jobExperienceService'
import { toast, ToastContainer } from 'react-toastify'

export default function JobExperienceAdd({goToSchoolComponent, goToAbilityComponent}) {

  const jobExperienceCount = ["1", "2", "3" , "4" , "5", "6", "7", "8", "9", "10"]
  const initialValues = {
    workPlaceName: "",
    position:"",
    startYear:"",
    endYear:""
  }

  const [items, setItems] = useState(jobExperienceCount.slice(0,3))

  function handleAddNewExperienceSegment() {
    setItems(jobExperienceCount.slice(0, items.length + 1))
  }

    return (
        <div>
          <ToastContainer position="top-right" />
            <Segment color="orange">
          <Divider horizontal>Add Your Job Experiences</Divider>

          <Transition.Group
            as={List}
            duration={200}
            size='huge'
            verticalAlign='middle'>

            {items.map((item) => (
              <List.Item key={item}>
                <Formik initialValues={initialValues}
                  onSubmit={(values) => {
                    console.log(values)
                    
                    const jobExperienceService = new JobExperienceService()
                    jobExperienceService.add(values).then(response => {
                      if (response.data.success) {
                          handleAddNewExperienceSegment()
                          toast.success("Job Experience is saved")                  
                      }
                    })
                  }}>
                
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
                        <Button color="orange" circular icon="plus" type="onSubmit"  style={{marginTop:"20px"}} />
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Segment>
                </Form>
                </Formik>
              </List.Item>
            ))}


          </Transition.Group>

            <Button content='Abilities' icon='right arrow' 
                  labelPosition='right' floated="right" style={{marginTop:"30px"}} 
                  color="violet" onClick={goToAbilityComponent} />

            <Button content='Schools' icon='left arrow' 
                  labelPosition='left' floated="left" style={{marginTop:"30px"}} 
                  color="violet"  onClick={goToSchoolComponent} />

        </Segment>
        </div>
    )
}
