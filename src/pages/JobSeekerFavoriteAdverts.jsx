import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Segment, Card, Feed, Divider, Icon, Modal, Header, Button } from "semantic-ui-react";
import { deleteJobAdvertToFavorite } from "../store/reducers/favoriteJobReducer";

export default function JobSeekerFavoriteAdverts() {
  let favoriteAdverts = useSelector((state) => state.favoritesJob);

  const [isOpen, setIsOpen] = useState(false)
  const [selectedJobAdvert, setSelectedJobAdvert] = useState()
  
  const history = useHistory()
  const dispatch = useDispatch();

  function handleModalActivation(jobAdvert) {
    setIsOpen(true)
    setSelectedJobAdvert(jobAdvert)
  }
  
  function handleGoToJobAdvertDetail() {
      history.push("/jobAdverts/"+selectedJobAdvert.advertId)
  }

  function handleRemoveAdvertFromFavorite() {
      dispatch(deleteJobAdvertToFavorite(selectedJobAdvert))
      setIsOpen(false)
      toast.success("Job advert is successfully removed from Favorites")
  }

  return (
    <div>
      <ToastContainer position="top-right"/>
      <Segment color="purple">
        <Divider horizontal style={{marginTop:"20px", marginBottom:"50px"}}>Your Favorite Job Adverts</Divider>

        <Modal 
          basic 
          onClose={() => setIsOpen(false)}
          onOpen= {() => setIsOpen(true)}
          open={isOpen}>
              <Header icon>
                <Icon name='archive' />
                Favorite Job Advert
              </Header>
              <Header style={{textAlign:"center", border:"2px solid"}}>
                  {selectedJobAdvert?.jobDescription} <br />
                  {"Deadline: " + new Date(selectedJobAdvert?.deadline).toLocaleDateString()}
              </Header>
              <Modal.Content>
                <p style={{textAlign:"center", fontSize:"20px"}}>
                  You can go to job advert detail or remove job advert from favorites.
                </p>
              </Modal.Content>
              <Modal.Actions>
                <Button basic color='red' inverted onClick={() => handleRemoveAdvertFromFavorite()}>
                  <Icon name='remove' /> Remove From Favorites
                </Button>
                <Button color='green' inverted onClick={() => handleGoToJobAdvertDetail()}>
                    <Icon name='sign-in' /> Job Advert Detail
                </Button>
              </Modal.Actions>
        </Modal>

        
        {favoriteAdverts.favoriteJobs?.map((favoriteAdvert) => (
          
            <Card fluid  color="blue" key={favoriteAdvert.advertId} onClick={() => handleModalActivation(favoriteAdvert)}>
              <Card.Content>
                <Card.Header>{favoriteAdvert.jobDescription}</Card.Header>
                 
              </Card.Content>
              <Card.Content>
                <Feed>
                  <Feed.Event>
                    <Feed.Content>
                      <Feed.Summary>
                        {"Deadline: " + new Date(favoriteAdvert.deadline).toLocaleDateString()}
                      </Feed.Summary>
                    </Feed.Content>
                  </Feed.Event>
                </Feed>
                </Card.Content>
              </Card>

        ))}
        
      </Segment>
    </div>
  );
}
