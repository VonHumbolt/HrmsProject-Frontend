import axios from "axios"

export default class JobAdvertService{
    getJobAdvertDto() {
        return axios.get("http://localhost:8080/api/jobAdverts/getJobAdvertDetails")
    }

    getJobAdvertByEmployerId(employerId) {
        return axios.get("http://localhost:8080/api/jobAdverts/getJobAdvertByEmployerId/?" + employerId)
    }

    closeJobAdvert(jobAdvert) {
        return axios.post("http://localhost:8080/api/jobAdverts/closeJobAdvert",jobAdvert)
    }

    sortedJobAdvertByDeadline() {
        return axios.get("http://localhost:8080/api/jobAdverts/sortedByDeadline")
    }
}