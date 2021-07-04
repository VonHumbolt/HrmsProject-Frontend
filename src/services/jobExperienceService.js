import axios from "axios";


export default class JobExperienceService {

    add(jobExperience) {
        return axios.post("http://localhost:8080/api/jobExperiences/add", jobExperience)
    }

    update(jobExperience) {
        return axios.post("http://localhost:8080/api/jobExperiences/update", jobExperience)

    }
}