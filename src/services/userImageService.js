import axios from "axios";

export default class UserImageService {

    getImageByJobSeekerId(jobSeekerId) {
        return axios.get("http://localhost:8080/api/userImages/getImageByJobSeekerId?jobSeekerId="+jobSeekerId);
    }
    
    getImageByResumeId(resumeId) {
        return axios.get("http://localhost:8080/api/userImages/getImageByJobSeekerId?resumeId="+resumeId);
    }

    add(jobSeekerId, resumeId, image) {
        return axios.post("http://localhost:8080/api/userImages/addImage", image, {
            headers: {"Content-Type" : "multipart/form-data"},
            params: { jobSeekerId, resumeId}
        })
    }

    update( userImageId, image) {
        return axios.post("http://localhost:8080/api/userImages/update", image, {
            headers: { "Content-Type": "multipart/form-data" },
            params: { userImageId }

        });
    }
}