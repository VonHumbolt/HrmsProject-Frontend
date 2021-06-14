import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JobAdvertService from "../services/jobAdvertService";
import { Divider, Header, Icon, Table, Button } from "semantic-ui-react";

export default function JobAdvertDetail() {
  let { id } = useParams();

  const [jobAdvert, setJobAdvert] = useState([]);
  useEffect(() => {
    let jobAdvertService = new JobAdvertService();
    jobAdvertService
      .getJobAdvertByJobAdvertId(id)
      .then((response) => setJobAdvert(response.data.data));
  }, []);

  return (
    <div>
      <Divider horizontal>
        <Header as="h4">
          <Icon name="tag" />
          Description
        </Header>
      </Divider>
      <br/>

      <p>
       {jobAdvert.jobDescription}
      </p>
        <br/>
      <Divider horizontal>
        <Header as="h4">
          <Icon name="bar chart" />
          Features
        </Header>
      </Divider>

      <Table definition>
        <Table.Body>
          <Table.Row>
            <Table.Cell width={2}>Employer</Table.Cell>
            <Table.Cell>{jobAdvert.companyName}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Job Position</Table.Cell>
            <Table.Cell>{jobAdvert.jobPositionName}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>City</Table.Cell>
            <Table.Cell>{jobAdvert.cityName}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Quota</Table.Cell>
            <Table.Cell>{jobAdvert.countOfJob}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Salary</Table.Cell>
            <Table.Cell>{jobAdvert.minSalary}₺ - {jobAdvert.maxSalary}₺</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Published Date</Table.Cell>
            <Table.Cell>{jobAdvert.publishedDate}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Deadline</Table.Cell>
            <Table.Cell>{jobAdvert.deadline}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <Button secondary>Başvur</Button>
    </div>
  );
}
