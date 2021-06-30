import axios from "axios";

export default class ResumeService{
    getAllResumes() {
        return axios.get("http://localhost:8080/api/resumes/getall")
    }

    getResumeByJobSeekerId(jobSeekerId) {
        return axios.get("http://localhost:8080/api/resumes/getResumeByJobSeekerId?jobSeekerId="+jobSeekerId)
    }

    getResumeByResumeId(resumeId) {
        return axios.get("http://localhost:8080/api/resumes/getResumeByResumeId?resumeId="+ resumeId)
    }

    add(resume) {
        return axios.post("http://localhost:8080/api/resumes/add", resume)
    }
}