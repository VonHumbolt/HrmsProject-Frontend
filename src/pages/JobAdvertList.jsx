import React, {useEffect, useState} from "react";
import { Divider, Header, Table } from "semantic-ui-react";
import JobAdvertService from "../services/jobAdvertService";

export default function JobAdvertList() {

    const [jobAdverts, setjobAdverts] = useState([])

    useEffect(() => {
        let jobAdvertService = new JobAdvertService()
        jobAdvertService.getJobAdvertDto().then(response => setjobAdverts(response.data.data))
    })

  return (
    <div>
      <Header as="h2" textAlign="left">Job Adverts</Header>
      <Divider />
      <Table celled padded>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell singleLine>Company Name</Table.HeaderCell>
            <Table.HeaderCell singleLine>Job Position Name</Table.HeaderCell>
            <Table.HeaderCell singleLine>Count Of Job Position</Table.HeaderCell>
            <Table.HeaderCell singleLine>City</Table.HeaderCell>
            <Table.HeaderCell singleLine>Published At</Table.HeaderCell>
            <Table.HeaderCell singleLine>Deadline</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
            {jobAdverts.map((jobAdvert) => (
                <Table.Row key={jobAdvert.id}>
                    <Table.Cell>
                    <Header as="h5">
                        {jobAdvert.companyName}
                    </Header>
                    </Table.Cell>
                    <Table.Cell singleLine>{jobAdvert.jobPositionName}</Table.Cell>
                    <Table.Cell textAlign="center">{jobAdvert.countOfJob}</Table.Cell>
                    <Table.Cell textAlign="center">{jobAdvert.cityName}</Table.Cell>
                    <Table.Cell>{jobAdvert.publishedDate}</Table.Cell>
                    <Table.Cell>{jobAdvert.deadline}</Table.Cell>
                </Table.Row>
            ))}
          
        </Table.Body>
      </Table>
    </div>
  );
}
