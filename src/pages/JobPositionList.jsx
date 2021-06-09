import React, {useEffect, useState} from 'react'
import { Card, Divider, Header } from 'semantic-ui-react'
import JobPositionService from '../services/jobPositionService'

export default function JobPositionList() {
    
    const [jobPositions, setJobPositions] = useState([])
    useEffect(() => {
        let jobPositionService = new JobPositionService();
        jobPositionService.getAllJobPositions().then(response => setJobPositions(response.data.data))
    })
    return (
        <div>
            <Header as="h2" textAlign="left">Job Positions</Header>
            <Divider />
            <Card.Group>
                {jobPositions.map((jobPosition) => (
                    <Card fluid color='green' header={jobPosition.jobPositionName} />
                ))}
                
            </Card.Group>
        </div>
    )
}
