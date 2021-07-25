import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Divider, Header, Icon, Table, Segment } from "semantic-ui-react";
import EmployerService from "../services/employerService";

export default function EmployerList() {
  const [employers, setEmployers] = useState([]);

  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    let employerService = new EmployerService();
    employerService
      .getAllEmployers()
      .then((response) => setEmployers(response.data.data));
  }, []);

  return (
    <div>
      <Segment color="violet">
        <Header as="h2" textAlign="left">   
          Employers
        </Header>
        <Divider />
        <Table compact celled color="black">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Company Name</Table.HeaderCell>
              <Table.HeaderCell>
                Web Site <Icon name="world" />
              </Table.HeaderCell>
              <Table.HeaderCell>
                Email <Icon name="envelope" />
              </Table.HeaderCell>
              <Table.HeaderCell>
                Phone Number <Icon name="phone" />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {employers.map((employer) => (
              <Table.Row key={employer.userId}>
                <Table.Cell style={{marginLeft:"10px"}} as={NavLink} to={`employers/${employer.userId}`}>{employer.companyName}</Table.Cell>
                <Table.Cell>{employer.webSite}</Table.Cell>
                <Table.Cell>{employer.email}</Table.Cell>
                <Table.Cell>{employer.phoneNumber}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Segment>
    </div>
  );
}
