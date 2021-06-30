import { Formik, Form, Field } from "formik";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import EmployerService from "../services/employerService";
import EmployerForUpdateService from "../services/employerForUpdateService";
import {
  Button,
  Segment,
  Container,
  Header,
  Icon,
  Divider,
} from "semantic-ui-react";
import HrmsTextInput from "../utilities/customFormControls/HrmsTextInput";
import * as yup from "yup"
import { ToastContainer, toast } from "react-toastify";

export default function EmployerUpdate() {
  let { employerId } = useParams();

  const employerService = new EmployerService();

  let history = useHistory();

  const [employer, setEmployer] = useState({});

  useEffect(() => {
    employerService
      .getEmployerByEmployerId(employerId)
      .then((response) => setEmployer(response.data.data));
  }, []);

  function handleEmployerUpdateValidation(){
    employerService.setUpdateConfirmed(employerId, false).then(response => {
      history.push("/employers/" + employerId)
      toast.success("Update request sent to the system")
    })
  }

  const initialValue = {
    employerId: employerId,
    newCompanyName: "",
    newWebSite: "",
    newEmail:"",
    newPhoneNumber: "",
  };

  const schema = yup.object({
        newCompanyName: yup.string().required("Please enter a Company Name"),
        newWebSite: yup.string().url().required("Please enter a web site of company"),
        newEmail: yup.string().email().required("Please enter a valid email"),
        newPhoneNumber: yup.number().required("Please enter a phone number of company")
  })

  return (
    <div>
      <Segment color="violet">
        <ToastContainer position="top-right" />
        <Divider horizontal style={{marginTop:"30px" ,marginBottom:"50px"}}>Update Your Employer Informations</Divider>

        <Formik
          initialValues={initialValue}
          validationSchema= {schema}
          onSubmit={async (values) => {
            console.log(values);
            
            let employerForUpdateService = new EmployerForUpdateService()
            await employerForUpdateService.add(values).then((response) => {
                console.log(response.data.message)
                
                if(response.data.success) {
                  handleEmployerUpdateValidation();
                }
            })
          }}
        >
          <Form className="ui form">
            <Container textAlign="left">
              <Segment color="black">
                <Header as="h4" style={{ marginBottom: "20px" }}>
                  Company Name <Icon name="building" />
                </Header>

                <Container text>
                  <p style={{ fontSize: 14 }}>
                    <HrmsTextInput name="newCompanyName" placeholder={employer.companyName}/>
                  </p>
                </Container>
                <Divider style={{ marginTop: "30px", marginBottom: "30px" }} />
                <Header as="h4">
                  Web Site <Icon name="globe" />{" "}
                </Header>
                <ul>
                 
                    <HrmsTextInput name="newWebSite" placeholder={employer.webSite}/>
                 
                </ul>

                <Divider style={{ marginTop: "30px", marginBottom: "30px" }} />

                <Header as="h4">
                  Contact <Icon name="phone" />
                </Header>
                <ul>
                  <li>
                        <HrmsTextInput name="newEmail" label="Email" placeholder={employer.user?.email} />
                  </li>
                  <li style={{marginTop:"20px"}}>
                        <HrmsTextInput name="newPhoneNumber" label="Phone Number" placeholder={employer.phoneNumber} />
                  </li>
                </ul>
              </Segment>
            </Container>

            <Button type="submit" color="violet" style={{ marginTop: "20px" }}>
              Update
            </Button>
          </Form>
        </Formik>
      </Segment>
    </div>
  );
}
