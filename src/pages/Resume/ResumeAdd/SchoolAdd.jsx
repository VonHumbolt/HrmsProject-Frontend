import React, {useState} from 'react'
import { Segment, Grid, Button, Divider, Transition, List } from 'semantic-ui-react'
import { Formik, Form } from 'formik'
import HrmsTextInput from '../../../utilities/customFormControls/HrmsTextInput'
import SchoolService from '../../../services/schoolService'
import { toast, ToastContainer } from 'react-toastify'

export default function SchoolAdd({jobSeekerId, goToJobExperienceComponent}) {

  const schoolCount = ["1","2" ,"3" ,"4" ,"5"]
  const initialValues = {
    schoolName: "",
    schoolDepartment:"",
    startYear: "",
    graduationYear: "",
    jobSeekerId: jobSeekerId
  }

  const [items, setItems] = useState(schoolCount.slice(0,1))

  function handleAddNewSchoolSegment() {
    setItems(schoolCount.slice(0, items.length + 1))
  }

  return (
        <div>
          <ToastContainer position="top-right" />
            <Segment color="green">
              <Divider horizontal>Add Your School Informations</Divider>

            <Transition.Group
              as={List}
              duration={200}
              size='huge'
              verticalAlign='middle'>

              {items.map((item) => (
                <List.Item key={item}>
                  <Formik
                    initialValues={initialValues}
                    onSubmit={(values) => {
                      console.log(values)

                      const schoolService = new SchoolService()
                      schoolService.add(values).then(response => {
                        if(response.data.success) {
                            toast.success("School is added successfully!")
                            handleAddNewSchoolSegment()
                        }
                      })

                    }}>
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
                            <Button positive circular icon="add" type="onSubmit" style={{marginTop:"20px"}} />
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                    </Segment>
                    </Form>
                  </Formik>
                </List.Item>
              ))}


          </Transition.Group>

            <Button content='Job Experiences' icon='right arrow'
                  labelPosition='right' floated="right" style={{marginTop:"30px"}}
                  color="violet" onClick={goToJobExperienceComponent} />

        </Segment>
        </div>
    )
}
