import * as httpRequest from '~/utils/httpRequest'

export const registerDriverPartner = async (formData) => {
    try{
        const response = await httpRequest.post('', formData)
        return response.data
    }
    catch(error){
        console.log(error)
        throw httpRequest.getMessage(error)
    }
}