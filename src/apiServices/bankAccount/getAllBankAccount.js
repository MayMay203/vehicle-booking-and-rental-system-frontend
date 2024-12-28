import axios from "axios";

export const getAllBankAccounts = async ()=>{
    try {
        const response = await axios.get('https://api.vietqr.io/v2/banks')
        return response.data.data;
    } catch (error) {
        console.log(error);
    }
 
}