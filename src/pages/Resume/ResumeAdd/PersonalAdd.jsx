import React, {useState} from 'react'
import { Segment, Grid, Divider, Button, Image } from 'semantic-ui-react';
import HrmsTextInput from '../../../utilities/customFormControls/HrmsTextInput';
import HrmsTextArea from '../../../utilities/customFormControls/HrmsTextArea';
import { Formik, Form } from 'formik';
import ResumeService from '../../../services/resumeService';
import UserImageService from '../../../services/userImageService';
import { toast, ToastContainer } from 'react-toastify';

export default function PersonalAdd({jobSeekerId, goToLanguageComponent}) {


    const [fileInput, setFileInput] = useState()
    const [image, setImage] = useState()
    const [selectedImage, setSelectedImage] = useState("https://res.cloudinary.com/dspea8wm4/image/upload/v1624285292/default_profile_rnssv9.png")

    const initialValues = {
        firstName: "",
        lastName:"", 
        githubAddress:"",
        linkedinAdress: "",
        coverLetter: ""
    }

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
          
            // const userImageService = new UserImageService();
            // userImageService.add(jobSeekerId, resumeId, formData).then(response => {
            //     console.log(response.data.message)
            // })
        }

    }


    return (
        <div>
            <ToastContainer position="top-right" />
            <Segment color="teal">
                <Divider horizontal style={{marginTop:"20px", marginBottom:"30px"}}>Add Your Personal Informations</Divider>
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
                                initialValues={initialValues} 
                                onSubmit={(values) => {
                                    console.log(values)

                                    const resumeService = new ResumeService()
                                    resumeService.update(values).then(response => {
                                        if(response.data.success) {
                                            toast.success("Personal Informations is saved");
                                        }
                                    })
                                }}>
                                <Form className="ui form">
                                    <HrmsTextInput name="firstName" label="First Name" />
                                    <HrmsTextInput name="lastName" label="Last Name" />
                                    <HrmsTextInput icon="github" name="githubAddress" label="Github Address" />
                                    <HrmsTextInput icon="linkedin" name="linkedinAdress" label="LinkedIn Address" />
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
                  color="violet" onClick={goToLanguageComponent} />

            </Segment>
        </div>
    )
}
