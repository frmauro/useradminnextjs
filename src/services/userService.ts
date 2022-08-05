import axios from 'axios';

const baseURL  = "http://localhost:5000";

const api = axios.create({
    baseURL: baseURL
})

export default function UserService(){
    static classInstance = null;
    static getUserServiceInstance() {
        if (UserService.classInstance === null) {
            UserService.classInstance = new UserService();
        }
        return this.classInstance;
    }


    async getUsers(){
        const response = await api.get('users');
        return response.data;
    }
} 