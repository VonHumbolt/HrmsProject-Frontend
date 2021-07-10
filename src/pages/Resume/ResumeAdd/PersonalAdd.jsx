import React, {useState} from 'react'
import { Segment, Grid, Divider, Button, Image } from 'semantic-ui-react';
import HrmsTextInput from '../../../utilities/customFormControls/HrmsTextInput';
import HrmsTextArea from '../../../utilities/customFormControls/HrmsTextArea';
import { Formik, Form } from 'formik';

export default function PersonalAdd() {


    const [fileInput, setFileInput] = useState()
    const [image, setImage] = useState()
    const [selectedImage, setSelectedImage] = useState("https://res.cloudinary.com/dspea8wm4/image/upload/v1624285292/default_profile_rnssv9.png")


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
            // userImageService.update(resume.userImage?.userImageId, formData).then(response => {
            //     console.log(response.data.message)
            // })
        }

    }


    return (
        <div>
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
                            <Formik>
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
                  color="violet" />

            </Segment>
        </div>
    )
}
