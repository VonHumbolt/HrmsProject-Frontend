import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JobAdvertService from "../services/jobAdvertService";
import { Divider, Header, Icon, Table, Button, Segment} from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { saveJobAdvertToFavorite, deleteJobAdvertToFavorite } from "../store/reducers/favoriteJobReducer";
import { toast, ToastContainer } from "react-toastify";

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
      toast.success("Job Advert is added into favorites")
      dispatch(saveJobAdvertToFavorite(jobAdvert))
    }

    setIsFavorite(!isFavorite)
  }

  return (
    <div>
      <ToastContainer position="top-right" />
      <Segment color="black">
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
            <Table.Row>
              <Table.Cell width={2}>Employer</Table.Cell>
              <Table.Cell>{jobAdvert.employer?.companyName}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Job Position</Table.Cell>
              <Table.Cell>{jobAdvert.jobPosition?.jobPositionName}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>City</Table.Cell>
              <Table.Cell>{jobAdvert.city?.cityName}</Table.Cell>
            </Table.Row>
            <Table.Row >
              <Table.Cell>Quota</Table.Cell>
              <Table.Cell>{jobAdvert.countOfJob}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Job Type</Table.Cell>
              <Table.Cell>{jobAdvert.jobType?.jobTypeName}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Work Place</Table.Cell>
              <Table.Cell>{jobAdvert.workPlace?.workPlaceName}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Salary</Table.Cell>
              <Table.Cell>{jobAdvert.minSalary}₺ - {jobAdvert.maxSalary}₺</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Published Date</Table.Cell>
              <Table.Cell>{new Date(jobAdvert.publishedDate).toLocaleDateString()}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Deadline</Table.Cell>
              <Table.Cell>{new Date(jobAdvert.deadline).toLocaleDateString()}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        <Button color="violet">Apply For The Job</Button>
      </Segment>
    </div>
  );
}
