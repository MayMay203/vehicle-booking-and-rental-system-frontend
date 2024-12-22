import * as httpRequest from '~/utils/httpRequest';

export const getHighlightNumbers = async () => {
    try {
        const response = await httpRequest.get('/v1/home-page/highlight-numbers')
        return response.data;
    }
    catch (error) {
        console.error('Failed to get highlight numbers: ', error);
    }
}