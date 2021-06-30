import axios from "axios";

export default class UserImageService {

    getImageByJobSeekerId(jobSeekerId) {
        return axios.get("http://localhost:8080/api/userImages/getImageByJobSeekerId?jobSeekerId="+jobSeekerId);
    }
    
    getImageByResumeId(resumeId) {
        return axios.get("http://localhost:8080/api/userImages/getImageByJobSeekerId?resumeId="+resumeId);
    }

}