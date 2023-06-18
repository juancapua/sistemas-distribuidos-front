import axios from "axios";

const CabinService = {

    getCabins: async () => {

        return await axios.get("https://89btbpgxl6.execute-api.us-east-1.amazonaws.com/cabins")
            .then(res => {
                return res.data;
            })
            .catch(error => {
                throw error;
            })
    },

    createCabin: async (data) => {
        return await axios.post("https://89btbpgxl6.execute-api.us-east-1.amazonaws.com/cabins", data)
            .then(res => {
                return res.data;
            })
            .catch(error => {
                throw error;
            })
    }
}

export default CabinService;