import axios from "axios";

const UserService = {

    getUsers: async () => {

        return await axios.get("http://localhost:8000/users")
            .then(res => {
                return res.data;
            })
            .catch(error => {
                throw error;
            })
    },

    createUser: async (data) => {
        return await axios.post("http://localhost:8000/upload", data)
            .then(res => {
                return res.data;
            })
            .catch(error => {
                throw error;
            })
    }
}

export default UserService;