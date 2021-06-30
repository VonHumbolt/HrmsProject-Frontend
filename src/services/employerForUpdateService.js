import axios from "axios";

export default class EmployerForUpdateService {
    
    getAll() {
        return axios.get("http://localhost:8080/api/employerForUpdates/getAll")
    }

    add(employeForUpdate) {
        return axios.post("http://localhost:8080/api/employerForUpdates/add", employeForUpdate)
    }

    delete(employerForUpdate) {
        return axios.post("http://localhost:8080/api/employerForUpdates/delete", employerForUpdate)
    }
}