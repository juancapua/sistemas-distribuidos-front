import axios from "axios";

const CabinService = {

    getCabins: async () => {

        return await axios.get("http://44.212.18.34:3000/cabins")
            .then(res => {
                return res.data;
            })
            .catch(error => {
                throw error;
            })
    },

    createCabin: async (data) => {
        return await axios.post("http://44.212.18.34:3000/cabins", data)
            .then(res => {
                return res.data;
            })
            .catch(error => {
                throw error;
            })
    }
}

export default CabinService;