import axios from "axios";

export default class JobPositionService{
    getAllJobPositions() {
        return axios.get("http://localhost:8080/api/jobPositions/getall");
    }

    add(jobPosition) {
        return axios.post("http://localhost:8080/api/jobPositions/add", jobPosition)
    }
}