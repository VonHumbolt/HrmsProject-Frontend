import axios from "axios";

export default class EmployerService{
    getAllEmployers() {
        return axios.get("http://localhost:8080/api/employers/getall")
    }
    
    getEmployerByEmployerId(employerId) {
        return axios.get("http://localhost:8080/api/employers/getEmployerByEmployerId?employerId=" + employerId)
    }

    add(employer) {
        return axios.post("http://localhost:8080/api/employers/add",employer)

    }
    
    update(employer) {
        return axios.post("http://localhost:8080/api/employers/update",employer)
    }
    
    setUpdateConfirmed(employerId, isUpdateConfirmed) {
        return axios.get("http://localhost:8080/api/employers/setUpdateConfirmed?employerId="+employerId+"&isUpdateConfirmed="+isUpdateConfirmed)
    }
}