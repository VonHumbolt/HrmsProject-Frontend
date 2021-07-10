import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Step } from 'semantic-ui-react'
import AbilityAdd from './AbilityAdd'
import JobExperienceAdd from './JobExperienceAdd'
import LanguageAdd from './LanguageAdd'
import PersonalAdd from './PersonalAdd'
import SchoolAdd from './SchoolAdd'
import ResumeService from '../../../services/resumeService'

export default function ResumeAdd() {
  let {jobSeekerId} = useParams()

  const [activeItem, setActiveItem] = useState("Schools")
  const [jobSeekerResume, setJobSeekerResume] = useState({})
  
  useEffect(() => { 
    const resumeService = new ResumeService();

    resumeService.getResumeByJobSeekerId(jobSeekerId).then(response => setJobSeekerResume(response.data.data))

  })

  return (
        <div>
    {console.log(jobSeekerResume)}

          <Step.Group size="tiny" >
              <Step
                icon="graduation"
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

          {activeItem === "Schools" ? (<SchoolAdd />) : null}
          {activeItem === "Job Experiences" ? (<JobExperienceAdd />) : null}
          {activeItem === "Abilities" ? (<AbilityAdd />) : null}
          {activeItem === "Languages" ? (<LanguageAdd />) : null}
          {activeItem === "Personal" ? (<PersonalAdd />) : null}

        </div>
  )
}
