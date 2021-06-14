import React, { useState, useEffect } from "react";
import {
  Divider,
  Header,
  Icon,
  Table,
} from "semantic-ui-react";
import EmployerService from "../services/employerService";

export default function EmployerList() {
  const [employers, setEmployers] = useState([]);

  useEffect(() => {
    let employerService = new EmployerService();
    employerService
      .getAllEmployers()
      .then((response) => setEmployers(response.data.data));
  }, []);

  return (
    <div>
      <Header as="h2" textAlign="left"> Employers </Header>
      <Divider/>
      <Table compact celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Company Name</Table.HeaderCell>
            <Table.HeaderCell>Web Site <Icon name="world"/> </Table.HeaderCell>
            <Table.HeaderCell>Email <Icon name="envelope"/> </Table.HeaderCell>
            <Table.HeaderCell>Phone Number <Icon name="phone"/></Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
            {employers.map((employer) => (
                <Table.Row key={employer.employerId}>
                    <Table.Cell>{employer.companyName}</Table.Cell>
                    <Table.Cell>{employer.webSite}</Table.Cell>
                    <Table.Cell>{employer.email}</Table.Cell>
                    <Table.Cell>{employer.phoneNumber}</Table.Cell>
                </Table.Row>
            ))}
        </Table.Body>
      </Table>
    </div>
  );
}
