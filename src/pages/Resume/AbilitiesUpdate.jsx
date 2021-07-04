import React from 'react'
import {Segment, Divider, Grid, Container, Button} from "semantic-ui-react"
import HrmsTextInput from '../../utilities/customFormControls/HrmsTextInput'
import { Formik, Form } from 'formik'
import AbilityService from '../../services/abilityService'
import { toast, ToastContainer } from 'react-toastify'

export default function AbilitiesUpdate({goToLanguagesComponent, goToJobExperienceComponent, abilities}) {
    
    const abilityService = new AbilityService();

    const initialValues={
        abilityId:"",
        technology:""
    }

    return (
        <div>
            <ToastContainer />
            <Segment>
                <Divider horizontal>Update Your Abilities</Divider>
            
                <Container>

                {abilities.map((ability) => (
                    <Formik
                        initialValues={initialValues}
                        onSubmit={ values => {
                            values.abilityId = ability.abilityId

                            console.log(values)
                            abilityService.update(values).then(response => {
                                if(response.data.success) {
                                    toast.success("Changes are saved")
                                }
                            })

                        }}
                        key={ability.abilityId}>

                        <Form className="ui form">
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column width={14}>
                                        <HrmsTextInput name="technology" placeholder={ability.technology} />
                                    </Grid.Column>
                                    <Grid.Column width={2}>
                                        <Button circular icon="checkmark" positive style={{marginTop:"20px"}} type="onSubmit"/>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                            
                        </Form>
                    </Formik>
                ))}
                
                <Button content='Languages' icon='right arrow' 
                  labelPosition='right' floated="right" style={{marginTop:"20px"}} 
                  color="violet" onClick={goToLanguagesComponent} />

                <Button content='Job Experiences' icon='left arrow' 
                  labelPosition='left' floated="left" style={{marginTop:"20px"}} 
                  color="violet" onClick={goToJobExperienceComponent} />

                </Container>
               
            </Segment>
        </div>
    )
}
