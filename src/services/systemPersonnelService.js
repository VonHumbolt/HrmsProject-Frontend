import axios from "axios";

export default class SystemPersonnelService{

    getBySystemPersonnelId(systemPersonnelId) {
        return axios.get("http://localhost:8080/api/systemPersonnel/getBySystemPersonnelId?systemPersonnelId=" + systemPersonnelId)
    }
    
    update(systemPersonnel) {
        return axios.post("http://localhost:8080/api/systemPersonnel/update",systemPersonnel)
    }

}