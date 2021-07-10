import React from 'react'
import { Segment, Divider, Grid, Button } from 'semantic-ui-react'
import HrmsRating from '../../../utilities/customFormControls/HrmsRating'
import HrmsTextInput from '../../../utilities/customFormControls/HrmsTextInput'
import { Formik, Form } from 'formik'

export default function LanguageAdd() {
    return (
        <div>
            <Segment color="orange">
        <Divider horizontal>Add Your Language</Divider>

              <Formik>
            
              <Form className= "ui form">
                <Segment color="orange" style={{marginTop:"50px"}}>
                <Grid>
                  <Grid.Row>
                    <Grid.Column width={10}>
                      <HrmsTextInput name="languageName" label="Language Name" style={{marginTop:"10px"}} />
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <Grid>
                            <Grid.Row>
                                <Grid.Column width={12}>
                                    <HrmsRating  name="languageLevel" label="Language Level" size="huge" style={{marginTop:"20px"}} />
                                </Grid.Column>
                                <Grid.Column width={4}>
                                    <Button positive circular icon="checkmark" type="onSubmit"  style={{marginTop:"20px"}} />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                        
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Segment>
              </Form>
              </Formik>
           
            <Button content='Personal' icon='right arrow' 
                  labelPosition='right' floated="right" style={{marginTop:"30px"}} 
                  color="violet" />

            <Button content='Abilities' icon='left arrow' 
                  labelPosition='left' floated="left" style={{marginTop:"30px"}} 
                  color="violet" />

        </Segment>
        </div>
    )
}
