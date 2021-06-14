import axios from "axios"

export default class JobAdvertService{
    getJobAdvertDto() {
        return axios.get("http://localhost:8080/api/jobAdverts/getJobAdvertDetails")
    }

    getJobAdvertByJobAdvertId(advertId) {
        return axios.get("http://localhost:8080/api/jobAdverts/getJobAdvertDtoByAdvertId?advertId="+advertId)
    }

    getJobAdvertByEmployerId(employerId) {
        return axios.get("http://localhost:8080/api/jobAdverts/getJobAdvertByEmployerId?employerId=" + employerId)
    }

    closeJobAdvert(jobAdvert) {
        return axios.post("http://localhost:8080/api/jobAdverts/closeJobAdvert",jobAdvert)
    }

    sortedJobAdvertByDeadline() {
        return axios.get("http://localhost:8080/api/jobAdverts/sortedByDeadline")
    }

    add(jobAdvert) {
        return axios.post("http://localhost:8080/api/jobAdverts/add", jobAdvert)
    }
}