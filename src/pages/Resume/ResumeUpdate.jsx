import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ResumeService from "../../services/resumeService";
import {
  Step
} from "semantic-ui-react";
import SchoolUpdate from "./SchoolUpdate";
import JobExperiencesUpdate from "./JobExperiencesUpdate";
import AbilitiesUpdate from "./AbilitiesUpdate";
import LanguageUpdate from "./LanguageUpdate";
import PersonalUpdate from "./PersonalUpdate";

export default function ResumeUpdate() {

    let {resumeId} = useParams()

    const [resume, setResume] = useState({})
    useEffect(() => {
        let resumeService = new ResumeService()
        resumeService.getResumeByResumeId(resumeId).then(
            response => setResume(response.data.data)
        )
    }, [])

    console.log(resume)
    const [activeItem, setActiveItem] = useState("Schools")

    function goToJobExperienceComponent() {
      setActiveItem("Job Experiences")
    }

    function goToSchoolComponent(){
      setActiveItem("Schools")
    }

    function goToAbilitiesComponent() {
      setActiveItem("Abilities")
    }

    function goToLanguagesComponent() {
      setActiveItem("Languages")
    }
    
    function goToPersonalComponent() {
      setActiveItem("Personal")
    }

      return (
        <div>
          <Step.Group size="tiny">
            <Step
              icon="graduation"
              completed={activeItem !== "Schools"}
              active={activeItem === 'Schools'}
              onClick={() => setActiveItem("Schools")}
              title="Schools" />

            <Step
              icon="briefcase"
              active={activeItem === 'Job Experiences'}
              onClick={() => setActiveItem("Job Experiences")}
              title="Job Experiences"
              description="Enter your Job Experiences"/>

            <Step
              icon="code"
              active={activeItem === 'Abilities'}
              onClick={() => setActiveItem("Abilities")}
              title="Abilities"
              description="Your Abilities"/>

            <Step
              icon="language"
              active={activeItem === 'Languages'}
              onClick={() => setActiveItem("Languages")}
              title="Languages"
              description = "Your Languages"/>

            <Step
              icon="user"
              active={activeItem === 'Personal'}
              onClick={() => setActiveItem("Personal")}
              title="Personal"
              description="Personal Informations" />

          </Step.Group>

            {activeItem === "Schools" ? (<SchoolUpdate goToJobExperienceComponent={goToJobExperienceComponent} schools={resume.schools} />) : null}
            {activeItem === "Job Experiences" ? (<JobExperiencesUpdate goToAbilitiesComponent={goToAbilitiesComponent} goToSchoolComponent={goToSchoolComponent} jobExperiences={resume.jobExperiences} />) : null}
            {activeItem === "Abilities" ? (<AbilitiesUpdate goToLanguagesComponent={goToLanguagesComponent} goToJobExperienceComponent={goToJobExperienceComponent} abilities={resume.abilities} />) : null}
            {activeItem === "Languages" ? (<LanguageUpdate goToPersonalComponent={goToPersonalComponent} goToAbilitiesComponent={goToAbilitiesComponent} languages={resume.languages} />) : null}
            {activeItem === "Personal" ? (<PersonalUpdate goToLanguagesComponent={goToLanguagesComponent} resume={resume} />) : null}

        </div>
    );
}


