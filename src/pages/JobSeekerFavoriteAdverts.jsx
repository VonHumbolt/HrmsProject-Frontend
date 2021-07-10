import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Segment, Card, Feed, Divider } from "semantic-ui-react";

export default function JobSeekerFavoriteAdverts() {
  let favoriteAdverts = useSelector((state) => state.favoritesJob);

  return (
    <div>
      {console.log(favoriteAdverts)}
      <Segment color="purple">
        <Divider horizontal style={{marginTop:"20px", marginBottom:"50px"}}>Your Favorite Job Adverts</Divider>

        {favoriteAdverts.favoriteJobs?.map((favoriteAdvert) => (
            <Card fluid as={NavLink} to={`/jobAdverts/${favoriteAdvert.advertId}`} color="blue">
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
