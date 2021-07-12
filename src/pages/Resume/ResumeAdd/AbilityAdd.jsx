import React from 'react'
import { Segment, Divider, Container, Grid, Button, Transition, List } from 'semantic-ui-react'
import { Formik, Form } from 'formik'
import HrmsTextInput from '../../../utilities/customFormControls/HrmsTextInput'
import { useState } from 'react'
import AbilityService from "../../../services/abilityService";
import { toast, ToastContainer } from 'react-toastify'

export default function AbilityAdd({goToJobExperienceComponent, goToLanguageComponent}) {
    
    const abilityCount = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"] 

    const initialValues = {
        technology:""
    }

    const [items, setItems] = useState(abilityCount.slice(0,3))

    function handleAddNewAbilitySegment() {
        setItems(abilityCount.slice(0, items.length + 1))
    }

    return (
        <div>
            <ToastContainer position="top-right" />
            <Segment>
                <Divider horizontal>Add Your Abilities</Divider>
            
                <Container>

                <Transition.Group
                    as={List}
                    duration={500}
                    size="huge"
                    verticalAlign="middle">

                    {items.map(item => (
                        <List.Item key={item}>
                            <Formik 
                                initialValues={initialValues}
                                onSubmit={(values) => {

                                    const abilityService = new AbilityService();
                                    abilityService.add(values).then(response => {
                                        if(response.data.success) {
                                            toast.success("Ability is saved")
                                            handleAddNewAbilitySegment()
                                        }
                                    })
                                }}>
                                
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
                        
                        </List.Item>
                    ))}

                </Transition.Group>


                    
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
