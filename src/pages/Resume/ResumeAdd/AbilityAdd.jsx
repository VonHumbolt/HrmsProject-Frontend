import React from 'react'
import { Segment, Divider, Container, Grid, Button } from 'semantic-ui-react'
import { Formik, Form } from 'formik'
import HrmsTextInput from '../../../utilities/customFormControls/HrmsTextInput'

export default function AbilityAdd({goToJobExperienceComponent, goToLanguageComponent}) {
    return (
        <div>
            <Segment>
                <Divider horizontal>Add Your Abilities</Divider>
            
                <Container>

                    <Formik>
                        
                        <Form className="ui form">
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column width={14}>
                                        <HrmsTextInput name="technology" placeholder ="Enter your ability" />
                                    </Grid.Column>
                                    <Grid.Column width={2}>
                                        <Button circular icon="checkmark" positive style={{marginTop:"20px"}} type="onSubmit" />
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                            
                        </Form>
                    </Formik>
                
                <Button content='Languages' icon='right arrow' 
                  labelPosition='right' floated="right" style={{marginTop:"30px"}} 
                  color="violet" onClick={goToLanguageComponent} />

                <Button content='Job Experiences' icon='left arrow' 
                  labelPosition='left' floated="left" style={{marginTop:"30px"}} 
                  color="violet" onClick={goToJobExperienceComponent} />

                </Container>
               
            </Segment>

        </div>
    )
}
