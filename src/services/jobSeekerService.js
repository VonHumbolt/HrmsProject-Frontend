import axios from "axios";

export default class JobSeekerService{
    getAllJobSeekers() {
        return axios.get("http://localhost:8080/api/jobSeekers/getAllJobSeekerDtos")
    }

    getJobSeekerByJobSeekerId(jobSeekerId) {
        return axios.get("http://localhost:8080/api/jobSeekers/getJobSeekerDtoByJobSeekerId?jobSeekerId="+jobSeekerId)
    }

    add(jobSeeker) {
        return axios.post("http://localhost:8080/api/jobSeekers/add",jobSeeker)
    }

    uploadImage(image) {
        return axios.post("http://localhost:8080/api/jobSeekers/uploadImage", image)
    }
}