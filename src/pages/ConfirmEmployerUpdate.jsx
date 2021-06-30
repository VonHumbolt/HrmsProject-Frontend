import React from "react";
import { useEffect, useState } from "react";
import { Card, Button, Label } from "semantic-ui-react";
import EmployerForUpdateService from "../services/employerForUpdateService";
import EmployerService from "../services/employerService";
import { toast, ToastContainer } from "react-toastify";

export default function ConfirmEmployerUpdate() {

  const employerForUpdateService = new EmployerForUpdateService();
  const employerService = new EmployerService()
  
  const [unApprovedEmployerUpdates, setUnApprovedEmployerUpdates] = useState(
    []
  );
  useEffect(() => {
    employerForUpdateService
      .getAll()
      .then((response) => setUnApprovedEmployerUpdates(response.data.data));
  }, []);

  function handleConfirmUpdates(updatedEmployerId) {

    let confirmedUpdate = findItemInUnApprovedEmployerUpdates(updatedEmployerId)
    
    employerService.update(confirmedUpdate).then(response => {
    
        if(response.data.success) {
            deleteUpdateFromStateAndDb(confirmedUpdate)
            toast.info("Employer update confirmed") 
        }
    })
  }

  function handleDeclineUpdates(updatedEmployerId) {
    let declinedUpdate = findItemInUnApprovedEmployerUpdates(updatedEmployerId)

    employerForUpdateService.delete(declinedUpdate).then(response => {

        employerService.setUpdateConfirmed(declinedUpdate.employerId, true).then(response => {

            if(response.data.success) {
                deleteUpdateFromStateAndDb(declinedUpdate)
                toast.info("Update request declined")
            }
        })
        
    })
  }

  function findItemInUnApprovedEmployerUpdates(updatedEmployerId) {
    return unApprovedEmployerUpdates.find((e) => e.updatedEmployerId === updatedEmployerId)
  }

  function deleteUpdateFromStateAndDb(employerForUpdate) {
    employerForUpdateService.delete(employerForUpdate).then(response => {
        if(response.data.success) {
            let newUnApprovedUpdates = unApprovedEmployerUpdates.filter((e) => e.updatedEmployerId !== employerForUpdate.updatedEmployerId)
            setUnApprovedEmployerUpdates(newUnApprovedUpdates)
        }
    })
  }

  return (
    <div>
        <ToastContainer position="top right"/>
      <Card.Group>
        {unApprovedEmployerUpdates.map((employerUpdate) => (
          <Card fluid key={employerUpdate.updatedEmployerId}>
            <Card.Content>
              <Label color="orange" ribbon attached="top">
                New Update Request !
              </Label>
              <Card.Header>
                {employerUpdate.newCompanyName} wants to update company
                informations?
              </Card.Header>
              <Card.Meta style={{ marginTop: "10px" }}>
                Information to be updated:
              </Card.Meta>
              <Card.Description style={{ marginTop: "20px" }}>
                <strong>Company Name: </strong> {employerUpdate.newCompanyName} <br />
                <strong>Company Website: </strong> {employerUpdate.newWebSite} <br />
                <strong>Phone Number: </strong> {employerUpdate.newPhoneNumber} <br />
                <strong>Company Email Address: </strong> {employerUpdate.newEmail} <br />
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <div className="ui two buttons">
                <Button basic color="green" onClick={() => handleConfirmUpdates(employerUpdate.updatedEmployerId)}>
                  Confirm Updates
                </Button>
                <Button basic color="red" onClick={() => handleDeclineUpdates(employerUpdate.updatedEmployerId)}>
                  Decline
                </Button>
              </div>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </div>
  );
}
