import * as httpRequest from '../utils/httpRequest'

export const registerInfo = async (email, name, phoneNumber, birthday, gender) => {
    try {
        const response = await httpRequest.post('/v1/auth/register-info', {
            username: email, 
            name,
            phoneNumber,
            birthday,
            gender
        })
        return response.data
    }
    catch (error) {
        throw httpRequest.getMessage(error)
    }
}