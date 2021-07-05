import { Formik,Form } from 'formik'
import React, {useState} from 'react'
import { Segment, Grid, Image, Divider, Button } from 'semantic-ui-react'
import HrmsTextInput from "../../utilities/customFormControls/HrmsTextInput"
import HrmsTextArea from "../../utilities/customFormControls/HrmsTextArea"
import * as yup from "yup"
import ResumeService from '../../services/resumeService'
import UserImageService from '../../services/userImageService'
import { toast, ToastContainer } from 'react-toastify'
import { useHistory } from 'react-router'

export default function PersonalUpdate({goToLanguagesComponent, resume}) {

    const history = useHistory()

    const initialValues = {
        resumeId: resume.resumeId,
        firstName: resume.jobSeeker?.firstName,
        lastName: resume.jobSeeker?.lastName,
        githubAddress: resume.githubAddress,
        linkedinAdress: resume.linkedinAdress,
        coverLetter: resume.coverLetter
    }
    const schema = yup.object({
        firstName: yup.string(),
        lastName: yup.string(),
        githubAddress: yup.string().url("Please enter a valid url for gitHub address "),
        linkedinAdress: yup.string().url("Please enter a valid url for linkedIn address"),
        coverLetter: yup.string()
    })

    const [fileInput, setFileInput] = useState()
    const [image, setImage] = useState()
    const [selectedImage, setSelectedImage] = useState(resume.userImage?.imageUrl)


    function handleSelectImage(selectedImage) {
        
        const reader = new FileReader(); 
        reader.onload = () => {
            if (reader.readyState === 2) {
                setSelectedImage(reader.result)
            }
        }
        reader.readAsDataURL(selectedImage)

        setImage(selectedImage)
    }

    function handleImageUpload() {
        if(image !== undefined){
            let formData = new FormData();
            formData.append("multipartFile", image)
          
            const userImageService = new UserImageService();
            userImageService.update(resume.userImage?.userImageId, formData).then(response => {
                console.log(response.data.message)
            })
        }

    }


    return (
        <div>
            <ToastContainer position="top-right" />
            <Segment color="teal">
                <Divider horizontal style={{marginTop:"20px", marginBottom:"30px"}}>Update Your Personal Informations</Divider>
                <Grid style={{marginTop:"30px"}}>
                    <Grid.Row>
                        <Grid.Column width={4}>
                            
                            <Image type="file" src={selectedImage} size="medium" rounded onClick={() => fileInput.click()} />
                            <input
                                style={{display:"none"}} 
                                type="file"
                                onChange={(e) => handleSelectImage(e.target.files[0])}
                                ref={fileInput => setFileInput(fileInput)}
                            />
                        </Grid.Column>
                        <Grid.Column width={12}>
                            <Segment color="teal">
                            <Formik
                                initialValues = {initialValues}
                                validationSchema= {schema}
                                onSubmit= {values => {

                                    const resumeService = new ResumeService();
                                    resumeService.update(values).then(response => {
                                        if (response.data.success) {
                                            toast.success("Personal informations are saved");
                                            history.push("/resumes/"+resume.jobSeeker?.jobSeekerId)
                                        }
                                    })
                                }}
                            >
                                <Form className="ui form">
                                    <HrmsTextInput name="firstName" label="First Name" />
                                    <HrmsTextInput name="lastName" label="Last Name" />
                                    <HrmsTextInput name="githubAddress" label="Github" />
                                    <HrmsTextInput name="linkedinAdress" label="LinkedIn" />
                                    <HrmsTextArea name="coverLetter" label="About Me" />
                                        
                                    <Button type="onSubmit" content="Update" positive circular floated="right"
                                         style={{marginTop:"20px"}}
                                         onClick={() => handleImageUpload()} />
                                </Form>
                            </Formik>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

                    
                <Button content='Languages' icon='left arrow' 
                  labelPosition='left' floated="left" style={{marginTop:"30px"}} 
                  color="violet" onClick={goToLanguagesComponent} />

            </Segment>
        </div>
    )
}
