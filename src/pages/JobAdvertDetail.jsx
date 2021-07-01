import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JobAdvertService from "../services/jobAdvertService";
import { Divider, Header, Icon, Table, Button, Segment} from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { saveJobAdvertToFavorite, deleteJobAdvertToFavorite } from "../store/reducers/favoriteJobReducer";


export default function JobAdvertDetail() {
  let { advertId } = useParams();

  const dispatch = useDispatch();

  const [isFavorite, setIsFavorite] = useState(false)

  const [jobAdvert, setJobAdvert] = useState([]);
  useEffect(() => {
    let jobAdvertService = new JobAdvertService();
    jobAdvertService
      .getJobAdvertByAdvertId(advertId)
      .then((response) => setJobAdvert(response.data.data));
  }, []);

  function handleFavoriteIcon() {
    if(isFavorite) {
      dispatch(deleteJobAdvertToFavorite(jobAdvert))

    }else {
      dispatch(saveJobAdvertToFavorite(jobAdvert))
    }

    setIsFavorite(!isFavorite)
  }

  return (
    <div>
      <Segment>
        <Icon style={{marginLeft:"750px"}} name="favorite" size="big" onClick={() => handleFavoriteIcon()} color={isFavorite ? "yellow" : "black"} />
        
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
            <Table.Row key="1">
              <Table.Cell width={2}>Employer</Table.Cell>
              <Table.Cell>{jobAdvert.employer?.companyName}</Table.Cell>
            </Table.Row>
            <Table.Row key="2">
              <Table.Cell>Job Position</Table.Cell>
              <Table.Cell>{jobAdvert.jobPosition?.jobPositionName}</Table.Cell>
            </Table.Row>
            <Table.Row key="3">
              <Table.Cell>City</Table.Cell>
              <Table.Cell>{jobAdvert.city?.cityName}</Table.Cell>
            </Table.Row>
            <Table.Row key="4">
              <Table.Cell>Quota</Table.Cell>
              <Table.Cell>{jobAdvert.countOfJob}</Table.Cell>
            </Table.Row>
            <Table.Row key="5">
              <Table.Cell>Job Type</Table.Cell>
              <Table.Cell>{jobAdvert.jobType?.jobTypeName}</Table.Cell>
            </Table.Row>
            <Table.Row key="6">
              <Table.Cell>Work Place</Table.Cell>
              <Table.Cell>{jobAdvert.workPlace?.workPlaceName}</Table.Cell>
            </Table.Row>
            <Table.Row key="7">
              <Table.Cell>Salary</Table.Cell>
              <Table.Cell>{jobAdvert.minSalary}₺ - {jobAdvert.maxSalary}₺</Table.Cell>
            </Table.Row>
            <Table.Row key="8">
              <Table.Cell>Published Date</Table.Cell>
              <Table.Cell>{jobAdvert.publishedDate}</Table.Cell>
            </Table.Row>
            <Table.Row key="9">
              <Table.Cell>Deadline</Table.Cell>
              <Table.Cell>{jobAdvert.deadline}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        <Button color="violet">Başvur</Button>
      </Segment>
    </div>
  );
}
