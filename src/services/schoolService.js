import axios from "axios";


export default class SchoolService {
    add(school) {
        return axios.post("http://localhost:8080/api/schools/add",school)
    }

    update(school) {
        return axios.post("http://localhost:8080/api/schools/update",school)
    }
}