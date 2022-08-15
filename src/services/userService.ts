import axios from 'axios';

const baseURL  = "http://localhost:5000";

const api = axios.create({
    baseURL: baseURL
})

class UserService {

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

    // async getUserById(id){
    //     //let users = [];
    //     //users = await this.getUsers();
    //     const response = await api.get('GetUserById/'+id);       
    //     //const user = users.find(item => item._id === id);
    //     const user = response.data;
    //     return user;
    // }


    // insertUser(vm){

    //     const options = {
    //         headers: {'Content-Type': 'application/json'}
    //       };

    //     return api.post(`CreateUser`, vm, options)
    //      .then((response) => {
    //         let res = response;
    //         return res.statusText;
    //       })
    //       .catch((err) => {
    //         console.error("ops! ocorreu um erro" + err);
    //       });
    // }

    // updateUser(vm){

    //         const options = {
    //             headers: {'Content-Type': 'application/json'}
    //           };
    
    //         return api.put(`UpdateUser`, vm, options)
    //          .then((response) => {
    //             let res = response;
    //             return res.statusText;
    //           })
    //           .catch((err) => {
    //             console.error("ops! ocorreu um erro" + err);
    //           });

    //   }


}

export default UserService;