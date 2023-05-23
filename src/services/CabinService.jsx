import axios from "axios";

const CabinService = {

    getCabins: async () => {

        return await axios.get("http://localhost:8000/users")
            .then(res => {
                return res.data;
            })
            .catch(error => {
                throw error;
            })
    },

    createCabin: async (data) => {
        return await axios.post("http://localhost:8000/upload", data)
            .then(res => {
                return res.data;
            })
            .catch(error => {
                throw error;
            })
    }
}

export default CabinService;