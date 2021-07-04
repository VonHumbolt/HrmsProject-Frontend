import React from 'react'
import {
    Button,
    Segment,
    Divider,
    Grid,
    Rating
  } from "semantic-ui-react";
import { Formik, Form } from 'formik';
import HrmsTextInput from '../../utilities/customFormControls/HrmsTextInput';
import { toast, ToastContainer } from 'react-toastify';
import HrmsRating from '../../utilities/customFormControls/HrmsRating';


export default function LanguageUpdate({goToPersonalComponent, goToAbilitiesComponent, languages}) {

    const initialValues = {}

    return (
        <div>
            <ToastContainer position="top-right" />
      <Segment color="orange">
        <Divider horizontal>Update Your Job Experience Informations</Divider>

            {languages?.map((language) => (
              <Formik
              initialValues={initialValues}
              onSubmit={(values) => {
                values.languageId = language.languageId
               console.log(values)
              }}
              key={language.languageId}
            >
              <Form className= "ui form">
                <Segment color="orange" style={{marginTop:"50px"}} key={language.languageId}>
                <Grid>
                  <Grid.Row>
                    <Grid.Column width={10}>
                      <HrmsTextInput name="languageName" label="Language Name" placeholder={language.languageName} style={{marginTop:"10px"}} />
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <Grid>
                            <Grid.Row>
                                <Grid.Column width={12}>
                                    <HrmsRating  name="languageLevel" label="Language Level" size="huge"/>
                                    {/* <label> <b> Language Level</b></label>
                                    <Rating name="languageLevel" value={language.languageLevel} maxRating={5} size="huge" style={{marginTop:"20px"}}/> */}
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
  
            ))}
           
            <Button content='Personal' icon='right arrow' 
                  labelPosition='right' floated="right" style={{marginTop:"20px"}} 
                  color="violet" onClick={goToPersonalComponent} />

            <Button content='Abilities' icon='left arrow' 
                  labelPosition='left' floated="left" style={{marginTop:"20px"}} 
                  color="violet" onClick={goToAbilitiesComponent} />

        </Segment>
        </div>
    )
}
