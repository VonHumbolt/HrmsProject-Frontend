import React, {useState} from "react";
import {
  Segment,
  Divider,
  Grid,
  Button,
  Transition,
  List,
} from "semantic-ui-react";
import HrmsRating from "../../../utilities/customFormControls/HrmsRating";
import HrmsTextInput from "../../../utilities/customFormControls/HrmsTextInput";
import { Formik, Form } from "formik";
import LanguageService from "../../../services/languageService"
import { ToastContainer, toast } from "react-toastify";

export default function LanguageAdd({
  goToAbilityComponent,
  goToPersonalComponent,
}) {
  const languageSegmentCount = ["1", "2", "3", "4", "5", "6"];

  const [items, setItems] = useState(languageSegmentCount.slice(0, 3));
  const initialValues = {
    languageName: "",
    languageLevel: "",
  };

  function handleAddNewLanguageSegment() {
    setItems(languageSegmentCount.slice(0, items.length + 1));
  }

  return (
    <div>
      <ToastContainer position="top-right"/>
      <Segment color="orange">
        <Divider horizontal>Add Your Language</Divider>

        <Transition.Group
          as={List}
          duration={500}
          size="huge"
          verticalAlign="middle"
        >
          {items.map((item) => (
            <Formik
              initialValues={initialValues}
              onSubmit={(values) => {
                console.log(values);
                
                const languageService = new LanguageService();
                languageService.add(values).then(response => {
                  if(response.data.success) {
                    toast.success("Language is saved successfully")

                    handleAddNewLanguageSegment();
                  }
                })
              }}
              key={item}
            >
              <Form className="ui form">
                <Segment color="orange" style={{ marginTop: "50px" }}>
                  <Grid>
                    <Grid.Row>
                      <Grid.Column width={10}>
                        <HrmsTextInput
                          name="languageName"
                          label="Language Name"
                          style={{ marginTop: "10px" }}
                        />
                      </Grid.Column>
                      <Grid.Column width={6}>
                        <Grid>
                          <Grid.Row>
                            <Grid.Column width={12}>
                              <HrmsRating
                                name="languageLevel"
                                label="Language Level"
                                size="huge"
                                style={{ marginTop: "20px" }}
                              />
                            </Grid.Column>
                            <Grid.Column width={4}>
                              <Button
                                positive
                                circular
                                icon="checkmark"
                                type="onSubmit"
                                style={{ marginTop: "20px" }}
                              />
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
        </Transition.Group>

        <Button
          content="Personal"
          icon="right arrow"
          labelPosition="right"
          floated="right"
          style={{ marginTop: "30px" }}
          color="violet"
          onClick={goToPersonalComponent}
        />

        <Button
          content="Abilities"
          icon="left arrow"
          labelPosition="left"
          floated="left"
          style={{ marginTop: "30px" }}
          color="violet"
          onClick={goToAbilityComponent}
        />
      </Segment>
    </div>
  );
}
