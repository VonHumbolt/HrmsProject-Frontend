import axios from "axios";

export default class AbilityService{
    
    add(ability) {
        return axios.post("http://localhost:8080/api/abilities/add", ability)
    }

    update(ability) {
        return axios.post("http://localhost:8080/api/abilities/update",ability)
    }
}