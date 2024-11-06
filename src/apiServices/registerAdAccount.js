import { getAccessToken } from '~/utils/cookieUtils';
import * as httpRequest from '~/utils/httpRequest';

export const registerAdAccount = async (email, password, confirmPassword) => {
    try {
        const response = await httpRequest.post('/v1/accounts/register-admin', {
          email,
          password,
          confirmPassword,
        }, {
            headers: {
                'Authorization': `Bearer ${getAccessToken()}`,
            },
        })
        return response.data;
    }
    catch (error) {
        throw httpRequest.getMessage(error);
    }
}