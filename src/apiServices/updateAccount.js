import { getAccessToken } from '~/utils/cookieUtils';
import * as httpRequest from '~/utils/httpRequest';
export const updateAccount = async(formData) => {
    try {
        const response = await httpRequest.put('/v1/accounts', formData, {
            headers: {
                Authorization: `Bearer ${getAccessToken()}`,
            }
        });
        return response.data;
    }
    catch (error) {
        console.error('Failed to update account: ', error);
    }
}