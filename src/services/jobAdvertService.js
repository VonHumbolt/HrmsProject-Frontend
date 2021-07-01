import axios from "axios"

export default class JobAdvertService{

    getAllJobAdvertByPage(pageNo, pageSize=10) {
        return axios.get("http://localhost:8080/api/jobAdverts/getAllByPage?pageNo=" + pageNo + "&pageSize=" + pageSize)
    }

    getJobAdvertByAdvertId(advertId) {
        return axios.get("http://localhost:8080/api/jobAdverts/getByAdvertId?advertId=" +advertId)
    }

    getJobAdvertDto() {
        return axios.get("http://localhost:8080/api/jobAdverts/getJobAdvertDetails")
    }

    getPassiveJobAdvertDto() {
        return axios.get("http://localhost:8080/api/jobAdverts/getPassiveJobAdvertDetails");
    }

    getJobAdvertDtoByJobAdvertId(advertId) {
        return axios.get("http://localhost:8080/api/jobAdverts/getJobAdvertDtoByAdvertId?advertId="+advertId)
    }

    getJobAdvertByEmployerId(employerId) {
        return axios.get("http://localhost:8080/api/jobAdverts/getJobAdvertByEmployerId?employerId=" + employerId)
    }

    closeJobAdvert(jobAdvert) {
        return axios.post("http://localhost:8080/api/jobAdverts/closeJobAdvert",jobAdvert)
    }

    approveJobAdvert(jobAdvert) {
        return axios.post("http://localhost:8080/api/jobAdverts/approveJobAdvert",jobAdvert)
    }

    sortedJobAdvertByDeadline() {
        return axios.get("http://localhost:8080/api/jobAdverts/sortedByDeadline")
    }

    add(jobAdvert) {
        return axios.post("http://localhost:8080/api/jobAdverts/add", jobAdvert)
    }
}